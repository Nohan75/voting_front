import React, {createContext, useState, useContext, useEffect} from 'react';
import { ethers } from 'ethers';

// Définition du type du contexte
interface WalletContextType {
    user: ethers.JsonRpcSigner | null;
    connectUser: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<ethers.JsonRpcSigner | null>(null);

    const connectUser = async () => {
        try {
            // @ts-ignore
            if (!window.ethereum) {
                throw new Error("MetaMask n'est pas installé. Veuillez l'installer pour continuer.");
            }

            // @ts-ignore
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();


            setUser(signer);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    useEffect(() => {
        connectUser();
    }, []);

    return (
        <WalletContext.Provider value={{ user, connectUser }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet doit être utilisé à l'intérieur d'un WalletProvider");
    }
    return context;
};
