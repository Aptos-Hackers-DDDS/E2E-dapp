import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { getOwnedTokens, getTokenDetails } from "../utils/util";
import { useQuery, useQueries } from "@tanstack/react-query";
import { isUint8Array } from "util/types";

export const UploadedTraitsView = () => {
  const { data: ownedTokens } = useQuery(["ownedTokens"], () =>
    getOwnedTokens()
  );

  console.log(ownedTokens);

  const results = useQueries({
    queries: (ownedTokens || []).map((token) => ({
      queryKey: ["getTokenDetails", token.storage_id],
      queryFn: () => getTokenDetails(token.storage_id),
      staleTime: Infinity,
      select: (data: any[]) => {
        const metadata = data.find(
          (item) =>
            item.type ===
            "0x3e3f4caea68c15a272626f7f27801044296004bbd8e1c9c0dc0b8dbf5bccfa23::dynamic_toads::Metadata"
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

  console.log(results);

  return (
    <Box>
      <Typography level="h2">UploadedTraits</Typography>
      {results.map((res) => {
        console.log(res.data?.metadata.image);
        return (
          <Box key={res.data?.id}>
            <img src={res.data?.metadata.image || ""} width="200px" />
          </Box>
        );
      })}
    </Box>
  );
};
