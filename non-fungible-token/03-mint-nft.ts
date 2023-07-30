import { createMetaplexInstance } from "./metaplex";

async function main() {
    const metaplex = createMetaplexInstance();
    const { nft } = await metaplex.nfts().create({
        uri: "https://arweave.net/QpUMckjA2z7a02BV1bJiDxKkyn1jmBkMWYTUdupUeL4",
        name: "Sheesh of Shih Tzus Diti",
        symbol: "SOSDiti",
        sellerFeeBasisPoints: 5000
    }, { commitment: "finalized" });

    console.log(nft);
}

main()