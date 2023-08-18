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
    
    const programId = new anchor.web3.PublicKey(idl.metadata.address);

    // console.log("20 ", programId.toString(), baseAccount.publicKey.toString());

    const [transactionPending, setTransactionPending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState([]);
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    window.Buffer = buffer.Buffer;
    
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
    
    const getProgram = (provider) => {
        const parsedIdl = JSON.parse(JSON.stringify(idl));
        const program = new anchor.Program(parsedIdl, idl.metadata.address, provider);
        
        return program;
    }

    const addPost = async() => {
        const provider = getProvider();
        const program = getProgram(provider);
        const baseAccount = Keypair.generate();

        try {
            setTransactionPending(true);

            // console.log("62 wallet: ", anchorWallet);
            const tx = await program.methods
                .addPost(value, date)
                .accounts({
                    postAccount: baseAccount.publicKey,
                    authority: new anchor.web3.PublicKey(anchorWallet.publicKey),   
                    systemProgram: SystemProgram.programId,         
                })
                .signers([baseAccount])
                .rpc();

                console.log("99 Transaction Signature: ", tx);

                const account = await program.account.postAccount.fetch(new anchor.web3.PublicKey(baseAccount.publicKey));

                console.log("94 account posts: ", account);

                // // setPost(account);
                // console.log("97 ",post);
                posts.unshift([account]);

                console.table("100 ", posts);
                
        } catch(err) {
            console.log(err)
        } finally {
            setTransactionPending(false);
        }
    }

    const getPost = async() => {
        console.log("get post")
        const provider = getProvider();
        const program = getProgram(provider);
        const [profilePda, _profileBump] = findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode("post"),
                anchorWallet.publicKey.toBuffer(),
            ],
            programId
        );

        try {
            setTransactionPending(true);

            const account = await program.account.postAccount.fetch(profilePda);

            // setPost(account);
            console.log(post);
            posts.unshift([post]);
            
            console.log("84 account posts: ", account);

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

    // useEffect(() => {
    //     if (wallet.connected) getPost();
    // }, []);

    return { addPost, getPost, handleInputChange, transactionPending, loading, posts, post }
}
