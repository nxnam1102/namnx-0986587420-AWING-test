import { Box } from "@mui/material";
import { defaultSubCampaign, generateUniqueId } from "helper";
import { useCallback, useMemo } from "react";
import { FormSubCampaign } from "./form";
import { List } from "./list";
import { ListAds } from "./list_ads";
import { SubCampaignData } from "interface/index.interface";

interface SubCampaignProps {
  data: SubCampaignData[];
  setData: (data: SubCampaignData[]) => void;
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
  isShowValidation: boolean;
}

export const SubCampaign = ({
  data,
  setData,
  selectedId,
  setSelectedId,
  isShowValidation,
}: SubCampaignProps) => {
  const onAddNewSubCampaign = useCallback(() => {
    let newData = [
      ...data,
      {
        ...defaultSubCampaign,
        name: `Chiến dịch con ${data.length + 1}`,
        id: generateUniqueId(),
      },
    ];
    setData(newData);
  }, [data, setData]);

  const renderList = useMemo(() => {
    return (
      <List
        data={data}
        onClickAddNew={onAddNewSubCampaign}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        isShowValidation={isShowValidation}
      ></List>
    );
  }, [data, isShowValidation, onAddNewSubCampaign, selectedId, setSelectedId]);

  const selectedData = useMemo(() => {
    return data.find((item) => item.id === selectedId);
  }, [data, selectedId]);

  const setDataSubCampaign = useCallback(
    (updateData: SubCampaignData) => {
      const newData = [...data];
      const index = newData.findIndex((item) => item.id === updateData.id);
      if (index >= 0) {
        newData[index] = updateData;
        setData(newData);
      }
    },
    [data, setData]
  );

  const renderFormSubCampaign = useMemo(() => {
    return (
      <FormSubCampaign
        data={selectedData || defaultSubCampaign}
        setData={setDataSubCampaign}
        isShowValidation={isShowValidation}
      ></FormSubCampaign>
    );
  }, [isShowValidation, selectedData, setDataSubCampaign]);

  const renderListAds = useMemo(() => {
    return (
      <ListAds
        data={selectedData || defaultSubCampaign}
        columns={[
          { dataField: "name", label: "Tên chiến quảng cáo", required: true },
          {
            dataField: "quantity",
            label: "Số lượng",
            required: true,
            type: "number",
          },
        ]}
        setData={setDataSubCampaign}
        isShowValidation={isShowValidation}
      ></ListAds>
    );
  }, [isShowValidation, selectedData, setDataSubCampaign]);

  return (
    <Box sx={{ margin: "0px 20px" }}>
      {renderList}
      {renderFormSubCampaign}
      {renderListAds}
    </Box>
  );
};
