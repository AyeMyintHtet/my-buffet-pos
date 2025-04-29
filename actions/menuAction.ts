import { fetchApi } from "@/lib/api"; // Adjust import path if necessary

const menuTableAction = {
  async getMenuTableInfo(): Promise<any> {
    try {
      const response = await fetchApi(`/api/menu`, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching buffet tables:", error);
      return [];
    }
  },
};

export default menuTableAction;
