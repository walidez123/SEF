import supabase from "./supabase";

export async function getEducation() {
  const { data, error, count } = await supabase
    .from("education")
    .select("* , cv(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Education could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateEducation(education, id) {
  let query = supabase.from("education");
  // A) CREATE
  if (!id) query = query.insert([{ ...education }]);

  // // B) EDIT
  if (id) query = query.update({ ...education }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("education could not be added to cart");
  }

  return data;
}

export async function deleteEducation(id) {
  const { data, error } = await supabase
    .from("education")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("education could not be deleted");
  }

  return data;
}
