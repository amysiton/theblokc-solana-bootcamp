import React from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export const Header = () => {
    return (
        <>
            <div className="header container mx-auto py-8">                
                <div className="flex">
                    <div className="w-1/2 py-6 px-2">
                        <h1 className="text-white text-lg text-left">Solana Developer Bootcamp dApp</h1>
                    </div>
                    <div className="w-1/2 py-6 px-2 mx-auto text-right">
                        <WalletMultiButton />
                    </div>
                </div>
            </div>
        </>
    );
}
