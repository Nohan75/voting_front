import {ethers} from "ethers";

export interface Proposal {
    id: number;
    title: string;
    duration: number;
    status: 'active' | 'closed';
    contractAddress: string;
}

export interface ProposalList {
    openedProposals: Proposal[];
    closedProposals: Proposal[];
}

export interface ProposalDetail {
    votesFor: number;
    votesAgainst: number;
}

export interface InfoMessage {
    proposalAssociated: string;
    message: string;
    type: 'success' | 'error';
}
