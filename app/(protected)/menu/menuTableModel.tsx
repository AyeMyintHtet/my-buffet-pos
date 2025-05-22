"use client";
import buffetTableAction from "@/actions/tableAction";
import ModalCom from "@/components/Modal";
import {
  buffetTable,
  menuCategoryTable,
  menuItemTable,
  tierListTable,
} from "@/types/supabase_db.types";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import menuTableAction from "@/actions/menuAction";

interface IRestaurantTableModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callApi: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: Partial<menuItemTable> | null;
  tierListData: tierListTable[];
  menuCategoryData: menuCategoryTable[];
}
// name, image, available_amt,category_id,tier_list_id
const MenuTableModel = ({
  open,
  setOpen,
  callApi,
  editData,
  tierListData,
  menuCategoryData,
}: IRestaurantTableModal) => {
  const isEdit = !!editData;
  const Form = ({ defaultValues }: { defaultValues: any }) => {
    const { pending } = useFormStatus();

    // const ImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = e.target.files?.[0]
    //   if (!file) return

    //   const options = {
    //     maxSizeMB: 1,
    //     maxWidthOrHeight: 1024,
    //     useWebWorker: true
    //   }

    //   try {
    //     const compressedFile = await imageCompression(file, options)

    //     // You can now upload `compressedFile` to the backend
    //     const formData = new FormData()
    //     formData.append('file', compressedFile)

    //     await fetch('/api/upload', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //   } catch (error) {
    //     console.error('Compression error:', error)
    //   }
    // };
    return (
      <>
        {isEdit && <input type="hidden" name="id" value={defaultValues.id} />}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={defaultValues.table_no}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-700
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-gray-700
      hover:file:bg-blue-100
    "
            required={!isEdit}
            // onChange={(e)=> ImageUpload(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="available_amt"
            className="block text-sm font-medium text-gray-700"
          >
            Available Amount
          </label>
          <input
            type="text"
            id="available_amt"
            name="available_amt"
            defaultValue={defaultValues.max_customer}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={defaultValues.category_id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {menuCategoryData.map((cat: menuCategoryTable) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tier_list_id"
            className="block text-sm font-medium text-gray-700"
          >
            Tier List
          </label>
          <select
            id="tier_list_id"
            name="tier_list_id"
            defaultValue={defaultValues.tier_list_id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {tierListData.map((cat: tierListTable) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={pending}
        >
          {pending ? "Submitting..." : isEdit ? "Update" : "Add"}
        </button>
      </>
    );
  };

  const ModalBody = () => {
    console.log("isEdit", isEdit);
    const action = isEdit
      ? menuTableAction.editMenuTable
      : menuTableAction.addMenuTable;

    const [state, formAction] = useActionState(action, null);
    useEffect(() => {
      console.log("state", state);
      if (state?.message === "success") {
        console.log("success");
        setOpen(false);
        callApi((prev) => !prev);
      }
    }, [state]);

    return (
      <>
        <form action={formAction} className="max-w-md mx-auto mt-10">
          <Form
            defaultValues={
              editData || { id: "", table_no: "", max_customer: "" }
            }
          />
          <br />
          <br />
          {state?.error && (
            <div className="mb-4 text-red-600 border border-red-300 rounded p-2 bg-red-50">
              <p className="font-semibold">{state.error}</p>
              {state.hint && <p className="text-sm">{state.hint}</p>}
            </div>
          )}
        </form>
      </>
    );
  };

  return (
    <ModalCom
      open={open}
      setOpen={setOpen}
      title={`${isEdit ? "Edit" : "Add"} Table`}
      body={<ModalBody />}
    />
  );
};

export default MenuTableModel;
