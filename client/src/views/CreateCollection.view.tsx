import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Send } from "@mui/icons-material";
import { Box, Button, Divider, Input, Typography, useTheme } from "@mui/joy";
import { BCS } from "aptos";
import { TxnBuilderTypes } from "aptos";
import { AptosClient, Types } from "aptos";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getOwnedTokens, sendTraits } from "../utils/util";
import { TraitContainer } from "../components/TraitContainer";

export const CreateCollectionView = () => {
  const theme = useTheme();
  const { account, signAndSubmitTransaction } = useWallet();

  const [files, setFiles] = useState<{ [trait: string]: File[] }>({});
  const [traitZIndex, setTraitZIndex] = useState<{ [trait: string]: number }>(
    {}
  );

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

  const handleSendTraitsClick = async () => {
    for (const traitType in files) {
      await sendTraits(
        traitType,
        traitType in traitZIndex ? traitZIndex[traitType] : 0,
        files[traitType]
      );
    }
  };

  return (
    <Box>
      <Typography level="h2">Create Collection</Typography>
      <Divider sx={{ my: 2 }} />
      {!Object.keys(files).length ? (
        <Box
          {...getRootProps()}
          sx={{
            backgroundColor: theme.palette.background.surface,
            width: "calc(100vw - 360px)",
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
          <Button startDecorator={<Send />} onClick={handleSendTraitsClick}>
            Send traits
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
            {Object.keys(files).map((trait) => {
              return (
                <Box
                  key={trait}
                  sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}
                >
                  <Typography color="primary" level="h3">
                    {trait}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Typography>Z-Index</Typography>
                    <Input
                      value={traitZIndex[trait] || 0}
                      onChange={(e) =>
                        setTraitZIndex((prev) => ({
                          ...prev,
                          [trait]: Number(e.target.value),
                        }))
                      }
                    />
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 2,
                      rowGap: 2,
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {files[trait].map((file) => (
                      <TraitContainer
                        src={URL.createObjectURL(file)}
                        label={file.name.replace(".png", "")}
                      />
                    ))}
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
