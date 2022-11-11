const errorHTML = document.getElementById('error')
var emailUser = document.getElementById('email')
var passwordUser = document.getElementById('password')
var user = document.getElementById("user")

async function signIn() {
  try {
    const { data: { session } } = await sb.auth.getSession()

    if (session == null) {
      const { data, error } = await sb.auth.signInWithPassword({
        email: emailUser.value,
        password: passwordUser.value,
      })

      if (error) {
        errorHTML.innerHTML = error.message
      } else {
        window.location.reload()
        user.innerHTML += data.user.email
      }
    } else {
      errorHTML.innerHTML = "Usuário já está logado"
    }
  } catch (error) {
    errorHTML.innerHTML = error.message
  }

  setTimeout(() => errorHTML.innerHTML = "", 5000)
}