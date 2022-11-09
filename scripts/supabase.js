const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb3NubWRzbmZ3aXJ2dmRsdHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc3ODI4NzAsImV4cCI6MTk4MzM1ODg3MH0.ih0GFeo3dh1bQa-Ftzwyv_aYbjs0aCN3VaMERpIOl98";

const SUPABASE_URL = "https://sfosnmdsnfwirvvdltub.supabase.co";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function saveSecondsInDatabase(seconds) {
  await sb
    .from('user')
    .insert({ focus: seconds })
    // .insert({ name: `${parseInt(seconds / 3600, 10)} ${parseInt(seconds / 60, 10)} ${parseInt(seconds % 60, 10)}` })
    .select()
}

async function getTimer() {
  const { data } = await sb
    .from('user')
    .select('focus')

  const focusDate = data.map(data => data.focus)

  const initialValue = 0;

  const sumSeconds = focusDate.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  document.getElementById("sum").innerHTML = `Total de tempo: ${convertToHours(sumSeconds)}:${convertToMinutes(sumSeconds)}:${convertToSeconds(sumSeconds)}`
}

async function clearDatabase() {
  await sb
    .from('user')
    .delete()
    .neq("focus", 0)

  window.location.reload()
}

function numberFormatter(number) {
  return number < 10 ? "0" + number : number
}

function convertToSeconds(seconds) {
  const number = parseInt(seconds % 60, 10)

  return numberFormatter(number)
}

function convertToMinutes(seconds) {
  const number = parseInt(seconds / 60, 10)

  return numberFormatter(number)
}

function convertToHours(seconds) {
  const number = parseInt(seconds / 3600, 10)

  return numberFormatter(number)
}