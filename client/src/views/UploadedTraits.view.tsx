import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { getOwnedTokens } from "../utils/util";

export const UploadedTraitsView = () => {
  const [ownedTokens, setOwnedTokens] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const tokens = await getOwnedTokens();
      setOwnedTokens(tokens);
      console.log(tokens);
    })();
  }, []);

  return (
    <Box>
      <Typography level="h2">UploadedTraits</Typography>
      {ownedTokens.map((token) => {
        return <Box key={0}></Box>;
      })}
    </Box>
  );
};
