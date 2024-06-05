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

  const { value } = await req.json();

  const { error } = await supabase
    .from("tasks")
    .update({
      done: value,
    })
    .eq("user_id", user.id)
    .eq("id", params.id);

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json({
    message: `Task toggled successfully`,
  });
}
