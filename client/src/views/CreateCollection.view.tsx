import { Box, Divider, Typography, useTheme } from "@mui/joy";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const CreateCollectionView = () => {
  const theme = useTheme();

  const [files, setFiles] = useState<{ [trait: string]: File[] }>({});

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
        Object.keys(files).map((trait) => {
          return (
            <Box key={trait} sx={{ display: "flex", flexDirection: "column" }}>
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
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid " + theme.palette.divider,
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
        })
      )}
    </Box>
  );
};
