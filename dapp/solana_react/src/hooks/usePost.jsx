import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import * as buffer from "buffer";

import { SystemProgram, Keypair } from "@solana/web3.js";
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import idl from "../constants/dapp_anchor.json";

const posts = [];

export function usePost() {
    const { connection } = useConnection();
    const { wallet } = useWallet(); // for UI state e.g: wallet name, wallet connected
    const anchorWallet = useAnchorWallet(); // for AnchorProvider
    
    const [transactionPending, setTransactionPending] = useState(false);
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const baseAccount = Keypair.generate();
    window.Buffer = buffer.Buffer;

    const getProvider = () => {
        if(!wallet) {
            return null;
        }
        
        const provider = new anchor.AnchorProvider(
            connection, 
            anchorWallet, 
            anchor.AnchorProvider.defaultOptions()
        );

        return provider;
    }
    
    const getProgram = (provider) => {
        const parsedIdl = JSON.parse(JSON.stringify(idl));
        const program = new anchor.Program(parsedIdl, idl.metadata.address, provider);
        
        return program;
    }

    const addPost = async() => {
        const provider = getProvider();
        const program = getProgram(provider);

        try {
            setTransactionPending(true);
            const tx = await program.methods
                .addPost(value, date)
                .accounts({
                    postAccount: baseAccount.publicKey,
                    authority: new anchor.web3.PublicKey(anchorWallet.publicKey),   
                    systemProgram: SystemProgram.programId,         
                })
                .signers([baseAccount])
                .rpc();

                console.log("Transaction Signature: ", tx);

                setTimeout(function(){
                    const account = getAccount(program, baseAccount.publicKey);    
                    const data = Promise.resolve(account);
                    data.then(item => {
                        posts.unshift([item]);
                    }).catch((err) => {
                        console.log(err);
                    }).finally(() => {
                    });
                }, 1000);

        } catch(err) {
            console.log(err)
        } finally {
            setTransactionPending(false);
            setValue("");
            setDate("");
        }
    }

    const getAccount = async(program, account) => {
        return await program.account.postAccount.fetch(account);
    }

    const handleInputChange = (event) => {
        setValue(event.target.value);
        setDate(new Date().toDateString());
    }

    return { addPost, handleInputChange, transactionPending, posts, value }
}
