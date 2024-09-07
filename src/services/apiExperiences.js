import supabase from "./supabase";

export async function getExperiences() {
  const { data, error, count } = await supabase
    .from("experiences")
    .select("* , cv(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Experiences could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateExperience(experience, id) {
  let query = supabase.from("experiences");
  // A) CREATE
  if (!id) query = query.insert([{ ...experience }]);

  // // B) EDIT
  if (id) query = query.update({ ...experience }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("experience could not be added to cart");
  }

  return data;
}

export async function deleteExperience(id) {
  const { data, error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("experiences could not be deleted");
  }

  return data;
}
