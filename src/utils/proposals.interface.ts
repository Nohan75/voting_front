export const createProposal = async (title: string, duration: number, contract: any) => {
    const tx = await contract.createProposal(title, duration);
    await tx.wait();
}

export const getActiveProposals = async (contract: any) => {
    return await contract.getActiveProposals();
}

export const getProposals = async (contract: any) => {
    const tx = await contract.getProposals();
    await tx.wait();
}
