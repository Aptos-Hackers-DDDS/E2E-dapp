import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Send } from "@mui/icons-material";
import { Box, Button, Divider, Typography, useTheme } from "@mui/joy";
import { BCS } from "aptos";
import { TxnBuilderTypes } from "aptos";
import { AptosClient, Types } from "aptos";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function getBase64(file: File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

export const CreateCollectionView = () => {
  const theme = useTheme();
  const { account, signAndSubmitTransaction } = useWallet();

  const [files, setFiles] = useState<{ [trait: string]: File[] }>({});
  const [selectedFile, setSelectedFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const filesTmp: { [trait: string]: File[] } = {};
    for (const file of acceptedFiles) {
      const traitName = file.path.split("/")[1];
      if (!filesTmp[traitName]) {
        filesTmp[traitName] = [];
      }
      filesTmp[traitName].push(file);
    }
    setFiles(filesTmp);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSignAndSubmitTransaction = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function:
        "0x512c789cb722876640d0b0ab7947a7a9af4998bf027044e4292832b6c6d1cc4c::trait::add_trait",
      type_arguments: [],
      arguments: [BCS.bcsSerializeBytes(new TextEncoder().encode("test"))],
    };

    try {
      const response = await signAndSubmitTransaction(payload);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <Box>
      <Typography level="h2">Create Collection</Typography>
      {!Object.keys(files).length ? (
        <Box
          {...getRootProps()}
          sx={{
            backgroundColor: theme.palette.background.surface,
            width: "500px",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>
              Drag 'n' drop some files here, or click to select files
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Button
            disabled={!selectedFile}
            startDecorator={<Send />}
            onClick={onSignAndSubmitTransaction}
          >
            Send traits
          </Button>
          {Object.keys(files).map((trait) => {
            return (
              <Box
                key={trait}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography color="primary" level="h3">
                  {trait}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 1,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {files[trait].map((file) => (
                    <Box
                      key={file.name}
                      onClick={() => setSelectedFile(file)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        border: "1px solid " + theme.palette.divider,
                        borderColor:
                          selectedFile?.name === file.name ? "red" : undefined,
                        p: 2,
                        justifyContent: "space-between",
                        width: "45%",
                      }}
                    >
                      <Typography>{file.name}</Typography>
                      <img src={URL.createObjectURL(file)} width="200px" />
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};
