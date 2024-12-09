export const vote = async (voteType: boolean, contract: any) => {
    const tx = await contract.vote(voteType);
    await tx.wait();
}

export const getResults = async (contract: any) => {
    return await contract.getResults();
}

// Normalement se close tout seul
export const closeVoting = async (contract: any) => {
    const tx = await contract.closeVoting();
    await tx.wait();
}
