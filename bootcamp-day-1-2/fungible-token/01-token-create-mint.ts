import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import "dotenv/config"
import base58 from "bs58"

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const authority = new Web3.PublicKey("HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e");
    const decoded = base58.decode(process.env.PRIVATE_KEY as any);
    const payer = Web3.Keypair.fromSecretKey(decoded);

    const mint = await token.createMint(connection, payer, authority, authority, 9)
    
    console.log(mint.toBase58());

    //mint output: 8F2V14WWewNS9qU239vjtzxQKFpx1dhcuHF1FhzMuY1h
}

main()