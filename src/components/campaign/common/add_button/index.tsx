import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Props {
  size?: "large" | "medium" | "small";
}
export const AddButton = ({ size }: Props) => {
  return (
    <IconButton sx={{ backgroundColor: "rgb(237, 237, 237)" }} size={size}>
      <Add sx={{ color: "red" }} />
    </IconButton>
  );
};
