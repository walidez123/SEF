import supabase from "./supabase";

export async function getLessons() {
  const { data, error, count } = await supabase
    .from("lessons")
    .select("* , courses(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("lessons could not be loaded");
  }
  console.log(data);

  return { data, count };
}
export async function createUpdateLessons(lesson, id) {
  let query = supabase.from("lessons");
  // A) CREATE
  if (!id) query = query.insert([{ ...lesson }]);

  // // B) EDIT
  if (id) query = query.update({ ...lesson }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("lesson could not be added to cart");
  }

  return data;
}

export async function deleteLesson(id) {
  const { data, error } = await supabase.from("lessons").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("lessons could not be deleted");
  }

  return data;
}
