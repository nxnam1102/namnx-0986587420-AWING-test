import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Title } from "components/campaign/common/title";
import { invalidMessage, isInvalidData } from "helper";
import { SubCampaignData } from "interface/index.interface";

interface Props {
  data: SubCampaignData;
  setData: (data: SubCampaignData) => void;
  isShowValidation: boolean;
}

export const FormSubCampaign = ({ data, setData, isShowValidation }: Props) => {
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
        marginTop={"10px"}
      >
        <TextField
          label={"Tên chiến dịch con"}
          sx={{ flexGrow: 1, marginRight: "50px" }}
          variant="standard"
          required
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
          error={isInvalidData(isShowValidation, data.name)}
          helperText={invalidMessage(isShowValidation, data.name)}
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.status}
              onChange={(e) => {
                setData({ ...data, status: e.target.checked });
              }}
            />
          }
          label="Đang hoạt động"
        />
      </Box>
    </Box>
  );
};
