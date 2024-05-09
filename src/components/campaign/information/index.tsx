import { Box, TextField } from "@mui/material";

interface Props {}
export const Information = () => {
  return (
    <Box flexDirection={"column"} display={"flex"}>
      <TextField
        required
        label={"Tên chiến dịch"}
        sx={{ margin: "20px" }}
        variant="standard"
      />
      <TextField
        label={"Mô tả"}
        sx={{ margin: "0px 20px 30px 20px" }}
        variant="standard"
      />
    </Box>
  );
};
