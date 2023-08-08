import * as Web3 from '@solana/web3.js';

async function main() {
    console.log('Hello Solana')
    const PublicKey = new Web3.PublicKey('HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e')

    const endpoint = Web3.clusterApiUrl('devnet') // this will return the url of the devnet endpoint
    console.log('endpoint ', endpoint)

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet')) // this will connect to the endpoint specified
    // const connection = new Web3.Connection('https://api.devnet.solana.com%27/)

    const balance = await connection.getBalance(PublicKey) // this will get the balance of the public key specified
    console.log('balance ', balance)

    const accountInfo = await connection.getAccountInfo(PublicKey)
    console.log('accountInfo ', accountInfo)

}

main()