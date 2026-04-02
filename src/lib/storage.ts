import { supabase } from './supabase';

export const uploadImage = async (file: File, folder = 'uploads'): Promise<string | null> => {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from('images').upload(fileName, file);
  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName);
  return data.publicUrl;
};
