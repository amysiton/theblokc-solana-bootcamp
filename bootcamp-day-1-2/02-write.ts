import "dotenv/config"
import * as Web3 from "@solana/web3.js";
import base58 from "bs58";

async function main() {
    const decoded = base58.decode(process.env.PRIVATE_KEY as any)
    const keyPair = Web3.Keypair.fromSecretKey(decoded) // is needed to sign the transaction

    const publicKeyFrom = new Web3.PublicKey("HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e");
    const publicKeyTo = new Web3.PublicKey("e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW");

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKeyFrom,
        toPubkey: publicKeyTo,
        lamports: 1,
    });

    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]);

    console.log("txHash", txSignature);
}

main();