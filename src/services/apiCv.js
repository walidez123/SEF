import supabase, { supabaseUrl } from "./supabase";

export async function getCv() {
  const { data, error, count } = await supabase
    .from("cv")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Cv could not be loaded");
  }
  console.log(data);

  return { data, count };
}
export async function createUpdateCv(cv, id) {
  const { skills, hobbies, ...other } = newProduct;
  const hasImagePath = cv.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cv.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cv.image
    : `${supabaseUrl}/storage/v1/object/public/cv-images/${imageName}`;

  // 1. Create/edit cv
  let query = supabase.from("cv");

  // A) CREATE
  if (!id)
    query = query.insert([{ ...other, image: imagePath, skills, hobbies }]);

  // B) EDIT
  if (id)
    query = query
      .update({
        ...other,
        image: imagePath,
        skills: [...skills],
        hobbies: [...hobbies],
      })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cv could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cv-images")
    .upload(imageName, cv.image);

  // 3. Delete the cv IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cv").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cv image could not be uploaded and the cv was not created"
    );
  }

  return data;
}

export async function deleteCv(id) {
  const { data, error } = await supabase.from("cv").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cv could not be deleted");
  }

  return data;
}
