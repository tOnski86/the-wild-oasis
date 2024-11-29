import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kcbumiuduqridnyrvfon.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYnVtaXVkdXFyaWRueXJ2Zm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTQwMTAsImV4cCI6MjA0ODE5MDAxMH0.COVhPlu9wj68B0sYzs8fiIjBp7RMgGUk2UklUThrcPM';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
