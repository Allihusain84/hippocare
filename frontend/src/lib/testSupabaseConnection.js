// Quick Supabase connection test
import { supabase } from './supabaseClient';

(async () => {
  try {
    const { error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.error('Supabase connection error:', error.message);
    } else {
      console.log('Supabase connection successful!');
    }
  } catch (e) {
    console.error('Supabase connection failed:', e);
  }
})();
