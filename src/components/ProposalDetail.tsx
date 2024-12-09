import React from 'react';
import type {
    Proposal,
    ProposalDetail
} from "@/utils/types";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


interface ProposalDetailsProps {
    proposal: Proposal;
    proposalDetail: ProposalDetail;
    onBack: () => void;
}

ChartJS.register(ArcElement, Tooltip, Legend);


const ProposalDetail: React.FC<ProposalDetailsProps> = ({ proposal, proposalDetail, onBack }) => {
    proposalDetail.votesFor = Number(proposalDetail.votesFor);
    proposalDetail.votesAgainst = Number(proposalDetail.votesAgainst);
    const totalVotes = proposalDetail.votesFor + proposalDetail.votesAgainst;
    console.log(proposalDetail.votesFor, proposalDetail.votesAgainst);
    const percentFor = totalVotes ? ((proposalDetail.votesFor / totalVotes) * 100).toFixed(2) : '0';
    const percentAgainst = totalVotes ? ((proposalDetail.votesAgainst / totalVotes) * 100).toFixed(2) : '0';

    const data = {
        labels: ['Pour', 'Contre'],
        datasets: [
            {
                data: [percentFor, percentAgainst],
                backgroundColor: ['#4CAF50', '#F44336'],
                hoverBackgroundColor: ['#66BB6A', '#EF5350'],
            },
        ],
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl text-gray-500 font-bold">{proposal.title}</h2>
            <p className="mt-4 text-gray-500">Nombre de votes : {totalVotes}</p>
            <p className="mt-2 text-gray-500">Pourcentage pour : {percentFor}%</p>
            <p className="mt-2 text-gray-500">Pourcentage contre : {percentAgainst}%</p>
            {totalVotes > 0 && (
                <div className="mt-4 w-1/3 h-1/3">
                    <Pie data={data} />
                </div>
            )}
            <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Retour
            </button>
        </div>
    );
};

export default ProposalDetail;
