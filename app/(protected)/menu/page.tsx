"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Add } from "@mui/icons-material";
import menuTableAction from "@/actions/menuAction";
import BasicTable from "@/components/Table";
import TableFunc from "@/components/TableFunc";
import { menuCategoryTable, menuItemTable, tierListTable } from "@/types/supabase_db.types";
import MenuTableModel from "./menuTableModel";
import ButtonCom from "@/components/Button";
import settingAction from "@/actions/settingAction";
import Image from "next/image";
import useTableEventDelegation from "@/hooks/useTableEventDelegation";

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
  const [tierListData, setTierListData] = useState<tierListTable[]>([]);
  const [menuCategoryData, setMenuCategoryData] = useState<menuCategoryTable[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCallApi, setIsCallApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<Partial<menuItemTable> | null>(null);
  useEffect(() => {
    fetchMenuCategory();
    fetchTierList();
  }, []);
  useEffect(() => {
    fetchFoodMenu();
  }, [isCallApi]);

  async function fetchFoodMenu() {
    setIsLoading(true);
    const res = await menuTableAction.getMenuTableInfo();
    setFoodMenu(res);
    setIsLoading(false);
  }
  const fetchMenuCategory = async () => {
    const res = await settingAction.getTableList("menu_category");
    setMenuCategoryData(res);
  };
  const fetchTierList = async () => {
    const res = await settingAction.getTableList("tier_list");
    setTierListData(res);
  };
  const tableBody = useMemo(() => {
    return (
      foodMenu !== null &&
      foodMenu.map((item: menuItemTable, id: number) => {
        return [
          item.name,
          <Image src={item.image} alt={item.name} width={80} height={80} quality={50} style={{justifySelf:'center'}}/>,
          item.menu_category.name,
          item.tier_list.name,
          item.available_amt,
          <TableFunc key={id} item={item} />,
        ];
      })
    );
  }, [foodMenu]);
  useTableEventDelegation(".menu-table", foodMenu, {
    onDelete: async (id) => {
      const res = await menuTableAction.deleteMenuRow(id);
      if (res?.message === "success")
        setFoodMenu((prev) => prev?.filter((item) => item.id !== id));
    },
    onEdit: (data) => {
      console.log(data,'dataa');
      setEditData({
        ...data,
        table_no : data.name,
        max_customer: data.available_amt
      })
      setIsShowModal(true)
      // editTable('other_info',obj)
    },
  });

  return (
    <div>
       <div className="text-right mb-4 mt-2">
          <ButtonCom
            text="Add Menu"
            variant="contained"
            icon={<Add />}
            onClick={() => [setEditData(null), setIsShowModal(true)]}
          />
        </div>
      <BasicTable
        data={tableBody}
        header={tableHeader}
        className="menu-table"
        isLoading={isLoading}
      />
      <MenuTableModel
        open={isShowModal}
        setOpen={setIsShowModal}
        callApi={setIsCallApi}
        tierListData={tierListData}
        menuCategoryData={menuCategoryData}
        editData={editData}
      />
    </div>
  );
};

export default FoodMenu;
