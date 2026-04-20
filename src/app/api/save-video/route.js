import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const { data, error } = await supabase
      .from("videos")
      .insert([body]);

    if (error) {
      console.error("SAVE ERROR:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
