import React, { Children } from "react";
import { Box, Stack, Typography } from "@mui/material";

export const TagBox = (props) => {
  return (
    <Box height="20px">
      <Stack
        direction="row"
        spacing={1}
        sx={{
          ml: "20px",
        }}
      >
        {Children.toArray(
          props.tags.map((tag) => (
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              #{tag}
            </Typography>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default TagBox;
