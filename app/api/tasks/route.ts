import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

  const { data, error } = await supabase.from("tasks").select("*").eq("user_id", user.id).order("done", {
    ascending: false,
  });

  if (error) throw error;

  return NextResponse.json({
    data,
  });
}

export async function POST(req: Request) {
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

  const { error } = await supabase.from("tasks").insert({
    title,
    time,
    done,
    user_id: user.id,
  });

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json({
    message: "Task inserted successfully",
  });
}
