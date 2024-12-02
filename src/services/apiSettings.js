import supabase from './supabase';

// get
export async function getSettings() {
  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (settingsError) throw new Error('Settings could not be loaded');

  return settings;
}

// update
export async function updateSetting(newSetting) {
  const { data, error: updateError } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .select();

  if (updateError) throw new Error('Settings could not be updated');

  return data;
}
