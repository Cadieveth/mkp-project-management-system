import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomVerticalTable = ({ data, downloadClick }) => {
  return (
    <Table>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            sx={{
              height: "20px",
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#f3f3f3",
              },
              padding: 1,
            }}>
            <TableCell
              variant="head"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                padding: 1,
              }}>
              {row.header}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "13px",
                padding: 1,
              }}>
              {row.value == null || row.value === "" ? (
                "No Data Available"
              ) : (
                <>
                  {row.value}
                  {row.iconVisible && (
                    <FontAwesomeIcon
                      icon={faDownload}
                      onClick={() => downloadClick(row.value)}
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                    />
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomVerticalTable;

//Contoh penggunaan komponen bisa dilihat pada SprintDoc
