import React, { useState, useMemo } from "react";
import { Header } from "../components/Header";
import { PostForm } from "../components/PostForm";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { PhantomWalletName } from "@solana/wallet-adapter-wallets";


export const PostDashboard = () => {
    // const {connected, select} = useWallet();
    const [connected, setConnected] = useState();
    const [publicKey, setPublicKey] =  useState("");

    const connectWallet = async () => {
        const { solana } = window;
        let response;
        if (solana) {
            if (!connected) {
                response = await solana.connect();
                const pk = response.publicKey.toString();
                setConnected(response);            
                setPublicKey(pk);
            } else {
                response = await solana.disconnect();
                setConnected(response);
                setPublicKey("");
            }
            
        } else {
            
        }
    };

    return (
        <div className="app h-screen bg-slate-950 w-full max-w-full">
            <Header 
                connected={connected}
                handleClick={connectWallet}
                publicKey={publicKey}
            />

            <PostForm 
                connected={connected}
            />


        </div>
    );
}
