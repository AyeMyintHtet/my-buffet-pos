import apiMiddleware from "@/app/api/middleware";
import { buffetTable } from "@/types/supabase_db.types";
import { createClient } from "@/utils/supabase/client";


async function fetchBuffetTable() {
  const supabase = await createClient(); // Initialize Supabase

  const getBuffetTableInfo = async () : Promise<buffetTable[]> => {
    const { data, error } = await supabase.from('buffet_table').select('*');
    if (error) throw new Error(error.message);
    return data;
  };

  const deleteBuffetTable = async (id:number) =>{
    const { data, error } = await supabase.from('buffet_table').delete().eq('id',id );
    if (error) throw new Error(error.message);
    return data;
  }
  const updateBuffetTable = async (id:number,data: Partial<buffetTable>) =>{
    const { data: updatedData, error } = await supabase.from('buffet_table').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    return updatedData;
  }
  return { 
    
    getTable: await getBuffetTableInfo() ,
    // deleteBuffetTable,
    // updateBuffetTable,
  
  };
}

const buffetTableAction = apiMiddleware(fetchBuffetTable);
export default await buffetTableAction();

