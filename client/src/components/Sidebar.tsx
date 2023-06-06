import {
  AccountBalanceWallet,
  Collections,
  Person,
  Settings,
  SmartToy,
  TravelExplore,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
  useTheme,
} from "@mui/joy";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyCollection } from "../views/MyCollection.view";

const Items = [
  {
    name: "Create Collection",
    icon: <Collections />,
    path: "create-collection",
  },
  {
    name: "My Collection",
    icon: <Person />,
    path: "my-collection",
  },
  {
    name: "Mint",
    icon: <AccountBalanceWallet />,
    path: "mint",
  },
  {
    name: "Testing",
    icon: <SmartToy />,
    path: "test",
  },
];

export const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        padding: 1,
        backgroundColor: theme.palette.background.surface,
        height: "calc(100vh - 24px)",
        width: "250px",
        position: "fixed",
        pb: 2,
      }}
    >
      <Typography level="h1" sx={{ width: "100%", textAlign: "center" }}>
        StoreMore
      </Typography>

      <Divider />

      <List sx={{ px: 2 }}>
        {Items.map((item) => {
          const active = location.pathname.includes(item.path);
          return (
            <ListItem
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: active
                  ? theme.palette.background.surface
                  : "transparent",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: theme.palette.background.surface,
                },
              }}
            >
              <ListItemButton color={active ? "primary" : "neutral"}>
                <ListItemDecorator>
                  {cloneElement(item.icon, {
                    color: active ? "primary" : "inherit",
                  })}
                </ListItemDecorator>
                {item.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
