signUp.addEventListener('click', () =>
  password.value !== password2.value ||
  password.value.length == 0 ||
  email.value.length == 0
    ? alert(
        'Your email or password is not acceptable or passwords are not equal'
    )
    : fetch('register', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        document.cookie = `email=${email.value}`;
        document.cookie = `password=${password.value}`;
        alert(res.statusText);
        window.location.href = '/todo.html';
      } else alert(`Something went wrong:\n${res.statusText}`);
    })
);
