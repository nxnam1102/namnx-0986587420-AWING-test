import { Box } from "@mui/material";
import { AddButton } from "components/campaign/common/add_button";
import { DataTable } from "components/campaign/common/data_table";
import { Title } from "components/campaign/common/title";

export const ListAds = () => {
  return (
    <Box
      flexDirection={"column"}
      alignItems={"flex-start"}
      sx={{ margin: "40px 0px" }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Title label="DANH SÁCH QUẢNG CÁO" variant="primary"></Title>
        <Box width={"20px"}></Box>
        <AddButton></AddButton>
      </Box>
      <DataTable></DataTable>
    </Box>
  );
};
