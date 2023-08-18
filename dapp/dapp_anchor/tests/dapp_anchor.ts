import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DappAnchor } from "../target/types/dapp_anchor";

describe("dapp_anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DappAnchor as Program<DappAnchor>;
  // const postApp = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();

    console.log("Your transaction signature", tx);
  });
});
