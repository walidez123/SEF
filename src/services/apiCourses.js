import supabase, { supabaseUrl } from "./supabase";

export async function getCourses() {
  const { data, error, count } = await supabase
    .from("courses")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Courses could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function getMyCourses(user_id) {
  const { data, error, count } = await supabase
    .from("courses")
    .select("*", { count: "exact" })
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Courses could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateCourse(course, id) {
  const hasImagePath = course.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${course.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? course.image
    : `${supabaseUrl}/storage/v1/object/public/courses-images/${imageName}`;

  // 1. Create/edit course
  let query = supabase.from("courses");

  // A) CREATE
  if (!id) query = query.insert([{ ...course, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...course, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("course could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("course-images")
    .upload(imageName, course.image);

  // 3. Delete the course IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("courses").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "course image could not be uploaded and the course was not created"
    );
  }

  return data;
}

export async function deleteCourse(id) {
  const { data, error } = await supabase.from("Courses").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("course could not be deleted");
  }

  return data;
}
