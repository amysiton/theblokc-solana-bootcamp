import "dotenv/config";
import * as Web3 from "@solana/web3.js"
import base58 from "bs58";

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const authority = new Web3.PublicKey("HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e");
    const payer = Web3.Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY as any));
    const programId = new Web3.PublicKey("6gQTFCKShXjp18A99tEFhN2farkTbgyvEyFYxVR9EH1R");

    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: authority,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: programId,
    });

    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )
    console.log('SIGNATURE', signature)
}
main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});