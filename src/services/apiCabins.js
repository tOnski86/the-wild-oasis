import supabase, { supabaseUrl } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// select
export async function getCabins() {
  const { data, error: getError } = await supabase.from('cabins').select('*');

  if (getError) throw new Error('Cabins could not be loaded');

  return data;
}

// delete
export async function deleteCabin(id) {
  const { data, error: deleteError } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (deleteError) throw new Error('Cabin could not be deleted');

  return data;
}

// upload to storage
async function uploadImage(image) {
  const imageName = `${uuidv4()}-${image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error: uploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image);

  if (uploadError) throw new Error('Image upload failed');

  return imagePath;
}

// insert
export async function createCabin(newCabin) {
  const { image, ...cabinData } = newCabin;
  const imagePath = await uploadImage(image);

  const { data, error: createError } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }])
    .select()
    .single();

  if (createError) throw new Error('Cabin could not be created');

  return data;
}

// update
export async function updateCabin(updatedCabin) {
  const { id, image, ...cabinData } = updatedCabin;

  let imagePath;

  if (image?.startsWith?.(supabaseUrl)) {
    imagePath = image;
  } else {
    imagePath = await uploadImage(image);
  }

  const { data, error: updateError } = await supabase
    .from('cabins')
    .update({ ...cabinData, image: imagePath })
    .eq('id', id)
    .select()
    .single();

  if (updateError) throw new Error('Cabin could not be updated');

  return data;
}
