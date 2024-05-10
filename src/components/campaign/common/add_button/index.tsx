import { Add } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";

interface Props {
  size?: "large" | "medium" | "small";
  onClick?: () => void;
}
export const AddButton = ({ size, onClick }: Props) => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{ backgroundColor: "rgb(237, 237, 237)" }}
      size={size}
      onClick={onClick}
    >
      <Add sx={{ color: theme.palette.primary.main }} />
    </IconButton>
  );
};
