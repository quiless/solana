const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const environment = "devnet";
const wallet = new Keypair();
const publicKey = new PublicKey(wallet._keypair.publicKey);
const privateKey = wallet._keypair.secretKey;
const connection = new Connection(clusterApiUrl(environment, "confirmed"));

const getWalletBalance = async() => {
    try {
        const balance = await connection.getBalance(publicKey);
        console.log(balance * LAMPORTS_PER_SOL, "balance");
    } catch (error) {
        console.log(error);
    }
}

const getSolana = async() => {
    try {
        const fromRequestedAirdrop =  await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
        //await connection.TransactionConfirmationStrategy(fromRequestedAirdrop);
        await connection.confirmTransaction(fromRequestedAirdrop);
    } catch (error) {
        console.log(error);
    }
}

const main = async() => {
    await getWalletBalance();
    await getSolana();
    await getWalletBalance();
}

main();