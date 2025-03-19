"use client";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { buffetTable } from "@/types/supabase_db.types"; // Adjust the import path
import buffetTableAction from "@/actions/tableAction"; 
import { useRouter } from "next/navigation";
interface TableFuncProps {
  id: number;
  item: buffetTable;
}

const TableFunc = ({id, item}: TableFuncProps) => {
  const router =  useRouter()
  const handleDelete = async () => {
    const res = await buffetTableAction.deleteBuffetTable(item.id)
    router.refresh()

    // console.log("Deleted row with id:", id, "and data:", res);
  };

  const handleEdit = async () => {
    const res = await buffetTableAction.updateBuffetTable(item.id,{is_used: true })
    router.refresh()
    // console.log("Editing row with id:", id, "and data:", res);
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton color="error" onClick={()=>handleDelete()}>
        <Delete />
      </IconButton>
      <IconButton color="primary" onClick={()=>handleEdit()}>
        <Edit />
      </IconButton>
    </div>
  );
};

export default TableFunc;