
var signin = document.getElementById('signin')
var signout = document.getElementById('signout')
var createAccount = document.getElementById('createAccount')

async function checkUserAlreadLogged() {
  const { data } = await sb.auth.getUser()

  if (data.user === null) {
    signin.classList.remove('hideButton')
    signout.classList.add('hideButton')
  } else {
    user.innerHTML += data.user.email
    signin.classList.add('hideButton')
    signout.classList.remove('hideButton')
    createAccount.classList.add('hideButton')
  }
}

checkUserAlreadLogged()