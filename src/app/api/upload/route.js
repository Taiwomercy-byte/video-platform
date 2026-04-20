import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    console.log("FILE:", file);

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = `${Date.now()}.webm`;

    const { error } = await supabase.storage
      .from("videos")
      .upload(fileName, file, {
        contentType: file.type,
       });

    if (error) {
      console.error("UPLOAD ERROR:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);

    return Response.json({ url: data.publicUrl });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
