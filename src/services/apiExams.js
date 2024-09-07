import supabase from "./supabase";

export async function getExams() {
  const { data, error, count } = await supabase
    .from("exams")
    .select("* , courses(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Exams could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateExam(Exam, id) {
  let query = supabase.from("Exams");
  // A) CREATE
  if (!id) query = query.insert([{ ...Exam }]);

  // // B) EDIT
  if (id) query = query.update({ ...Exam }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Exam could not be added to cart");
  }

  return data;
}

export async function deleteExam(id) {
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("exam could not be deleted");
  }

  return data;
}
