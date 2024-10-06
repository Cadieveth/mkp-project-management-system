import React from "react";

function Chip({ color, label }) {
  let chipColor = "bg-red-500";

  if (color === "green") {
    chipColor = "bg-green-500";
  } else if (color === "blue") {
    chipColor = "bg-blue-500";
  } else if (color === "yellow") {
    chipColor = "bg-yellow-500";
  }

  return (
    <span
      className={`inline-block rounded-full px-4 py-1 text-white ${chipColor}`}>
      {label}
    </span>
  );
}

export default Chip;
