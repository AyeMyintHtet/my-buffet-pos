"use client";
import menuTableAction from "@/actions/menuAction";
import BasicTable from "@/components/Table";
import TableFunc from "@/components/TableFunc";
import { menuItemTable } from "@/types/supabase_db.types";
import React, { useEffect, useMemo, useState } from "react";
import MenuTableModel from "./menuTableModel";

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
  useEffect(() => {
    fetchFoodMenu();
  }, []);

  async function fetchFoodMenu() {
    const res = await menuTableAction.getMenuTableInfo();
    console.log(res);
    setFoodMenu(res);
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
      <BasicTable
        data={tableBody}
        header={tableHeader}
        className="restaurant-table"
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
