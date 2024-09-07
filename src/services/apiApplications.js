import supabase from "./supabase";

export async function getApplications() {
  const { data, error, count } = await supabase
    .from("applications")
    .select("*, jobs(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Applications could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateApplication(application, id) {
  let query = supabase.from("applications");
  // A) CREATE
  if (!id) query = query.insert([{ ...application }]);

  // // B) EDIT
  if (id) query = query.update({ ...application }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("application could not be added to cart");
  }

  return data;
}

export async function deleteApplication(id) {
  const { data, error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("applications could not be deleted");
  }

  return data;
}
