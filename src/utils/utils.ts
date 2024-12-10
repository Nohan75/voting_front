import {Proposal} from "@/utils/types";

export const compareTime = (endTime: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const difference = Number(endTime) - currentTime;

    if (difference < 0) {
        return "closed";
    } else {
        return "active";
    }
}

export const splitProposalsIntoCategories = (proposals: Proposal[]) => {
    const openedProposals = proposals.filter((p) => p.status === "active");
    const closedProposals = proposals.filter((p) => p.status === "closed");

    return {
        openedProposals,
        closedProposals
    }
}
