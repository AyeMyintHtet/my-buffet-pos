import { fetchApi } from "@/lib/api";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_item")
      .select(
        `
        *,
        menu_category:category_id (
          id,
          name
        ),
        tier_list:tier_list_id (
          id,
          name,
          amount,
          level
        )
      `
      )
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { name, image, available_amt,category_id,tier_list_id } = await req.json();
    if (!name || !category_id || !tier_list_id || !available_amt) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("menu_item")
      .insert({
        name,
        category_id,
        tier_list_id,
        available_amt,
        image,
      });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function UPDATE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const data = await req.json(); // receive the entire payload
    const { id } = data;

    // Check that an ID is provided
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // Remove the ID from the update payload
    const updateData = { ...data };
    delete updateData.id;

    // Update only provided fields
    const { data: updated, error } = await supabase
      .from("menu_item")
      .update(updateData)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const { data, error }:any = await supabase
      .from("menu_item")
      .delete()
      .eq("id", id)
      .select();
      ;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    await supabase.storage
    .from("menu.image")
    .remove([data[0]?.image.split("/menu.image/")[1]]);
  
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
