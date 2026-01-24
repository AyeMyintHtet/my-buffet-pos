"use client";
import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import settingAction from "@/actions/settingAction";
import BasicTable from "@/components/Table";
import { Add } from "@mui/icons-material";
import {
  IDatabases,
  menuCategoryTable,
  otherInfoTable,
  tierListTable,
} from "@/types/supabase_db.types";
import ButtonCom from "@/components/Button";
import TableFunc from "@/components/TableFunc";
import useTableEventDelegation from "@/hooks/useTableEventDelegation";
import SettingTableModel, { ModalFormData } from "./settingTableModel";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const tierListHeader = ["ID", "Name", "Amount", "Level", ""];
const menuCategoryHeader = ["ID", "  Name   ", ""];
const timeLimitHeader = ["ID", "Time Limit", ""];

const Setting = () => {
  const queryClient = useQueryClient();
  const [open, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalFormData>({
    table: "",
    data: [],
  });

  // --- Queries ---
  const { data: tierListData, isLoading: isTierLoading } = useQuery({
    queryKey: ["tier_list"],
    queryFn: () => settingAction.getTableList("tier_list"),
    staleTime: Infinity,
  });

  const { data: menuCategoryData, isLoading: isMenuLoading } = useQuery({
    queryKey: ["menu_category"],
    queryFn: () => settingAction.getTableList("menu_category"),
    staleTime: Infinity,
  });

  const { data: otherInfoData, isLoading: isOtherInfoLoading } = useQuery({
    queryKey: ["other_info"],
    queryFn: () => settingAction.getTableList("other_info"),
    staleTime: Infinity,
  });

  const timeLimitData = useMemo(
    () =>
      otherInfoData?.filter(
        (item: otherInfoTable) => item.name === "time_limit"
      ),
    [otherInfoData]
  );

  // --- Invalidation Helper ---
  const invalidateTable = (table: string) => {
    queryClient.invalidateQueries({ queryKey: [table] });
    if (table === "other_info") {
      // Since time limit is derived from other_info, invalidating other_info works
    }
  };

  // --- Event Delegation ---
  useTableEventDelegation(".tier-list", tierListData, {
    onDelete: async (id) => {
      const res = await settingAction.deleteRow("tier_list", id);
      if (res?.message === "success") invalidateTable("tier_list");
    },
    onEdit: (data) => {
      const obj = [
        { inputid: "name", name: "Name", value: data.name },
        { inputid: "amount", name: "Amount", value: data.amount },
        { inputid: "level", name: "Level", value: data.level },
      ];
      editTable("tier_list", obj, data.id);
    },
  });

  useTableEventDelegation(".menu-category-list", menuCategoryData, {
    onDelete: async (id) => {
      const res = await settingAction.deleteRow("menu_category", id);
      if (res?.message === "success") invalidateTable("menu_category");
    },
    onEdit: (data) => {
      const obj = [
        { inputid: "name", name: "Name", value: data.name },
      ];
      editTable("menu_category", obj, data.id);
    },
  });

  useTableEventDelegation(".time-limit-list", timeLimitData, {
    onDelete: async (id) => {
      const res = await settingAction.deleteRow("other_info", id);
      if (res?.message === "success") invalidateTable("other_info");
    },
    onEdit: (data) => {
      const obj = [
        { inputid: "value", name: "Time Limit", value: data.value },
      ];
      editTable("other_info", obj, data.id); // Assuming we can edit other_info directly
    },
  });

  // --- Table Bodies ---
  const tierListBody = useMemo(() => {
    return (
      tierListData?.map((item: tierListTable, id: number) => {
        return [
          id + 1,
          item.name,
          item.amount,
          item.level,
          <TableFunc key={id} item={item} />,
        ];
      })
    );
  }, [tierListData]);

  const menuCategoryBody = useMemo(() => {
    return (
      menuCategoryData?.map((item: menuCategoryTable, id: number) => {
        return [id + 1, item.name, <TableFunc key={id} item={item} />];
      })
    );
  }, [menuCategoryData]);

  const timeLimitBody = useMemo(() => {
    return (
      timeLimitData?.map((item: otherInfoTable, id: number) => {
        return [id + 1, item.value, <TableFunc key={id} item={item} />];
      })
    );
  }, [timeLimitData]);


  // --- Actions ---
  const addTable = async (tableName: IDatabases) => {
    let obj = [{ inputid: "name", name: "Name" }];

    if (tableName === "tier_list") {
      obj = [
        { inputid: "name", name: "Name" },
        { inputid: "amount", name: "Amount" },
        { inputid: "level", name: "Level" },
      ];
    } else if (tableName === "other_info") {
      obj = [{ inputid: "value", name: "Time Limit" }];
    }

    setModalData({
      table: tableName,
      data: obj,
      callApi: async () => {
        invalidateTable(tableName);
        setIsOpen(false);
      },
      // Note: Actual API call for ADD happens inside modal, passing callback to refresh
    });
    setIsOpen(true);
  };

  function editTable(
    tableName: IDatabases,
    data: Array<any>,
    EditId: number
  ) {
    setModalData({
      EditId,
      table: tableName,
      data: data,
      callApi: async () => {
        invalidateTable(tableName);
        setIsOpen(false);
      },
    });
    setIsOpen(true);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <div className="flex justify-between items-center mb-2">
              <h2>Tier List</h2>
              <ButtonCom
                text="Add tier"
                variant="contained"
                className="add-tier-list"
                icon={<Add />}
                onClick={() => addTable("tier_list")}
              />
            </div>
            <BasicTable
              className="tier-list mb-10"
              data={tierListBody}
              header={tierListHeader}
              isLoading={isTierLoading}
            />
            <hr />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <div className="flex justify-between items-center mb-2">
              <h2>Menu Categroy</h2>
              <ButtonCom
                text="Add Menu Category"
                variant="contained"
                className="add-menu-category"
                icon={<Add />}
                onClick={() => addTable("menu_category")}
              />
            </div>

            <BasicTable
              header={menuCategoryHeader}
              className="menu-category-list mb-10"
              isLoading={isMenuLoading}
              data={menuCategoryBody}
            />
            <hr />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <div className="flex justify-between items-center mb-2">
              <h2>Time Limit</h2>
              <ButtonCom
                text="Add Time Limit"
                variant="contained"
                className="add-time-limit"
                icon={<Add />}
                onClick={() => addTable("other_info")}
              />
            </div>
            <BasicTable
              header={timeLimitHeader}
              className="time-limit-list mb-10"
              isLoading={isOtherInfoLoading}
              data={timeLimitBody}
            />
            <hr />
          </Grid>
        </Grid>
      </Box>
      <SettingTableModel
        open={open}
        setOpen={setIsOpen}
        renderField={modalData}
      />
    </>
  );
};

export default Setting;
