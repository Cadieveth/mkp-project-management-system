import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Label } from "@mui/icons-material";

export default function WysiwygGlobal({
  readOnly,
  placeholder,
  item,
  setItem,
  label,
  maxHeight, // Tambahkan prop maxHeight
  labelSize,
  textFieldOnly,
}) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: readOnly,
      placeholder: placeholder || "Start typing...",
      style: {
        fontSize: "13px",
      },
    }),
    [placeholder, textFieldOnly]
  );

  const containerStyle = {
    maxHeight: maxHeight || "none", // Mengatur tinggi maksimal dari prop atau default ke "none" jika tidak ditetapkan
    overflowY: maxHeight ? "auto" : "visible", // Menambahkan overflow jika maxHeight ditetapkan
  };

  return (
    <div style={containerStyle}>
      <div className="mb-1">
        <span
          style={{
            fontWeight: "600",
            fontSize: labelSize ? labelSize : "11px",
            color: "#7a7a7a",
            border: "3px solid white",
          }}>
          {label}
        </span>
      </div>
      <JoditEditor
        ref={editor}
        value={item}
        config={config}
        tabIndex={1}
        onBlur={(newValue) => setItem(newValue)}
        onChange={(newValue) => {}}
      />
    </div>
  );
}
