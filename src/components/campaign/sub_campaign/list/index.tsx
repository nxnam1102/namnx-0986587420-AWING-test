import { Grid } from "@mui/material";
import { AddButton } from "components/campaign/common/add_button";
import { Item } from "./item";
import { SubCampaignData } from "interface/index.interface";

interface Props {
  data: SubCampaignData[];
  onClickAddNew: () => void;
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
  isShowValidation: boolean;
}
export const List = ({
  data,
  onClickAddNew,
  selectedId,
  setSelectedId,
  isShowValidation,
}: Props) => {
  console.log(selectedId, data);
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
        <AddButton size="large" onClick={onClickAddNew}></AddButton>
      </Grid>
      {data.map((item) => {
        return (
          <Grid>
            <Item
              data={item}
              isSelected={item.id === selectedId}
              isShowValidation={isShowValidation}
              onClick={() => {
                setSelectedId(item.id);
              }}
            ></Item>
          </Grid>
        );
      })}
    </Grid>
  );
};
