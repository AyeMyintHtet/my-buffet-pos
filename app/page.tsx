"use client";
import dayjs from 'dayjs';
import { Add } from "@mui/icons-material";
import dashboardAction from "@/actions/dashboardAction";
import BasicTable from "@/components/Table";
import TableFunc from "@/components/TableFunc";
import { buffetTable, customerTable } from "@/types/supabase_db.types";
import { getUser } from "@/utils/getUser";
import React, { useEffect, useMemo, useState } from "react";
import settingAction from '@/actions/settingAction';
import { Button } from '@mui/material';
import ButtonCom from '@/components/Button';
import SearchAutoComplete from '@/components/SearchAutoComplete';
import buffetTableAction from '@/actions/tableAction';
import BuffetReceipt, { ReceiptData } from '@/components/BuffetReceipt';

const tableHeader = [
  "Table No",
  "Customer Count",
  "Menu Tier",
  "Start Time",
  "End Time",
  "Status",
  "Settings",
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [buffetTable, setBuffetTable] = useState<customerTable[] | null>(null);
  const [rawBuffetTable, setRawBuffetTable] = useState<customerTable[] | null>(null);
  const [timeLimit,setTimeLimit] = useState<[Number,Number]>([0,0]);
  const [getTableId, setGetTableId] = useState<string | null>(null);
  const [tableNumberList, setTableNumberList] = useState<string[]>([]);
  const [buffetReceiptData, setBuffetReceiptData] = useState<ReceiptData>({})
  const fetchCustomerTable = async () => {
    setIsLoading(true);
    const res = await dashboardAction.getMenuTableInfo()
    if (res) {
      setBuffetTable(res);
      setRawBuffetTable(res);
    }
    setIsLoading(false);
  };
  const fetchTimeSetting = async () => {
    const res = await settingAction.getTableList("other_info");
    console.log(res);
    const timeSetting = res.find((item: any) => item.name === "time_limit");
    const time = timeSetting?.value.split(":");
    setTimeLimit([time[0], time[1]]);
  }
  const fetchBuffetTable = async () => {
    const res = await buffetTableAction.getBuffetTableInfo();
    const obj = res.map((item:buffetTable)=> item.table_no.toString());
    setTableNumberList(obj);
  }
  useEffect(() => {
    if(getTableId){
      const res: customerTable[] = buffetTable?.filter((item:customerTable) => item.buffet_table.table_no.toString() === getTableId && item.paid === false) || [];
      setBuffetTable(res);
    }else{
      setBuffetTable(rawBuffetTable);
    }

  },[getTableId]);
  console.log(getTableId);
  useEffect(() => {
    fetchCustomerTable();
    fetchTimeSetting();
    fetchBuffetTable();
  }, []);


  const tableBody = useMemo(() => {
    return (
      buffetTable !== null &&
      buffetTable.map((item: customerTable, id: number) => {
        const calculatedDate = dayjs(item.created_at);
        return [
          item.buffet_table.table_no,
          item.customer_count,
          item.tier_list.name,
          calculatedDate.format("HH:mm:ss"),
          calculatedDate.add(Number(timeLimit[0]), 'hour').add(Number(timeLimit[1]), 'minute').format("HH:mm:ss"),,
          item.paid ? "Paid" : "Pending",
          <TableFunc key={id} item={item} />,
          <Button variant="contained">Print</Button>
        ];
      })
    );
  }, [buffetTable]);

  return (
    <div>
      Dashboard
      {/* <BuffetReceipt data={}/> */}
      <div className="text-right mb-4 mt-2">
          <ButtonCom
            text="New Customer"
            variant="contained"
            icon={<Add />}
            onClick={() => []}
          />
          <SearchAutoComplete data={tableNumberList} setValue={setGetTableId} label='Search Table Number'/>
        </div>
      <br />
      <BasicTable
        data={tableBody}
        header={tableHeader}
        className="dashboard-menu-table"
        isLoading={isLoading}
      />
    </div>
  );
}
