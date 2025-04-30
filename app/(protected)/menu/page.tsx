"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Add } from "@mui/icons-material";
import menuTableAction from "@/actions/menuAction";
import BasicTable from "@/components/Table";
import TableFunc from "@/components/TableFunc";
import { menuItemTable } from "@/types/supabase_db.types";
import MenuTableModel from "./menuTableModel";
import ButtonCom from "@/components/Button";

const tableHeader = [
  "Name",
  "Image",
  "Category",
  "Tier",
  "Available Amount",
  "",
];
const FoodMenu = () => {
  const [foodMenu, setFoodMenu] = useState<menuItemTable[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCallApi, setIsCallApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<Partial<menuItemTable> | null>(null);
  useEffect(() => {
    // fetchFoodMenu();
  }, []);

  async function fetchFoodMenu() {
    setIsLoading(true);
    const res = await menuTableAction.getMenuTableInfo();
    setFoodMenu(res);
    setIsLoading(false);
  }
  const tableBody = useMemo(() => {
    return (
      foodMenu !== null &&
      foodMenu.map((item: menuItemTable, id: number) => {
        return [
          item.name,
          item.image,
          item.category_id,
          item.tier_list_id,
          item.available_amt,
          <TableFunc key={id} item={item} />,
        ];
      })
    );
  }, [foodMenu]);


  return (
    <div>
       <div className="text-right mb-4">
          <ButtonCom
            text="Add Table"
            variant="contained"
            icon={<Add />}
            onClick={() => [setEditData(null), setIsShowModal(true)]}
          />
        </div>
      <BasicTable
        data={tableBody}
        header={tableHeader}
        className="restaurant-table"
        isLoading={isLoading}
      />
      <MenuTableModel
        open={isShowModal}
        setOpen={setIsShowModal}
        callApi={setIsCallApi}
        // editData={null}
      />
    </div>
  );
};

export default FoodMenu;
