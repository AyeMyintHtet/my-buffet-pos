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
  callApi: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: (item:buffetTable)=>void;
}
const handleDelete = async (id:number, callApi:React.Dispatch<React.SetStateAction<boolean>>) => {
  await buffetTableAction.deleteBuffetTable(id);
  callApi((prev) => !prev);
};

const TableFunc = ({ id, item, callApi,showEditModal }: TableFuncProps) => {

  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton color="error" onClick={() => handleDelete(item.id,callApi)}>
        <Delete />
      </IconButton>
      <IconButton color="primary" onClick={() => showEditModal(item)}>
        <Edit />
      </IconButton>
    </div>
  );
};

export default TableFunc;
