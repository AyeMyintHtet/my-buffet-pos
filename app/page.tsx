"use client";
import dayjs from 'dayjs';
import dashboardAction from "@/actions/dashboardAction";
import BasicTable from "@/components/Table";
import TableFunc from "@/components/TableFunc";
import { buffetTable, customerTable } from "@/types/supabase_db.types";
import { getUser } from "@/utils/getUser";
import React, { useEffect, useMemo, useState } from "react";
import settingAction from '@/actions/settingAction';
import { Button } from '@mui/material';

const tableHeader = [
  "Table No",
  "Customer Count",
  "Menu Tier",
  "Start Time",
  "End Time",
  "Status",
  "",
  "",
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [buffetTable, setBuffetTable] = useState<customerTable[] | null>(null);
  const [timeLimit,setTimeLimit] = useState<[Number,Number]>([0,0]);


  const fetchBuffetTable = async () => {
    setIsLoading(true);
    const res = await dashboardAction.getMenuTableInfo()
    if (res) {
      setBuffetTable(res);
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
  useEffect(() => {
    fetchBuffetTable();
    fetchTimeSetting()
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
      <br />
      <BasicTable
        data={tableBody}
        header={tableHeader}
        className="menu-table"
        isLoading={isLoading}
      />
    </div>
  );
}
