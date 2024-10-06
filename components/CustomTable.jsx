import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";

const StyledTableContainer = styled(TableContainer)`
  box-shadow: none;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
  border: 0px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

const StyledTableHeadRow = styled(TableRow)`
  background-color: #f3f3f3;
`;

const StyledTableCell = styled(TableCell)`
  padding: 8px 24px;
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledTableCellData = styled(TableCell)`
  padding: 6px 20px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
`;

const StyledTableCellHeader = styled(TableCell)`
  padding: 5px 24px;
  font-size: 13px;
  width: 500px;
`;

const StyledTableBody = styled(TableBody)`
  padding: 6px 24px;
  height: 35px;
`;

const baseRenderCell = (item, header) => {
  return <span>{item[header.value]}</span>;
};

const renderCellTextarea = (item, header, onTextareaChange) => {
  if (header.type === "textarea") {
    return (
      <textarea
        value={item[header.value]}
        onChange={(e) => onTextareaChange(item, header.value, e.target.value)}
      />
    );
  } else {
    return <span>{item[header.value]}</span>;
  }
};

const CustomTable = ({
  headers,
  items,
  bodyHeight = "30px",
  renderCell = baseRenderCell,
  checkBox = false,
  onItemCheck,
  onAllCheck,
  groupHead = false,
  group,
  key,
  height,
}) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleItemCheck = (item) => {
    const updatedCheckedItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];
    setCheckedItems(updatedCheckedItems);
    if (onItemCheck) {
      onItemCheck(updatedCheckedItems);
    }
  };

  const handleAllCheck = () => {
    const updatedCheckedItems =
      checkedItems.length === items.length ? [] : [...items];
    setCheckedItems(updatedCheckedItems);
    if (onAllCheck) {
      onAllCheck(updatedCheckedItems);
    }
  };
  const title = "";

  const headerCount = headers.length;

  return (
    <StyledTableContainer
      component={Paper}
      style={{ maxHeight: height ? `${height}vh` : "auto" }}>
      <StyledTable>
        <TableHead>
          <StyledTableHeadRow>
            {checkBox ? (
              <StyledTableCellHeader>
                <Checkbox
                  checked={
                    checkedItems.length === items.length && items.length !== 0
                  }
                  onClick={handleAllCheck}
                />
              </StyledTableCellHeader>
            ) : (
              ""
            )}
            {headers.map(
              (header) =>
                !header.hidden && (
                  <StyledTableCellHeader
                    sx={{
                      minWidth: header.width,
                      fontWeight: "bold",
                      height: bodyHeight,
                    }}
                    align={header.align}
                    key={header.value}
                    style={{
                      borderRight: header.rightBorder ? "1px solid #ccc" : "",
                    }}>
                    <span className="-ml-1">{header.title.toUpperCase()}</span>
                  </StyledTableCellHeader>
                )
            )}
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <StyledTableRow style={{ height: bodyHeight }} key={item.id}>
                {checkBox ? (
                  <StyledTableCellData>
                    <Checkbox
                      checked={checkedItems.includes(item)}
                      onClick={() => handleItemCheck(item)}
                    />
                  </StyledTableCellData>
                ) : (
                  ""
                )}
                {headers.map(
                  (header) =>
                    !header.hidden && (
                      <StyledTableCellData
                        align={header.align}
                        key={header.value}
                        style={{
                          borderRight: header.rightBorder
                            ? "1px solid #ccc"
                            : "",
                        }}>
                        {renderCell(item, header)}
                      </StyledTableCellData>
                    )
                )}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCellData
                align="center"
                colSpan={headerCount}
                style={{ padding: "15px 0" }}>
                No Data Available
              </StyledTableCellData>
            </StyledTableRow>
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default CustomTable;
