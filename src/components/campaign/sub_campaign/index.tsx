import { Box } from "@mui/material";
import { List } from "./list";
import { FormSubCampaign } from "./form";
import { ListAds } from "./list_ads";

export const SubCampaign = () => {
  return (
    <Box sx={{ margin: "0px 20px" }}>
      <List></List>
      <FormSubCampaign></FormSubCampaign>
      <ListAds></ListAds>
    </Box>
  );
};
