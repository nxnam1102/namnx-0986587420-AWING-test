import { Box, Button, Container, Paper, Tab, Tabs } from "@mui/material";
import { cloneDeep, defaultSubCampaign } from "helper";
import { useCallback, useMemo, useState } from "react";
import { TabPanel } from "./common/tab_pannel";
import { Information } from "./information";
import { SubCampaign } from "./sub_campaign";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Campaign = () => {
  const [value, setValue] = useState(0);
  const [informationData, setInformationData] = useState({
    name: "",
    description: "",
  });

  const [subCampaign, setSubCampaign] = useState([defaultSubCampaign]);
  const [selectedSubCampaig, setSelectedSubCampaign] = useState(
    subCampaign[0].id
  );

  const [isShowValidation, setIsShowValidation] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderInformation = useMemo(() => {
    return (
      <Information
        data={informationData}
        setData={setInformationData}
        isShowValidation={isShowValidation}
      />
    );
  }, [informationData, isShowValidation]);

  const renderSubCampaign = useMemo(() => {
    return (
      <SubCampaign
        data={subCampaign}
        setData={setSubCampaign}
        selectedId={selectedSubCampaig}
        setSelectedId={setSelectedSubCampaign}
        isShowValidation={isShowValidation}
      />
    );
  }, [isShowValidation, selectedSubCampaig, subCampaign]);

  const onSubmit = useCallback(() => {
    let isValid = true;
    if (!informationData.name) {
      isValid = false;
    } else if (
      subCampaign.findIndex((item) => {
        return (
          !item.name ||
          item.ads.findIndex((ad) => {
            return !ad.name || !ad.quantity;
          }) >= 0 ||
          item.ads.length <= 0
        );
      }) >= 0
    ) {
      isValid = false;
    }
    if (isValid) {
      const resultDataSubCampaign: any = cloneDeep(subCampaign);
      resultDataSubCampaign.forEach((item: any) => {
        delete item.id;
        item.ads.forEach((ad: any) => {
          delete ad.id;
        });
      });
      const data = {
        campaign: {
          information: informationData,
          subCampaigns: resultDataSubCampaign,
        },
      };
      const message = `Thêm thành công chiến dịch\n ${JSON.stringify(data)}`;
      alert(message);
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
      setIsShowValidation(true);
    }
  }, [informationData, subCampaign]);

  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        padding={"20px 20px"}
        borderBottom={"1px solid #808080"}
      >
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
      <Paper elevation={1} sx={{ flexGrow: 1, margin: "20px" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label={"Thông Tin"} {...a11yProps(0)}></Tab>
          <Tab label={"Chiến dịch con"} {...a11yProps(1)}></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          {renderInformation}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderSubCampaign}
        </TabPanel>
      </Paper>
    </Container>
  );
};
