import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import "dotenv/config"
import base58 from "bs58"

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const authority = new Web3.PublicKey("HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e");
    const decoded = base58.decode(process.env.PRIVATE_KEY as any);
    const payer = Web3.Keypair.fromSecretKey(decoded);
    const mint = new Web3.PublicKey("8F2V14WWewNS9qU239vjtzxQKFpx1dhcuHF1FhzMuY1h");

    const address = await token.createAccount(connection, payer, mint, authority);

    // token.getAssociatedTokenAddress()
    // const account = await token.getOrCreateAssociatedTokenAccount(connection, payer, mint, authority);

    console.log(address.toBase58());

    // address output 7nm1FUZ9CKSwaNXUSwLenA1D8eQCrcq2PudvPgJLnZTn
}

main()