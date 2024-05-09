import { Typography, useTheme } from "@mui/material";

interface Props {
  variant?: "primary" | "default";
  label?: string;
}
export const Title = ({ variant, label }: Props) => {
  const theme = useTheme();

  return (
    <Typography
      display={"flex"}
      variant="h6"
      textAlign={"left"}
      color={variant === "primary" ? theme.palette.primary.main : undefined}
    >
      {label}
    </Typography>
  );
};
