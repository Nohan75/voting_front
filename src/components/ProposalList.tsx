import React from 'react';
import { ethers } from "ethers";
import { InfoMessage, Proposal } from "@/utils/types";

interface ProposalsListProps {
    openedProposals: Proposal[];
    closedProposals: Proposal[];
    onSelect: (proposal: Proposal) => void;
    onVote: (contractAddress: string, voteType: boolean) => void;
    infoMessage?: InfoMessage | null;
}

const ProposalList: React.FC<ProposalsListProps> = ({ openedProposals, closedProposals, onSelect, onVote, infoMessage }) => {
    return (
        <div>
            <h2 className="text-xl text-gray-500 font-bold">Propositions en cours</h2>
            <ul className="space-y-4">
                {openedProposals.map((proposal) => (
                    <li key={proposal.contractAddress} className="p-4 bg-white shadow rounded">
                        <h3 className="font-semibold text-gray-500">{proposal.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <div className={"flex gap-4"}>
                                <button
                                    onClick={() => onVote(proposal.contractAddress, true)}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Pour
                                </button>
                                <button
                                    onClick={() => onVote(proposal.contractAddress, false)}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Contre
                                </button>
                            </div>
                            <button
                                onClick={() => onSelect(proposal)}
                                className="text-blue-500 underline"
                            >
                                Détails
                            </button>
                        </div>
                        {infoMessage && infoMessage.proposalAssociated === proposal.contractAddress && (
                            <p className={`mt-2 ${infoMessage.type === 'error' ? 'text-red-400' : 'text-green-600'}`}>{infoMessage.message}</p>
                        )}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold text-gray-500 mt-8">Propositions passées</h2>
            <ul className="space-y-4">
                {closedProposals.map((proposal) => (
                    <li key={proposal.contractAddress} className="p-4 bg-white shadow rounded">
                        <h3 className="font-semibold text-gray-500">{proposal.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <button
                                onClick={() => onSelect(proposal)}
                                className="text-blue-500 underline"
                            >
                                Détails
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalList;
