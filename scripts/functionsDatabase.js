async function saveSecondsInDatabase(seconds) {
  await sb
    .from('user')
    .insert({ focus: seconds })
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
  return sumSeconds
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