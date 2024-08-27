"use client";

import useStore from "../lib/store";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './table';

export default function TagTable() {
  const { dataArray } = useStore();
  const [data, setData] = useState(dataArray);

  useEffect(() => {
    if (!dataArray) return;
    setData(dataArray.map(row => ({
      ...row,
      selecttags: row.selecttags || [],
      selectedTags: row.selectedTags || [] // Ensure selectedTags is always an array
    })));
  }, [dataArray]);

  const handleAddTag = (id: number, newTag: string) => {
    const updatedData = data.map((row) => {
      if (row.id === id && newTag && !row.selectedTags.includes(newTag)) {
        return { ...row, selectedTags: [...row.selectedTags, newTag] };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleRemoveTag = (id: number, tagToRemove: string) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          selectedTags: (row.selectedTags || []).filter((tag: string) => tag !== tagToRemove),
        };
      }
      return row;
    });
    setData(updatedData);
  };

  // Collect all unique tags from selecttags
  const allTags = Array.from(new Set(data.flatMap((row) => row.selecttags)));

  return (
    <Table className=" p-4 border-none rounded-md overflow-x-auto">
      <TableCaption className="m-0 p-0">Uploads</TableCaption>
      <TableHeader className="w-full">
        <TableRow className="grid w-full gap-x-3 grid-cols-[0.7fr_1fr_1fr_1fr_2fr]">
          <TableHead className="w-[70px]">Sl No.</TableHead> {/* Fixed width for Sl No. */}
          <TableHead className="w-[200px] text-left">Links</TableHead> {/* Fixed width for Links */}
          <TableHead className="w-[150px]">Prefix</TableHead> {/* Fixed width for Prefix */}
          <TableHead className="w-[150px]">Add Tags</TableHead> {/* Fixed width for Add Tags */}
          <TableHead className="w-full">Selected Tags</TableHead> {/* Flexible width for Selected Tags */}
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {data.map((row, index) => (
          <TableRow key={row.id} className="grid w-full gap-x-3 overflow-auto dark:bg-black bg-white my-2 grid-cols-[0.7fr_1fr_1fr_1fr_2fr]">
            <TableCell className="w-[70px] text-center">
              {index + 1}
            </TableCell>
            <TableCell className="w-[200px] text-blue-500">
              <a href={row.links}>{row.links}</a>
            </TableCell>
            <TableCell className="w-[150px]">{row.prefix}</TableCell>
            <TableCell className="w-[150px] dark:bg-black text-black dark:text-white bg-white">
              <select
                onChange={(e) => handleAddTag(row.id, e.target.value)}
                className="p-2  border bg-white dark:bg-black dark:text-white text-black rounded w-full"
                value=""
              >
                <option value="" disabled>
                  Select Tag
                </option>
                {allTags
                  .filter(tag => !(row.selectedTags || []).includes(tag)) // Ensure selectedTags is an array
                  .map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
              </select>
            </TableCell>
            <TableCell className="w-full  overflow-auto">
              <div className="flex gap-2">
                {(row.selectedTags || []).map((tag : string) => (
                  <span
                    key={tag}
                    className="bg-[#836FFF] text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(row.id, tag)}
                      className="text-white text-xl"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
