async function signOut() {
  try {
    const { data: { session }, error } = await sb.auth.getSession()

    console.log(session)

    if (error) {
      errorHTML.innerHTML = error.message
    } else if (session) {
      const { error } = await sb.auth.signOut()

      if (error) {
        errorHTML.innerHTML = error.message
      } else {
        window.location.reload()
      }
    } else {
      errorHTML.innerHTML = "Não foi possivel sair, entre primeiro!"
    }
  } catch (error) {
    errorHTML.innerHTML = error.message
  }

  setTimeout(() => errorHTML.innerHTML = "", 5000)
}