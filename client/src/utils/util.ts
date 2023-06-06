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
      "0x22424379bfcf263c4a90730bffebc03d947803dfa779e568e0c45e16c4f5a106::dynamic_toads::" +
        traitType
    )
  );

  let index = 0;
  for (const file of files) {
    const entryFunctionPayload =
      new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
          "0x22424379bfcf263c4a90730bffebc03d947803dfa779e568e0c45e16c4f5a106::dynamic_toads",
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
  return ownedTokens.current_token_ownerships_v2;
  // const last = ownedTokens.current_token_ownerships_v2.at(-1);
  // console.log(
  //   await provider.getAccountResources(
  //     "0x45e9ad26cc290c23310a43ca02e805d7906e2516bf6ad5ab403dd2da506784f1"
  //   )
  // );
};
