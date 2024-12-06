import React from 'react';
import {Proposal} from "@/pages";

interface ProposalDetailsProps {
    proposal: Proposal;
    onBack: () => void;
}

const ProposalDetail: React.FC<ProposalDetailsProps> = ({ proposal, onBack }) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const percentFor = totalVotes ? ((proposal.votesFor / totalVotes) * 100).toFixed(2) : '0';
    const percentAgainst = totalVotes ? ((proposal.votesAgainst / totalVotes) * 100).toFixed(2) : '0';

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl text-gray-500 font-bold">{proposal.title}</h2>
            <p className="mt-4 text-gray-500">Nombre de votes : {totalVotes}</p>
            <p className="mt-2 text-gray-500">Pourcentage pour : {percentFor}%</p>
            <p className="mt-2 text-gray-500">Pourcentage contre : {percentAgainst}%</p>
            <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Retour
            </button>
        </div>
    );
};

export default ProposalDetail;
