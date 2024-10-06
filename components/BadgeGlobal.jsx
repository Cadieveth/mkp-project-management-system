import React from "react";

function BadgeGlobal({ color, text }) {
  const badgeClasses = `text-xs inline-flex font-medium bg-${color}-100 text-${color}-600 rounded-full text-center px-3 py-0.5`;

  return (
    <div className="m-0.2">
      {/* PILIHAN WARNA BADGE */}
      {/* <BadgeGlobal color="indigo" text="Working on" />
        <BadgeGlobal color="sky" text="Exciting news" />
        <BadgeGlobal color="emerald" text="Product" />
        <BadgeGlobal color="amber" text="Announcement" />
        <BadgeGlobal color="rose" text="Bug Fix" />
        <BadgeGlobal color="blue" text="Customer Stories" />
        <BadgeGlobal color="slate" text="All Stories" />
        <BadgeGlobal color="slate-700" text="All Stories" /> */}
      <div className={badgeClasses}>{text}</div>
    </div>
  );
}

export default BadgeGlobal;
