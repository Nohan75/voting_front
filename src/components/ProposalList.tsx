import React from 'react';
import {Proposal} from "@/pages";

interface ProposalsListProps {
    proposals: Proposal[];
    onSelect: (proposal: Proposal) => void;
    onVote: (id: number, type: 'for' | 'against') => void;
}

const ProposalList: React.FC<ProposalsListProps> = ({ proposals, onSelect, onVote }) => {
    const activeProposals = proposals.filter((p) => p.status === 'active');
    const closedProposals = proposals.filter((p) => p.status === 'closed');

    return (
        <div>
            <h2 className="text-xl text-gray-500 font-bold">Propositions en cours</h2>
            <ul className="space-y-4">
                {activeProposals.map((proposal) => (
                    <li key={proposal.id} className="p-4 bg-white shadow rounded">
                        <h3 className="font-semibold text-gray-500">{proposal.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <button
                                onClick={() => onVote(proposal.id, 'for')}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Pour
                            </button>
                            <button
                                onClick={() => onVote(proposal.id, 'against')}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Contre
                            </button>
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
            <h2 className="text-xl font-bold text-gray-500 mt-8">Propositions passées</h2>
            <ul className="space-y-4">
                {closedProposals.map((proposal) => (
                    <li key={proposal.id} className="p-4 bg-gray-200 shadow rounded">
                        <h3 className="font-semibold text-gray-500">{proposal.title}</h3>
                        <button
                            onClick={() => onSelect(proposal)}
                            className="text-blue-500 underline"
                        >
                            Détails
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalList;
