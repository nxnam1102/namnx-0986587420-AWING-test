import { Card, Paper, Typography } from "@mui/material";

export const Item = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "210px",
        height: "120px",
        marginLeft: "15px",
        cursor: "pointer",
        border: "2px solid transparent",
      }}
    >
      <Typography>{"name"}</Typography>
      <Typography>{"quantity"}</Typography>
    </Paper>
  );
};
