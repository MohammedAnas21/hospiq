import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://xrkutneuhjxurgntomoo.supabase.co";
const supabaseAnonKey = "sb_publishable_jObtYrrUjb9HxFIo-2fu6Q_Efnwta3t";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export {
  supabase as s
};
