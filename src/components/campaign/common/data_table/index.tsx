import { Add, Delete } from "@mui/icons-material";
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
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { generateUniqueId, isInvalidData } from "helper";
import {
  AdsData,
  GridColumn,
  SubCampaignData,
} from "interface/index.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

interface TableProps {
  data: SubCampaignData;
  columns: GridColumn[];
  setData: (data: SubCampaignData) => void;
  isShowValidation: boolean;
}

export const DataTable = ({
  columns,
  data: dataSubCampaign,
  setData,
  isShowValidation,
}: TableProps) => {
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = useMemo(() => {
    return dataSubCampaign.ads;
  }, [dataSubCampaign.ads]);

  const onSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = data.map((n) => n.id);
        setSelectedRow(newSelected);
        return;
      }
      setSelectedRow([]);
    },
    [data]
  );

  const visibleRows = useMemo(
    () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  );

  useEffect(() => {
    if (visibleRows.length === 0 && page > 0) {
      setPage(page - 1);
    }
  }, [page, visibleRows.length]);

  const updateAds = useCallback(
    (updateData: AdsData[]) => {
      const newData = { ...dataSubCampaign, ads: updateData };
      setData(newData);
    },
    [dataSubCampaign, setData]
  );

  const addNewAds = useCallback(() => {
    const updateData = [...data];
    updateData.push({
      id: generateUniqueId(),
      name: `Quảng cáo ${data.length + 1}`,
      quantity: 0,
    });
    updateAds(updateData);
    let currentPage = Math.ceil(updateData.length / rowsPerPage);
    setPage(currentPage - 1);
  }, [data, rowsPerPage, updateAds]);

  const deleteAds = useCallback(
    (listDeleteId: string[]) => {
      const updateData = [...data].filter((item) => {
        let index = listDeleteId.findIndex((i) => item.id === i);
        return index < 0;
      });
      updateAds(updateData);
    },
    [data, updateAds]
  );

  const changeFieldValue = useCallback(
    (row: any, col: GridColumn, value: any) => {
      const updateRowData = {
        ...row,
        [col.dataField]: value,
      };
      const index = data.findIndex((x) => x.id === row.id);
      if (index >= 0) {
        const updateData = [...data];
        updateData[index] = updateRowData;
        updateAds(updateData);
      }
    },
    [data, updateAds]
  );

  const renderHeader = useMemo(() => {
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
            <TableCell>
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ display: "flex", marginRight: "20px" }}
                  startIcon={<Delete></Delete>}
                  onClick={() => {
                    deleteAds(selectedRow);
                    setSelectedRow([]);
                  }}
                >
                  Xóa
                </Button>
                <Typography
                  fontWeight={"500"}
                  alignSelf={"center"}
                >{`Đã chọn ${selectedRow.length} bản ghi`}</Typography>
              </Box>
            </TableCell>
          ) : (
            <>
              {columns.map((item) => {
                return (
                  <TableCell key={item.dataField} aria-required>{`${
                    item.label
                  }${item.required ? "*" : ""}`}</TableCell>
                );
              })}
              <TableCell>
                <Button
                  startIcon={<Add></Add>}
                  variant="outlined"
                  onClick={addNewAds}
                >
                  Thêm
                </Button>
              </TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
    );
  }, [
    addNewAds,
    columns,
    data.length,
    deleteAds,
    onSelectAllClick,
    selectedRow,
  ]);

  const isSelected = useCallback(
    (id: string) => selectedRow.indexOf(id) !== -1,
    [selectedRow]
  );

  const handleClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
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
    },
    [selectedRow]
  );

  const renderBody = useMemo(() => {
    return (
      <TableBody>
        {visibleRows.map((row: any, index: number) => {
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
              {columns.map((col) => {
                return (
                  <TableCell key={`${index}-${col.dataField}`}>
                    <TextField
                      sx={{ width: "100%" }}
                      onFocus={(e) => {
                        if (col.type === "number") e.target.select();
                      }}
                      value={row[col.dataField]}
                      onChange={(e) => {
                        let value: any = e.target.value;
                        if (col.type === "number") {
                          value = parseFloat(value) || 0;
                        }
                        changeFieldValue(row, col, value);
                      }}
                      error={isInvalidData(
                        isShowValidation,
                        row[col.dataField]
                      )}
                      variant="standard"
                      type={col.type === "number" ? "number" : undefined}
                    ></TextField>
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <IconButton
                  onClick={(e) => {
                    deleteAds([row.id]);
                  }}
                >
                  <Delete></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }, [
    changeFieldValue,
    columns,
    deleteAds,
    handleClick,
    isSelected,
    isShowValidation,
    visibleRows,
  ]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const renderPagination = useMemo(() => {
    return (
      <TablePagination
        width={"100%"}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  }, [
    data.length,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  ]);

  return (
    <>
      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          {renderHeader}
          {renderBody}
        </Table>
      </TableContainer>
      {renderPagination}
    </>
  );
};
