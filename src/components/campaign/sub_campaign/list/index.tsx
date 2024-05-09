import { Add } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Item } from "./item";
import { AddButton } from "components/campaign/common/add_button";

export const List = () => {
  return (
    <Grid
      container
      sx={{
        flex: 1,
        padding: "20px",
        overflowX: "scroll",
      }}
      wrap="nowrap"
    >
      <Grid>
        <AddButton size="large"></AddButton>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
      <Grid>
        <Item></Item>
      </Grid>
    </Grid>
  );
};
