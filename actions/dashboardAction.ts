import { fetchApi } from "@/lib/api"; // Adjust import path if necessary
import { customerTable } from "@/types/supabase_db.types";


const dashboardAction = {
    async getMenuTableInfo(): Promise<customerTable[]> {
        try {
            const response = await fetchApi(`/api/dashboard`, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching buffet tables:", error);
            return [];
        }
    }    
}

export default dashboardAction;