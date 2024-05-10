import { Box } from "@mui/material";
import { DataTable } from "components/campaign/common/data_table";
import { Title } from "components/campaign/common/title";
import { GridColumn, SubCampaignData } from "interface/index.interface";

interface Props {
  data: SubCampaignData;
  columns: GridColumn[];
  setData: (data: SubCampaignData) => void;
  isShowValidation: boolean;
}

export const ListAds = ({
  data,
  columns,
  setData,
  isShowValidation,
}: Props) => {
  return (
    <Box
      flexDirection={"column"}
      alignItems={"flex-start"}
      sx={{ margin: "40px 0px" }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Title label="DANH SÁCH QUẢNG CÁO" variant="primary"></Title>
      </Box>
      <DataTable
        columns={columns}
        data={data}
        setData={setData}
        isShowValidation={isShowValidation}
      ></DataTable>
    </Box>
  );
};
