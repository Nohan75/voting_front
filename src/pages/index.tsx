import Image from "next/image";
import localFont from "next/font/local";
import ProposalDetail from "@/components/ProposalDetail";
import React, {useState} from "react";
import ProposalList from "@/components/ProposalList";
import NewProposal from "@/components/NewProposal";
import {useWallet} from "@/context/WalletContext";

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

export interface Proposal {
    id: number;
    title: string;
    votesFor: number;
    votesAgainst: number;
    status: 'active' | 'closed';
}

export default function Home() {
    const { user, connectUser } = useWallet();




    const [proposals, setProposals] = useState<Proposal[]>([
        { id: 1, title: 'Réduire la semaine de travail à 4 jours', votesFor: 80, votesAgainst: 20, status: 'active' },
        { id: 2, title: 'Interdire les plastiques à usage unique', votesFor: 200, votesAgainst: 50, status: 'closed' },
    ]);

    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

    const addProposal = (title: string) => {
        const newProposal: Proposal = { id: Date.now(), title, votesFor: 0, votesAgainst: 0, status: 'active' };
        setProposals([newProposal, ...proposals]);
    };

    const vote = (id: number, type: 'for' | 'against') => {
        setProposals(
            proposals.map((proposal) =>
                proposal.id === id
                    ? {
                        ...proposal,
                        votesFor: type === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
                        votesAgainst: type === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst,
                    }
                    : proposal
            )
        );
    };

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
            {selectedProposal ? (
                <ProposalDetail
                    proposal={selectedProposal}
                    onBack={() => setSelectedProposal(null)}
                />
            ) : (
                <>
                    <NewProposal addProposal={addProposal} />
                    <ProposalList
                        proposals={proposals}
                        onSelect={setSelectedProposal}
                        onVote={vote}
                    />
                </>
            )}
        </div>
    );
}
