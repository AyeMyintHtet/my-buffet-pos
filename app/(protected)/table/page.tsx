import React from "react";
import BasicTable from "@/components/Table";
import buffetTableAction from "@/actions/tableAction";
import { buffetTable } from "@/types/supabase_db.types";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TableFunc from "./resturantTable";
import { getUser } from "@/utils/getUser";

const buffetTableHeader = [
  "ID",
  "Table Number",
  "Max Customer",
  "Availability",
  "Action",
];
export default async function Dashboard() {
  const { getTable } = await buffetTableAction();
 const data = await getUser()
  const res = getTable.map((item: buffetTable, id: number) => {
    return [
      id + 1,
      item.table_no,
      item.max_customer,
      item.is_used ? (
        <p className="text-red-500">Used</p>
      ) : (
        <p className="text-green-500">Available</p>
      ),
      <TableFunc key={id} id={id} item={item} />,
    ];
  });

  return (
    <div>
      Dashboard
      {data.user?.user?.email}
      <br />
      <div className="flex w-full">
        <BasicTable data={res} header={buffetTableHeader} />
      </div>
    </div>
  );
}
