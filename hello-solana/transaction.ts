import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import { Movie } from './Movie.schema'
import base58 from 'bs58'
const keypairFromSecretKey = Web3.Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY as any))
async function main() {
    const MOVIE_REVIEW_PROGRAM_ID = '6gQTFCKShXjp18A99tEFhN2farkTbgyvEyFYxVR9EH1R'
    const movie = new Movie('The Matrix', 5, 'A movie about the matrix')
    const publicKey = new Web3.PublicKey('HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e')
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: Web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],
        data: movie.serialize(),
        programId: new Web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    })

    const transaction = new Web3.Transaction()
    transaction.add(instruction)

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypairFromSecretKey]
    )
    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
})