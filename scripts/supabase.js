const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb3NubWRzbmZ3aXJ2dmRsdHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc3ODI4NzAsImV4cCI6MTk4MzM1ODg3MH0.ih0GFeo3dh1bQa-Ftzwyv_aYbjs0aCN3VaMERpIOl98";

const SUPABASE_URL = "https://sfosnmdsnfwirvvdltub.supabase.co";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

(async () => {
  const { data, error } = await sb.from("user").select();
  console.log(data);
})();
