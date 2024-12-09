import Image from "next/image";
import localFont from "next/font/local";
import ProposalDetail from "@/components/ProposalDetail";
import React, {useEffect, useState} from "react";
import ProposalList from "@/components/ProposalList";
import NewProposal from "@/components/NewProposal";
import {useWallet} from "@/context/WalletContext";
import {ProposalsAbi, PropositionAbi} from "@/utils/abi";
import {ethers, getAddress} from "ethers";
import {createProposal, getProposals} from "@/utils/proposals.interface";
import {create} from "domain";
import {InfoMessage, Proposal, ProposalDetail as PD, ProposalList as PL} from "@/utils/types";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function Home() {
    const [proposalsContract, setProposalsContract] = useState<ethers.Contract | null>(null);
    const [propositionContract, setPropositionContract] = useState<ethers.Contract | null>(null);
    const [proposals, setProposals] = useState<PL>({openedProposals: [], closedProposals: []});
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [selectedProposalDetail, setSelectedProposalDetail] = useState<PD | null>(null);
    const [infoMessage, setInfoMessage] = useState<InfoMessage | null>(null);
    const { user, connectUser } = useWallet();

    const PROPOSAL_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PROPOSALS_CONTRACT_ADDRESS || '';
    const PROPOSITION_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PROPOSITION_CONTRACT_ADDRESS || '';

    console.log([PROPOSAL_CONTRACT_ADDRESS, PROPOSITION_CONTRACT_ADDRESS])

    useEffect(() => {
        if (user) {
            const proposalsContractInstance = new ethers.Contract(PROPOSAL_CONTRACT_ADDRESS, ProposalsAbi, user);
            const propositionContractInstance = new ethers.Contract(PROPOSITION_CONTRACT_ADDRESS, PropositionAbi, user);

            setProposalsContract(proposalsContractInstance);
            setPropositionContract(propositionContractInstance);
        }
    }, [user]);

    useEffect(() => {
        if (proposalsContract) {
            console.log("Proposals Contract:", proposalsContract);
            fetchProposals();
        }
        if (propositionContract) {
            console.log("Proposition Contract:", propositionContract);
        }
    }, [proposalsContract, propositionContract]);

    const addInfoMessage = (message: string, type: 'error' | 'success', proposal: string) => {
        setInfoMessage({message: message, type: type, proposalAssociated: proposal});
        setTimeout(() => {
            setInfoMessage(null);
        }, 5000);
    }

    const compareTime = (endTime: number) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const difference = Number(endTime) - currentTime;

        if (difference < 0) {
            return "closed";
        } else {
            return "active";
        }
    }

    const splitProposalsIntoCategories = (proposals: Proposal[]) => {
        const openedProposals = proposals.filter((p) => p.status === "active");
        const closedProposals = proposals.filter((p) => p.status === "closed");

        return {
            openedProposals,
            closedProposals
        }
    }

    const fetchProposals = async () => {
        if (proposalsContract) {
            const tx = await proposalsContract.getProposals();
            const temp = tx.map((p: any, index: number) => {
                return {
                    id: index,
                    title: p.title,
                    duration: p.endTime,
                    status: compareTime(p.endTime),
                    contractAddress: p[0]
                };
            });
            const proposals = splitProposalsIntoCategories(temp);
            setProposals({
                openedProposals: proposals.openedProposals,
                closedProposals: proposals.closedProposals
            });
        }
    };

    const addProposal = async (title: string, duration: number) => {
        if (proposalsContract) {
            const tx = await proposalsContract.createProposal(title, duration, {
                chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337', 10)});
            await tx.wait();

            await fetchProposals();
            console.log("tx:", tx);
        }
    }


    const vote = async (propositionContract: string, voteType: boolean) => {
           console.log('proposition', propositionContract)
           if(proposalsContract) {
               try {
                   const tx = await proposalsContract.voteForProposition(propositionContract, voteType)
                   await tx.wait();

                     addInfoMessage("Vote enregistré", "success", propositionContract);
               } catch (error: any) {
                   // PRevent the app from crashing
                     console.error("Error voting for proposition:", error.reason);
                     addInfoMessage(error.reason, "error", propositionContract);
                     return;
               }
           }
    };



    const getProposalResults = async (contractAddress: string) => {
        if(proposalsContract) {
            try {
                const results = await proposalsContract.getPropositionResults(contractAddress);
                const [votesFor, votesAgainst] = results;
                console.log(`Votes For: ${votesFor}, Votes Against: ${votesAgainst}`);
                setSelectedProposalDetail({votesFor, votesAgainst});
            } catch (error) {
                console.error("Error fetching proposal results:", error);
                return null;
            }
        }
    };

    const showProposalDetails = async (proposal: Proposal) => {
        setSelectedProposal(proposal);
        await getProposalResults(proposal.contractAddress);
    }

    setInterval(() => {
        fetchProposals();
    }, 30000);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-500 text-center mb-4">Système de Propositions</h1>
            <div className="p-4 bg-white shadow rounded mb-4">
                <h2 className="text-xl text-gray-500 font-bold">Portefeuille Metamask</h2>
                {user ? (
                    <p className={"text-gray-500"}>Utilisateur connecté : {user.address}</p>
                ) : (
                    <button className={"px-4 mt-2 py-2 bg-yellow-600 text-white rounded"} onClick={connectUser}>Se connecter</button>
                )}
            </div>
            {(selectedProposal && selectedProposalDetail) ? (
                <ProposalDetail
                    proposal={selectedProposal}
                    proposalDetail={selectedProposalDetail}
                    onBack={() => setSelectedProposal(null)}
                />
            ) : (
                <>
                    <NewProposal addProposal={addProposal} />
                    {<ProposalList
                        openedProposals={proposals.openedProposals}
                        closedProposals={proposals.closedProposals}
                        onSelect={showProposalDetails}
                        onVote={vote}
                        infoMessage={infoMessage}
                    />}
                </>
            )}
        </div>
    );
}
