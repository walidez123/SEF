import supabase, { supabaseUrl } from "./supabase";

export async function getCertificates() {
  const { data, error, count } = await supabase
    .from("certificates")
    .select("* , courses(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Certificates could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateCertificate(certificate, id) {
  const hasImagePath = certificate.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${certificate.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? certificate.image
    : `${supabaseUrl}/storage/v1/object/public/certificates-images/${imageName}`;

  // 1. Create/edit certificate
  let query = supabase.from("certificates");

  // A) CREATE
  if (!id) query = query.insert([{ ...certificate, image: imagePath }]);

  // B) EDIT
  if (id)
    query = query.update({ ...certificate, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("certificate could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("certificate-images")
    .upload(imageName, certificate.image);

  // 3. Delete the certificate IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("certificates").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "certificate image could not be uploaded and the certificate was not created"
    );
  }

  return data;
}

export async function deleteCertificate(id) {
  const { data, error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("certificate could not be deleted");
  }

  return data;
}
