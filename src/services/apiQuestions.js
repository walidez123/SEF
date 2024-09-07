import supabase, { supabaseUrl } from "./supabase";

export async function getQuestions() {
  const { data, error, count } = await supabase
    .from("questions")
    .select("* , exams(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Questions could not be loaded");
  }
  console.log(data);

  return { data, count };
}
export async function createUpdateQuestion(question, id) {
  const hasImagePath = question.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${question.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? question.image
    : `${supabaseUrl}/storage/v1/object/public/questions-images/${imageName}`;

  // 1. Create/edit question
  let query = supabase.from("questions");

  // A) CREATE
  if (!id) query = query.insert([{ ...question, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...question, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("question could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("question-images")
    .upload(imageName, question.image);

  // 3. Delete the question IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("questions").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "question image could not be uploaded and the question was not created"
    );
  }

  return data;
}

export async function deleteQuestion(id) {
  const { data, error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("question could not be deleted");
  }

  return data;
}
