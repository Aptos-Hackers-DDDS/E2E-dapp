import {
  AptosAccount,
  AptosClient,
  BCS,
  HexString,
  Network,
  Provider,
  TxnBuilderTypes,
} from "aptos";
import { contractAddress, privateKey } from "../constants";

export const NODE_URL =
  process.env.APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com";

// export const FAUCET_URL =
//   process.env.APTOS_FAUCET_URL || "https://faucet.tesnet.aptoslabs.com";

const account1 = new AptosAccount(HexString.ensure(privateKey).toUint8Array());

const client = new AptosClient(NODE_URL);
const provider = new Provider(Network.TESTNET);

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export const sendTraits = async (
  traitType: string,
  zIndex: number,
  files: File[]
) => {
  // const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  console.log(account1.address());

  // await faucetClient.fundAccount(account1.address(), 100_000_000_000);

  const tag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(
      `${contractAddress}::dynamic_toads::` + traitType
    )
  );

  let index = 0;
  for (const file of files) {
    console.log({ traitType, name: file.name, index, zIndex });

    const b64 = await toBase64(file); // prints the base64 string
    console.log({ b64 });
    const entryFunctionPayload =
      new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
          `${contractAddress}::dynamic_toads`,
          "create_new",
          [tag],
          [
            BCS.bcsSerializeStr(traitType),
            BCS.bcsSerializeStr(file.name.replace(".png", "")),
            BCS.bcsSerializeUint64(index),
            BCS.bcsSerializeUint64(zIndex),
            BCS.bcsSerializeStr(b64),
          ]
        )
      );
    const rawTransaction = await client.generateRawTransaction(
      account1.address(),
      entryFunctionPayload
    );

    const bcsTxn = AptosClient.generateBCSTransaction(account1, rawTransaction);
    const transactionRes = await client.submitSignedBCSTransaction(bcsTxn);
    console.log(transactionRes);
    await client.waitForTransaction(transactionRes.hash);
    console.log(transactionRes);

    index++;
  }
};

export const getOwnedTokens = async () => {
  const ownedTokens = await provider.indexerClient.getOwnedTokens(
    account1.address()
  );
  return ownedTokens.current_token_ownerships_v2;
};

export const getTokenDetails = async (token: string) => {
  return await provider.getAccountResources(token);
};
