import {
  AptosAccount,
  AptosClient,
  BCS,
  HexString,
  Network,
  Provider,
  TxnBuilderTypes,
} from "aptos";

export const NODE_URL =
  process.env.APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com";

// export const FAUCET_URL =
//   process.env.APTOS_FAUCET_URL || "https://faucet.tesnet.aptoslabs.com";

export const sendTraits = async (
  traitType: string,
  zIndex: number,
  files: File[]
) => {
  const client = new AptosClient(NODE_URL);
  // const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  const account1 = new AptosAccount(
    HexString.ensure(
      "0x09bf25d4c615d2239271639c91a6bdf33a5db106a808ba69dced8fe239d404f4"
    ).toUint8Array()
  );

  console.log(account1.address());

  // await faucetClient.fundAccount(account1.address(), 100_000_000_000);

  const tag = new TxnBuilderTypes.TypeTagStruct(
    TxnBuilderTypes.StructTag.fromString(
      "0x512c789cb722876640d0b0ab7947a7a9af4998bf027044e4292832b6c6d1cc4c::dynamic_toads::" +
        traitType
    )
  );

  let index = 0;
  for (const file of files) {
    const entryFunctionPayload =
      new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
          "0x512c789cb722876640d0b0ab7947a7a9af4998bf027044e4292832b6c6d1cc4c::dynamic_toads",
          "create_new",
          [tag],
          [
            BCS.bcsSerializeStr(traitType),
            BCS.bcsSerializeStr(file.name),
            BCS.bcsSerializeUint64(index),
            BCS.bcsSerializeUint64(zIndex),
            BCS.bcsSerializeBytes(new Uint8Array(await file.arrayBuffer())),
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

    index++;
  }
};

export const getOwnedTokens = async () => {
  const account1 = new AptosAccount(
    HexString.ensure(
      "0x09bf25d4c615d2239271639c91a6bdf33a5db106a808ba69dced8fe239d404f4"
    ).toUint8Array()
  );

  const provider = new Provider(Network.TESTNET);

  const ownedTokens = await provider.indexerClient.getOwnedTokens(
    account1.address()
  );
  const last = ownedTokens.current_token_ownerships_v2.at(-1);
  console.log(await provider.getAccountResources(last!.storage_id));
};
