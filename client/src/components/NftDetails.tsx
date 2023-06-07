import toMint from "../assets/toMint.png";
import mouth from "../assets/mouth.png";
import eyes from "../assets/eyes.png";
import background from "../assets/background.png";
import clothes from "../assets/clothes.png";
import head from "../assets/head.png";
import skin from "../assets/skin.png";
import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

const items = [background, skin, clothes, eyes, head, mouth];

export const NftDetails = () => {
  const [frame, setFrame] = useState(1);
  const [hover, setHover] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFrame((frame) => (frame + 1 > items.length ? 1 : frame + 1));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const renderPiece = (src: string, label: string, traitName: string) => {
    return (
      <Box sx={{ textAlign: "center", border: "1px solid white", p: 2 }}>
        <Typography fontSize="1rem" fontWeight="bold">
          {label}
        </Typography>
        <img src={src} height="150px" />
        <Typography color="primary" fontSize="0.9rem">
          {traitName}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        columnGap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
        {renderPiece(background, "Background", "Grey Fog")}
        {renderPiece(skin, "Skin", "Tan 1")}
        {renderPiece(clothes, "Clothes", "Experiment N325")}
      </Box>
      <Box
        component={Box}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          width: "300px",
          mx: hover ? "100px" : "20px",
          transition: "margin 1s",
        }}
      >
        <svg
          id="woolf"
          width="100%"
          height="100%"
          version="1.1"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          overflow="visible"
        >
          {items.map((item, i) => (
            <image
              style={{
                transform: hover
                  ? `translate(${i * 4 * (i % 2 ? -1 : 1)}px, ${
                      i * 4 * (i % 4 ? 1 : -1)
                    }px)`
                  : undefined,
                transition: "transform 1s",
                backgroundColor: "black",
              }}
              width="100%"
              height="100%"
              image-rendering="pixelated"
              preserveAspectRatio="xMidYMid"
              xlinkHref={item}
            />
          ))}
        </svg>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
        {renderPiece(head, "Head", "Samurai")}
        {renderPiece(eyes, "Eyes", "The Hidden")}
        {renderPiece(mouth, "Mouth", "Tongue")}
      </Box>
    </Box>
  );
};
