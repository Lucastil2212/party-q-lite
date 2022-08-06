import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

export default function SongSearch({ search, setSearch }: any) {
  const handleClick = (value: any) => {
    setSearch(value);
  };
  return (
    <div>
      <TextField
        label="Search Songs"
        variant="outlined"
        value={search}
        onChange={(e) => handleClick(e.target.value)}
      ></TextField>
    </div>
  );
}
