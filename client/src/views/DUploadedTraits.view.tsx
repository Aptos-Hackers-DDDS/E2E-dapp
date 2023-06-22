import { Box, Divider, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { getOwnedTokens, getTokenDetails } from "../utils/util";


import { useQuery, useQueries } from "@tanstack/react-query";
import { isUint8Array } from "util/types";
import { TraitContainer } from "../components/TraitContainer";

import { contractAddress } from "../constants";

export const DUploadedTraitsView = () => {
  const { data: ownedTokens } = useQuery(["ownedTokens"], () =>
    getOwnedTokens()
  );

  const results = useQueries({
    queries: (ownedTokens || []).map((token) => ({
      queryKey: ["getTokenDetails", token.storage_id],
      queryFn: () => getTokenDetails(token.storage_id),
      staleTime: Infinity,
      select: (data: any[]) => {
        console.log('data useQueries',data);
        const metadata = data.find(
          (item) => item.type === `${contractAddress}::dynamic_toads::Metadata`
        );

        return {
          id: token.storage_id,
          name: token.current_token_data?.token_name,
          metadata: {
            image: metadata.data.image,
            zIndex: metadata.data.zIndex,
          },
        };
      },
    })),
  });

  console.log('results UploadedTraitsView',results);

  return (
    <Box>
      <Typography level="h2">UploadedTraits</Typography>
      <Divider sx={{ my: 2 }} />
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
        {results.map((res) => {
          return (
            <TraitContainer
              src={res.data?.metadata.image || ""}
              label={res.data?.name || ""}
            />
          );
        })}
      </Box>
    </Box>
  );
};
