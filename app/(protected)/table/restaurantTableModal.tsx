'use client'
import { submitForm } from '@/actions/loginAction';
import buffetTableAction from '@/actions/tableAction';
import ModalCom from '@/components/Modal';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom';

interface IRestaurantTableModal{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  callApi : React.Dispatch<React.SetStateAction<boolean>>
}

const RestaurantTableModal = ({open,setOpen,callApi}:IRestaurantTableModal) => {
  const Form = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <div className="mb-4">
          <label htmlFor="table-number" className="block text-sm font-medium text-gray-700">
            Table Number
          </label>
          <input
            type="text"
            id="table-number"
            name="table_no"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            autoComplete='off'
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="max-customer" className="block text-sm font-medium text-gray-700">
            Max Customer
          </label>
          <input
            type="text"
            id="max-customer"
            name="max_customer" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            autoComplete='off'

          />
        </div>
  
        <button
          type="submit"
          className="w-full cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Add'}
        </button>
      </>
    );
  };

  const ModalBody = ()=>{
    const [state, formAction] = useActionState(buffetTableAction.addBuffetTable, null);
    useEffect(()=>{
      if(state?.message === 'success'){
        setOpen(false)
        callApi((prev)=>!prev)
      }
    },[state])
  return (
    <form action={formAction} className="max-w-md mx-auto mt-10">
      <Form />
    </form>
  )
}




  return (
    <ModalCom open={open} title="Add Table" body={<ModalBody/>}/>
  )
}

export default RestaurantTableModal