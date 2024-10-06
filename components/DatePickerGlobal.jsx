// import * as React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// export default function BasicDatePicker({
//   label,
//   value,
//   onChange,
//   readOnly,
//   disabled,
// }) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={["DatePicker"]}
//         sx={{
//           "& .MuiInputBase-input": {
//             fontSize: "13px",
//             height: "9px",
//             outlineWidth: "0px",
//             boxShadow: "none !important",
//           },
//           "$ .MuiInputLabel-root": {
//             position: "static",
//             fontSize: "9px",
//           },
//           "& .MuiFormLabel-root": {
//             position: "relative",
//             top: "18px",
//             fontSize: "15px",
//           },
//         }}
//         variant="standard">
//         <DatePicker
//           label={label}
//           sx={{ width: "100%" }}
//           onChange={onChange}
//           readOnly={readOnly}
//           value={value}
//           disabled={disabled}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
