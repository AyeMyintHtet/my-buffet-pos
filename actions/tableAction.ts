"use server"
import { fetchApi } from "@/lib/api";
// import apiMiddleware from "@/app/api/middleware";
import { buffetTable } from "@/types/supabase_db.types";
// import { createClient } from "@/utils/supabase/server";


async function fetchBuffetTable() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  const getBuffetTableInfo = async (): Promise<any> => {
    try {
      const response = await fetchApi(`/api/table`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = response.json();
      return data;
    } catch (error) {
      console.error("Error fetching buffet tables:", error);
      return [];
    }
  };

  const deleteBuffetTable = async (id:number) =>{
    // console.log('id:' + id);
    // const { data, error } = await supabase.from('buffet_table').delete().eq('id',id );
    // if (error) throw new Error(error.message);
    // return data;
  }
  const updateBuffetTable = async (id:number,data: Partial<buffetTable>) =>{
    // console.log('id:' + id +'data:' + JSON.stringify(data));
    // const { data: updatedData, error } = await supabase.from('buffet_table').update(data).eq('id', id);
    // if (error) throw new Error(error.message);
    // return updatedData;
  }
  return { 
    
    getTable: await getBuffetTableInfo (),
    deleteBuffetTable,
    updateBuffetTable,
  
  };
}

const buffetTableAction = fetchBuffetTable;
export default buffetTableAction;

