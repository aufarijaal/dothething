import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { title, time, done } = await req.json();

  const { error } = await supabase
    .from("tasks")
    .update({
      title,
      time,
      done,
    })
    .eq("user_id", user.id)
    .eq("id", params.id);

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json({
    message: `Task updated successfully`,
  });
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { error } = await supabase.from("tasks").delete().eq("user_id", user.id).eq("id", params.id);

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json({
    message: `Task deleted successfully`,
  });
}
