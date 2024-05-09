import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState, useId } from "react";

export const DataTable = () => {
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const column = [
    {
      dataField: "name",
      label: "Tên quảng cáo",
      required: true,
    },
    { dataField: "quantity", label: "Số lượng", required: true },
  ];
  const data = [
    { id: useId(), name: "QC 1", quantity: 0 },
    { id: useId(), name: "QC 2", quantity: 0 },
    { id: useId(), name: "QC 3", quantity: 0 },
  ];

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelectedRow(newSelected);
      return;
    }
    setSelectedRow([]);
  };

  const renderHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={
                selectedRow.length > 0 && selectedRow.length < data.length
              }
              checked={data.length > 0 && selectedRow.length === data.length}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {selectedRow.length > 0 ? (
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              sx={{ margin: "10px" }}
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete></Delete>}
              >
                Xóa
              </Button>
            </Box>
          ) : (
            <>
              {column.map((item) => {
                return (
                  <TableCell key={item.dataField} aria-required>{`${
                    item.label
                  }${item.required ? "*" : ""}`}</TableCell>
                );
              })}
            </>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const isSelected = (id: string) => selectedRow.indexOf(id) !== -1;

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex = selectedRow.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1)
      );
    }
    setSelectedRow(newSelected);
  };

  const renderBody = () => {
    return (
      <TableBody>
        {data.map((row: any, index) => {
          const isItemSelected = isSelected(row.id);
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              sx={{ cursor: "pointer" }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={(e) => {
                    handleClick(e, row.id);
                  }}
                />
              </TableCell>
              {column.map((col) => {
                return (
                  <TableCell key={`${index}-${col.dataField}`}>
                    <TextField
                      sx={{ width: "100%" }}
                      value={row[col.dataField]}
                      variant="standard"
                    ></TextField>
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <IconButton>
                  <Delete></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <TableContainer>
      <Table>
        {renderHeader()}
        {renderBody()}
      </Table>
    </TableContainer>
  );
};
