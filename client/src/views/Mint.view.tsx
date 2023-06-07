import { Box, Button, Divider, Modal, Typography, useTheme } from "@mui/joy";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import i4 from "../assets/4.png";
import i5 from "../assets/5.png";
import i6 from "../assets/6.png";
import i7 from "../assets/7.png";
import i8 from "../assets/8.png";
import i9 from "../assets/9.png";
import i10 from "../assets/10.png";
import toMint from "../assets/toMint.png";
import { useEffect, useState } from "react";

const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10];

export const MintView = () => {
  const theme = useTheme();
  const [imgIndex, setImgIndex] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [isMintFinished, setIsMintFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((curr) => (curr + 1 > images.length - 1 ? 0 : curr + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMinting) {
      setTimeout(() => {
        setIsMinting(false);
        setIsMintFinished(true);
        window.localStorage.setItem("minted", "true");
      }, 1500);
    }
  }, [isMinting]);

  return (
    <Box>
      <Typography level="h2">Mint NFT</Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          rowGap: 4,
        }}
      >
        <Modal
          open={isMinting || isMintFinished}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.surface,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              rowGap: 4,
              minHeight: "60vh",
              width: "50vw",
              border: "1px solid white",
              p: 2,
            }}
          >
            {isMinting && <Typography>Minting in progress ...</Typography>}
            {isMintFinished && <Typography>Mint successfull !</Typography>}
            {isMintFinished && <img src={toMint} height={"300px"} />}
            {isMintFinished && (
              <Button
                size="lg"
                variant="solid"
                onClick={() => setIsMintFinished(false)}
              >
                Close
              </Button>
            )}
          </Box>
        </Modal>
        <img
          src={images[imgIndex]}
          height="300px"
          style={{ border: "1px solid white" }}
        />
        <Button
          sx={{ width: "200px" }}
          size="lg"
          onClick={() => setIsMinting(true)}
        >
          MINT
        </Button>
      </Box>
    </Box>
  );
};
