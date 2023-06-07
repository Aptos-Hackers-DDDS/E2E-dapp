import { Box, Typography, useTheme } from "@mui/joy";
import { FC } from "react";

export const TraitContainer: FC<{ src: string; label: string }> = ({
  src,
  label,
}) => {
  const theme = useTheme();
  return (
    <Box
      key={label}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        border: "1px solid " + theme.palette.divider,
        p: 2,
        justifyContent: "space-between",
        width: "100px",
        height: "150px",
        textAlign: "center",
      }}
    >
      <img src={src} width="100px" />
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: theme.palette.success.solidColor,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
