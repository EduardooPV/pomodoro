const modalAccount = document.getElementById('modalAccount')
const modalGraph = document.getElementById('modalGraph')

function toggleModalAccount() {
  modalAccount.classList.toggle("showModal")
}

async function toggleModalGraph() {
  modalGraph.classList.toggle("showModal")
}

(async function () {
  var userIsNotLoggedClassname = document.getElementsByClassName("userLogged");
  var userLoggedClassname = document.getElementsByClassName("userIsNotLogged");

  const { data } = await sb.auth.getUser()

  if (data.user == null) {
    for (var i = 0; i < userIsNotLoggedClassname.length; i++) {
      userIsNotLoggedClassname[i].style.display = "none"
    }

    for (var i = 0; i < userLoggedClassname.length; i++) {
      userLoggedClassname[i].style.display = "block"
    }

  } else {
    for (var i = 0; i < userIsNotLoggedClassname.length; i++) {
      userIsNotLoggedClassname[i].style.display = "block"
    }

    for (var i = 0; i < userLoggedClassname.length; i++) {
      userLoggedClassname[i].style.display = "none"
    }
  }
})()

