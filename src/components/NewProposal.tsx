import React, { useState } from 'react';

interface NewProposalFormProps {
    addProposal: (title: string, duration: number) => void;
}

const NewProposal: React.FC<NewProposalFormProps> = ({ addProposal }) => {
    const [title, setTitle] = useState<string>('');
    const [duration, setDuration] = useState<number>(60);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addProposal(title, duration);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow rounded">
            <h2 className="text-xl text-gray-500 font-bold">Nouvelle Proposition</h2>
            <div className={'flex flex-row gap-3'}>
                <div className="mt-4 w-3/4">
                    <label htmlFor="title" className="text-gray-500">Titre de la proposition</label>
                    <input
                        type="text"
                        placeholder="Titre de la proposition"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded mt-2 text-gray-500"
                    />
                </div>
                <div className={'mt-4'}>
                    <label htmlFor="duration" className="text-gray-500">Durée de la proposition (en secondes)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        placeholder="Durée de la proposition (en secondes)"
                        className="w-full p-2 border rounded mt-2 text-gray-500"
                    />
                </div>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Soumettre
            </button>
        </form>
    );
};

export default NewProposal;
