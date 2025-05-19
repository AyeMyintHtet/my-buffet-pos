import { fetchApi } from "@/lib/api"; // Adjust import path if necessary
import { buffetTable } from "@/types/supabase_db.types"; // Adjust import path if necessary

const buffetTableAction = {
  async getBuffetTableInfo(): Promise<any> {
    try {
      const response = await fetchApi(`/api/table`, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching buffet tables:", error);
      return [];
    }
  },
  async deleteBuffetTable(id: number) {
    try {
      const response = await fetchApi(`/api/table?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting buffet table:", error);
      return null;
    }
  },
  // id: number, update: Partial<buffetTable>
  async updateBuffetTable(prevState: any, formData: FormData) {
    try {
      const {id, ...updates} = Object.fromEntries(formData.entries());
      const response = await fetchApi(`/api/table`, {
        method: "PATCH",
        body: JSON.stringify({ id, updates }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating buffet table:", error);
      return null;
    }
  },
  async addBuffetTable(prevState: any, formData: FormData) {
    try {
      const data = Object.fromEntries(formData.entries());
      const response = await fetchApi(`/api/table`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding buffet table:", error);
      return null;
    }
  }
};

export default buffetTableAction;