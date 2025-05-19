import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const supabase = await createClient();
        const formData = await req.formData()
        const name = formData.get('name') as string
        const file = formData.get('file') as File
        if (!file || !name) {
          return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }
        const { data, error } = await supabase.storage.from("menu.image").upload(name,file);
        if (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        const { data: urlData } = await supabase.storage
          .from("menu.image")
          .getPublicUrl(name);
        return NextResponse.json({ message: "success", publicUrl:urlData.publicUrl }, { status: 200 });
      } catch (err) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      }
}
export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  let name = searchParams.get("name"); // e.g., ?name=my-image.webp

  if (!name) {
    return NextResponse.json({ error: "Missing file name" }, { status: 400 });
  }
  const { data, error } = await supabase.storage
    .from("menu.image")
    .remove([name.split("/menu.image/")[1]]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully", data });
}