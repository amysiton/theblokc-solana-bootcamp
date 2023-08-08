import { createMetaplexInstance } from "./metaplex";

async function main() {
    const metaplex = createMetaplexInstance();
    const metadata = { 
        name: 'Diti',
        symbol: 'SOSDiti',
        image: 'https://arweave.net/O8qD-Esz8kYC9kToTItiuSr_-hK3_5aHHvDBHj4hAv8',
        attributes: [
            {
                trait_type: "species",
                value: "canine",
            },
            {
                trait_type: "gender",
                value: "female",
            },
            {
                trait_type: "birthday",
                value: "10/29/2019",
            }
        ]
    }
    const result = await metaplex.nfts().uploadMetadata(metadata);

    console.log("result", result);
    console.log("url", result.uri);

    // https://arweave.net/QpUMckjA2z7a02BV1bJiDxKkyn1jmBkMWYTUdupUeL4
}

main()