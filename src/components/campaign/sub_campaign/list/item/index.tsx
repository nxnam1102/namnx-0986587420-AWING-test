import { CheckCircle } from "@mui/icons-material";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { SubCampaignData } from "interface/index.interface";
import { useMemo } from "react";

interface Props {
  data: SubCampaignData;
  isSelected: boolean;
  onClick: () => void;
  isShowValidation: boolean;
}

export const Item = ({
  data,
  isSelected,
  onClick,
  isShowValidation,
}: Props) => {
  const total = useMemo(() => {
    return data.ads.reduce((sum, ad) => {
      return sum + ad.quantity;
    }, 0);
  }, [data.ads]);
  const theme = useTheme();

  const isInvalidData = useMemo(() => {
    let check = false;
    if (!data.name) {
      check = true;
    } else if (data.ads.length <= 0) {
      check = true;
    } else if (
      data.ads.findIndex((item) => !item.name || !item.quantity) >= 0
    ) {
      check = true;
    }
    return check;
  }, [data.ads, data.name]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "210px",
        height: "120px",
        marginLeft: "15px",
        cursor: "pointer",
        border: `2px solid ${
          isSelected ? theme.palette.primary.main : "transparent"
        }`,
      }}
      onClick={onClick}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"10px"}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          variant="h6"
          color={isShowValidation && isInvalidData ? "error" : undefined}
        >
          {data.name}
        </Typography>
        <CheckCircle color={data.status ? "success" : "disabled"}></CheckCircle>
      </Box>
      <Typography variant="h4" color={"primary.dark"}>
        {total}
      </Typography>
    </Paper>
  );
};
