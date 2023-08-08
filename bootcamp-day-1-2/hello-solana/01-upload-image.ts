import fs from "fs";
import { toMetaplexFile } from "@metaplex-foundation/js";
import { createMetaplexInstance } from "./metaplex";

const buffer = fs.readFileSync("./img/Diti.jpg");
const file = toMetaplexFile(buffer, "image.jpg");
const metaplex = createMetaplexInstance();

async function main() {
    const imageUrl = await metaplex.storage().upload(file);
    console.log("imageUrl", imageUrl);

    //https://arweave.net/O8qD-Esz8kYC9kToTItiuSr_-hK3_5aHHvDBHj4hAv8
}

main()