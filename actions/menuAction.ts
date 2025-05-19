import { fetchApi } from "@/lib/api"; // Adjust import path if necessary
import { handleImageChange } from "@/utils/compressImg";

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
  async addMenuTable(prevState: any, formData: FormData) {
    try {
      const { table_name, ...data }:any = Object.fromEntries(formData.entries());
      const compressedImg = await handleImageChange(data?.image)
      const formDataToSend = new FormData()
      formDataToSend.append('name', `${Date.now()}${compressedImg?.name}`)
      formDataToSend.append('file', compressedImg as Blob)
      const ImageUpload = await fetchApi(`/api/image`, {
        method: "POST",
        body: formDataToSend,
      });
      const {publicUrl} = await ImageUpload.json();
      if(!publicUrl) return {error:'no publicURl',hint:'no publicURl'};
      data.image = publicUrl;
      const response = await fetchApi(`/api/menu`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return {message: 'success'}
    } catch (error) {
      console.error("Error adding buffet table:", error);
      return {error:'Something went wrong', hint:'Something went wrong'};
    }
  },
  async editMenuTable(prevState: any, formData: FormData) {
    try {
      const data:any = Object.fromEntries(formData.entries());
      console.log(data.image,'data');
      if(data?.image?.name.length>0){
        const compressedImg = await handleImageChange(data?.image)
        const formDataToSend = new FormData()
        formDataToSend.append('name', `${Date.now()}${compressedImg?.name}`)
        formDataToSend.append('file', compressedImg as Blob)
        const ImageUpload = await fetchApi(`/api/image`, {
          method: "POST",
          body: formDataToSend,
        });
        const {publicUrl} = await ImageUpload.json();
        if(!publicUrl) return {error:'no publicURl',hint:'no publicURl'};
        data.image = publicUrl;
      }
      const response = await fetchApi(
        `/api/menu`,
        {
          method: "UPDATE",
          body: JSON.stringify(data),
        }
      );
      return {message: 'success'}
    } catch (error) {
      console.error("Error editing buffet table:", error);
      return {error:`${error}`, hint:'Something went wrong'};
    }

  },
  async deleteMenuRow(id: number) {
    try {
      const response = await fetchApi(
        `/api/menu?id=${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const res = await response.json();
      return {message:'success', res};
    } catch (error) {
      console.error("Error deleting buffet table:", error);
      return null;
    }
  }

};

export default menuTableAction;
