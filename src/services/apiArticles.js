import supabase, { supabaseUrl } from "./supabase";

export async function getArticles() {
  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("articles could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateArticle(article, id) {
  const hasImagePath = article.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${article.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? article.image
    : `${supabaseUrl}/storage/v1/object/public/articles-images/${imageName}`;

  // 1. Create/edit article
  let query = supabase.from("articles");

  // A) CREATE
  if (!id) query = query.insert([{ ...article, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...article, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("article could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("article-images")
    .upload(imageName, article.image);

  // 3. Delete the article IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("articles").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "article image could not be uploaded and the article was not created"
    );
  }

  return data;
}

export async function deleteArticle(id) {
  const { data, error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("article could not be deleted");
  }

  return data;
}
