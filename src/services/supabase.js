import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mfvwjdwdzxhesbdfhwia.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdndqZHdkenhoZXNiZGZod2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MzU3NDMsImV4cCI6MjA0MDUxMTc0M30.jP5B61-eNJq94fC8WqETcJ70QWFAeUBR1-K9ua5yQ9k";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
