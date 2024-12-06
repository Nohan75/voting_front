import React, { useState } from 'react';

interface NewProposalFormProps {
    addProposal: (title: string) => void;
}

const NewProposal: React.FC<NewProposalFormProps> = ({ addProposal }) => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addProposal(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow rounded">
            <h2 className="text-xl text-gray-500 font-bold">Nouvelle Proposition</h2>
            <input
                type="text"
                placeholder="Titre de la proposition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mt-2"
            />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Soumettre
            </button>
        </form>
    );
};

export default NewProposal;
