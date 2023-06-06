import { useState, useEffect,ChangeEvent } from "react";



import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { Box, Button, Typography } from "@mui/joy";



export const TestView = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  useEffect(() => {
    ;
  }, [account?.address]);

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    // 👇 Uploading the files using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <Box>
      <Typography level="h2">Test</Typography>

      <Button>Test</Button>
      <WalletSelector  />

      <div>
      <input type="file" onChange={handleFileChange} multiple />

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <button onClick={handleUploadClick}>Upload</button>
    </div>

      
    </Box>
  );
};
