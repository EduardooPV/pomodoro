async function saveInformationInDatabase(seconds, turn = 0) {
  const { data } = await sb.auth.getUser()

  if (data.user !== null) {
    await sb
      .from('focus')
      .insert({ focus: seconds, person_id: data.user.email, turn: turn })
  }
}

async function getTimerPerPerson() {
  const userLogged = await sb.auth.getUser()

  const { data, error } = await sb
    .from('focus')
    .select(`focus, person_id`)
    .eq('person_id', userLogged.data.user.email)

  console.log(data)
  console.log(error)
}

async function getTimer() {
  const userLogged = await sb.auth.getUser()

  const { data } = await sb
    .from('focus')
    .select(`focus, person_id`)
    .eq('person_id', userLogged.data.user?.email)

  const focusDate = data.map(data => data.focus)

  const initialValue = 0;

  const sumSeconds = focusDate.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  document.getElementById("sum").innerHTML = `${convertToHours(sumSeconds)}:${convertToMinutes(sumSeconds)}:${convertToSeconds(sumSeconds)}`
  return sumSeconds
}

async function getTurns() {
  const userLogged = await sb.auth.getUser()

  const { data, error } = await sb
    .from('focus')
    .select(`turn, person_id`)
    .eq('person_id', userLogged.data.user?.email)

  const turnDate = data.map(data => data.turn)

  const initialValue = 0;

  const totalTurns = turnDate.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  document.getElementById("turn").innerHTML = `${totalTurns}`
  return totalTurns
}

async function clearDatabase() {
  await sb
    .from('focus')
    .delete()
    .neq("focus", 0)

  await sb
    .from('focus')
    .delete()
    .neq("turn", 0)

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
