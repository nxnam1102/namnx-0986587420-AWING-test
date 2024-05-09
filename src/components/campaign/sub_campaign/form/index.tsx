import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Title } from "components/campaign/common/title";

export const FormSubCampaign = () => {
  return (
    <Box
      flexDirection={"column"}
      alignItems={"flex-start"}
      sx={{ margin: "20px 0px" }}
    >
      <Title label="THÔNG TIN" variant="primary"></Title>
      <Box
        display={"flex"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          label={"Tên chiến dịch con"}
          sx={{ flexGrow: 1, marginRight: "50px" }}
          variant="standard"
          required
        ></TextField>
        <FormControlLabel control={<Checkbox />} label="Đang hoạt động" />
      </Box>
    </Box>
  );
};
