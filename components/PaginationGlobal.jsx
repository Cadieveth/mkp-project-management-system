import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box/Box";

function PaginationGlobal({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  // Menghitung jumlah halaman berdasarkan total item dan item per halaman
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="item-center">
      <Box display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => {
            onPageChange(page);
          }}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </div>
  );
}

export default PaginationGlobal;
