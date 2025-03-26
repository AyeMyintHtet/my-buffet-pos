"use client";
import React, { useEffect, useState } from "react";
import BasicTable from "@/components/Table";
import buffetTableAction from "@/actions/tableAction";
import { buffetTable } from "@/types/supabase_db.types";
import { Add } from "@mui/icons-material";
import TableFunc from "./restaurantTable";
import ButtonCom from "@/components/Button";
import RestaurantTableModal from "./restaurantTableModal";
import { useRouter } from "next/navigation";

const buffetTableHeader = [
  "ID",
  "Table Number",
  "Max Customer",
  "Availability",
  "Action",
];

export default function Dashboard() {
  const [buffetTable, setBuffetTable] = useState<buffetTable[] | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCallApi, setIsCallApi] = useState(false);
  const [editData, setEditData] = useState<Partial<buffetTable> | null>(null);
  const router = useRouter();

  useEffect(() => {
    callApi();
  }, [isCallApi]);

  useEffect(() => {
    const table = document.querySelector(".restaurant-table") as HTMLElement;
    if (!table) return;
    table.addEventListener("click", handleClick);
    return () => {
      table.removeEventListener("click", handleClick);
    };
  }, [buffetTable]);

  async function callApi() {
    const res = await buffetTableAction.getBuffetTableInfo();
    setBuffetTable(res);
  }

  async function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const deleteBtn = target.closest(".delete-btn");
    const editBtn = target.closest(".edit-btn");
    if (deleteBtn) {
      const id = (deleteBtn?.parentNode as HTMLElement)?.id;
      if (id) {
        const res = await buffetTableAction.deleteBuffetTable(Number(id));
        if (res?.message === "success") {
          setBuffetTable((prev: any) =>
            prev?.filter((item: buffetTable) => item.id !== Number(id))
          );
        }
      }
    }
    if (editBtn) {
      const id = (editBtn?.parentNode as HTMLElement)?.id;
      const data = buffetTable?.find(
        (item: buffetTable) => item.id === Number(id)
      );
      if (data) {
        console.log("data", data);
        setEditData({
          id: data.id,
          table_no: data.table_no,
          max_customer: data.max_customer,
        });
        setIsShowModal(true);
      }
    }
  }

  const res =
    buffetTable !== null &&
    buffetTable.map((item: buffetTable, id: number) => {
      return [
        id + 1,
        item.table_no,
        item.max_customer,
        item.is_used ? (
          <p className="text-red-500">Used</p>
        ) : (
          <p className="text-green-500">Available</p>
        ),
        <TableFunc key={id} item={item} />,
      ];
    });

  return (
    <div className="mt-5">
      <div className="flex w-full flex-col">
        <div className="text-right mb-4">
          <ButtonCom
            text="Add Table"
            variant="contained"
            icon={<Add />}
            onClick={() => [setEditData(null), setIsShowModal(true)]}
          />
        </div>
        <BasicTable
          data={res}
          header={buffetTableHeader}
          className="restaurant-table"
        />
      </div>
      <RestaurantTableModal
        open={isShowModal}
        setOpen={setIsShowModal}
        callApi={setIsCallApi}
        editData={editData}
      />
    </div>
  );
}
