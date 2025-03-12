import React from 'react'
import BasicTable from '@/components/Table'
import buffetTableAction from '@/actions/tableAction';
import { buffetTable } from '@/types/supabase_db.types';
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const buffetTableHeader = [
  'ID',
  'Table Number',
  'Max Customer',
  'Availability',
  'Action',
]
export default async function Dashboard(){
  const { getTable } = buffetTableAction; 

  
   const res = getTable.map((item: buffetTable,id:number)=>{
      return [
        id+1,
        item.table_no,
        item.max_customer,
        item.is_used ? <p className='text-red-500'>Used</p> : <p className='text-green-500'>Available</p>, 
        <div className="flex items-center justify-center gap-2">
          <IconButton color="error" >
          <Delete/>
            </IconButton>
          <IconButton color="primary">
         <Edit/>
         </IconButton>
        </div>,
      ]
    })

  return (
    <div>Dashboard
    <br />
    <div className='flex w-full'>
    <BasicTable 
    data={res}
    header={buffetTableHeader}
    />

    </div>
  </div>
  )
}

