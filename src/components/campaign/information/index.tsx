import { Box, TextField } from "@mui/material";
import { invalidMessage, isInvalidData } from "helper";
import { useCallback } from "react";

interface InformationData {
  name: string;
  description: string;
}

interface Props {
  data: InformationData;
  setData: (data: InformationData) => void;
  isShowValidation: boolean;
}
export const Information = ({ data, setData, isShowValidation }: Props) => {
  const updateData = useCallback(
    (field: string, value: string) => {
      setData({ ...data, [field]: value });
    },
    [data, setData]
  );

  return (
    <Box flexDirection={"column"} display={"flex"}>
      <TextField
        required
        label={"Tên chiến dịch"}
        value={data.name}
        onChange={(e) => {
          updateData("name", e.target.value);
        }}
        error={isInvalidData(isShowValidation, data.name)}
        helperText={invalidMessage(isShowValidation, data.name)}
        sx={{ margin: "20px" }}
        variant="standard"
      />
      <TextField
        label={"Mô tả"}
        sx={{ margin: "0px 20px 30px 20px" }}
        variant="standard"
        value={data.description}
        onChange={(e) => {
          updateData("description", e.target.value);
        }}
      />
    </Box>
  );
};
