import React, { useState, useEffect } from "react";
import * as anchor from "@project-serum/anchor";
import * as buffer from "buffer";

import { SystemProgram, Keypair } from "@solana/web3.js";
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import idl from "../constants/dapp_anchor.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

const posts = [];

export function usePost() {
    const { connection } = useConnection();
    const { wallet } = useWallet(); // for UI state e.g: wallet name, wallet connected
    const anchorWallet = useAnchorWallet(); // for AnchorProvider
    const postAccount = Keypair.generate();

    const [transactionPending, setTransactionPending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState([]);
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    
    // console.log("25 ", anchorWallet);;

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
    
    const getProgram = () => {
        const provider = getProvider();
        const parsedIdl = JSON.parse(JSON.stringify(idl));
        const program = new anchor.Program(parsedIdl, idl.metadata.address, provider);
        
        return program;
    }

    const addPost = async() => {
        const program = getProgram();
        const [profilePda, _profileBump] = findProgramAddressSync(
            [anchorWallet.publicKey.toBytes()], 
            postAccount.publicKey
        );

        try {
            setTransactionPending(true);

            setPost([{
                content: value,
                date: date
            }]);

            // console.log("62 program ", program);

            const tx = await program.methods
                .addPost([value, date])
                .accounts({
                    authority: wallet.publicKey,
                    postAccount: profilePda.publicKey,
                    systemProgram: SystemProgram.programId,
                });


            
                console.log("57 Transaction Signature: ", tx);
                // alert("Transaction Completed");
        } catch(err) {
            console.log(err)
        } finally {
            setTransactionPending(false);
        }
    }

    const getPost = async() => {
        const program = getProgram();
        const [profilePda, _profileBump] = findProgramAddressSync(
            [wallet.publicKey.toBytes()], 
            postAccount
        );

        try {
            setTransactionPending(true);

            const account = await program.account.postAccount.fetch(profilePda.publicKey);

            // setPost(account);
            console.log("84 account posts: ", account);
            // posts.unshift([post]);

        } catch(err) {
            console.log(err);
        } finally {
            setTransactionPending(false);
        }
    }

    const handleInputChange = (event) => {
        setValue(event.target.value);
        setDate(new Date().toDateString());

        // console.log("99 value: ", value);
    } 

    useEffect(() => {
        if (wallet.connected) getPost();

        // console.log(program().methods);

      }, [posts, wallet.connected]);

    return { addPost, getPost, handleInputChange, transactionPending, loading, posts, post }
}
