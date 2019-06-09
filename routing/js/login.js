signIn.addEventListener('click', () => {
  document.cookie = `email=${email.value}`;
  document.cookie = `password=${password.value}`;

  fetch('user', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => {
    if (res.status === 200) {
      window.location.replace('/todo.html');
    } else {
      alert('Login or password is incorrect. Try again');
    }
  });
});
