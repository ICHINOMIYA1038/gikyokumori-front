import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SortComponent({
  sort_by,
  sortDirection,
  onSortChange,
}: any) {
  const handleSortByChange = (event: any) => {
    const newSortByValue = event.target.value;
    onSortChange(newSortByValue, sortDirection);
  };

  const handleSortDirectionChange = (event: any) => {
    const newSortDirectionValue = event.target.value;
    onSortChange(sort_by, newSortDirectionValue);
  };

  return (
    <div className="sortContainer">
      <TextField
        select
        label="並び替え"
        value={sort_by}
        onChange={handleSortByChange}
      >
        <MenuItem value={0}>お気に入り順</MenuItem>
        <MenuItem value={1}>人数順(男)</MenuItem>
        <MenuItem value={2}>人数順(女)</MenuItem>
        <MenuItem value={3}>総人数</MenuItem>
        <MenuItem value={4}>作成日</MenuItem>
      </TextField>
      <TextField
        select
        label="並び替え方向"
        value={sortDirection}
        onChange={handleSortDirectionChange}
      >
        <MenuItem value={0}>昇順</MenuItem>
        <MenuItem value={1}>降順</MenuItem>
      </TextField>
    </div>
  );
}
