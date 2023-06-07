import { Box, Divider, Typography } from "@mui/joy";
import toMint from "../assets/toMint.png";
import { TraitContainer } from "../components/TraitContainer";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { NftDetails } from "../components/NftDetails";

export const MyCollection = () => {
  const hasMinted = window.localStorage.getItem("minted");
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  return (
    <Box>
      <Typography level="h2">My Collection</Typography>
      <Divider sx={{ my: 2 }} />
      {isShowingDetails && (
        <Typography
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => setIsShowingDetails(false)}
        >
          <ArrowBack />
          Token #1 details
        </Typography>
      )}
      {isShowingDetails && (
        <Box>
          <NftDetails />
        </Box>
      )}
      {!isShowingDetails && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Box
            onClick={() => setIsShowingDetails(true)}
            sx={{
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              border: "1px solid white",
              rowGap: 1,
              p: 2,
              cursor: "pointer",
            }}
          >
            <img src={toMint} height="200px" />
            <Typography>Token #1</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
