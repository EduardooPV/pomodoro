async function signUp() {
  try {
    const { data } = await sb
      .from('person')
      .select('email')
      .eq('email', emailUser.value)

    if (data.length == 0) {
      const { error } = await sb.auth.signUp({
        email: emailUser.value,
        password: passwordUser.value,
      })

      if (error) {
        errorHTML.innerHTML = error.message
      } else {
        await sb
          .from('person')
          .insert({ email: emailUser.value })

        errorHTML.innerHTML = "Confirme no seu email, antes de entrar!"
      }
    } else {
      errorHTML.innerHTML = "Usuário já existe!"
    }
  } catch (error) {
    errorHTML.innerHTML = error.message
  }

  setTimeout(() => errorHTML.innerHTML = "", 5000)
}
