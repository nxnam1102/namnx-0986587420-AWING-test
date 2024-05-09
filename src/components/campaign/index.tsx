import { Box, Button, Container, Paper, Tab, Tabs } from "@mui/material";
import { TabPanel } from "./common/tab_pannel";
import { useState } from "react";
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ height: "100vh" }} disableGutters>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        padding={"20px 20px"}
        borderBottom={"1px solid black"}
      >
        <Button variant="contained">Submit</Button>
      </Box>
      <Paper elevation={1} sx={{ flexGrow: 1, margin: "20px" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label={"Thông Tin"} {...a11yProps(0)}></Tab>
          <Tab label={"Chiến dịch con"} {...a11yProps(1)}></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          <Information />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubCampaign />
        </TabPanel>
      </Paper>
    </Container>
  );
};
