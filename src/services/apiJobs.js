import supabase from "./supabase";

export async function getJobs() {
  const { data, error, count } = await supabase
    .from("jobs")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Jobs could not be loaded");
  }
  console.log(data);

  return { data, count };
}
export async function createUpdateJobs(job, id) {
  let query = supabase.from("jobs");
  // A) CREATE
  if (!id) query = query.insert([{ ...job }]);

  // // B) EDIT
  if (id) query = query.update({ ...job }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("job could not be added to cart");
  }

  return data;
}

export async function deleteJob(id) {
  const { data, error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("jobs could not be deleted");
  }

  return data;
}
