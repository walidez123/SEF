import supabase from "./supabase";

export async function getAwards() {
  const { data, error, count } = await supabase
    .from("awards")
    .select("* , cv(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Awards could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateAward(award, id) {
  let query = supabase.from("awards");
  // A) CREATE
  if (!id) query = query.insert([{ ...award }]);

  // // B) EDIT
  if (id) query = query.update({ ...award }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("award could not be added to cart");
  }

  return data;
}

export async function deleteAward(id) {
  const { data, error } = await supabase.from("awards").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("award could not be deleted");
  }

  return data;
}
