'use client'
import React, { useEffect, useState } from "react";
import BasicTable from "@/components/Table";
import buffetTableAction from "@/actions/tableAction";
import { buffetTable } from "@/types/supabase_db.types";
import { Add } from "@mui/icons-material";
import TableFunc from "./restaurantTable";
import { getUser } from "@/utils/getUser";
import ButtonCom from "@/components/Button";
import AddRestaurantTableModal from "./addRestaurantTableModal";

const buffetTableHeader = [
  "ID",
  "Table Number",
  "Max Customer",
  "Availability",
  "Action",
];


export default function Dashboard() {
  const [buffetTable,setBuffetTable] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  useEffect(()=>{
    const callApi = async () => {
      const res = await buffetTableAction.getBuffetTableInfo();
      setBuffetTable(res)
    }
    callApi()
  },[])
  
  const res = buffetTable.map((item: buffetTable, id: number) => {
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
  })

  return (
    <div>
      Dashboard
      <br />
      <div className="flex w-full flex-col">
        <div className="text-right mb-4">
          <ButtonCom text="Add Table" variant="contained" icon={<Add/>} onClick={()=>setIsShowModal(true)}/>
        </div>
        <BasicTable data={res} header={buffetTableHeader} />
      </div>
      <AddRestaurantTableModal open={isShowModal} setOpen={setIsShowModal}/>
    </div>
  );
}
