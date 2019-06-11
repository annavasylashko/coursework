signIn.addEventListener('click', () => {
  fetch('/login', {
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
      window.location.replace('/routing/html/todo.html');
    } else {
      alert('Login or password is incorrect. Try again');
    }
  });
});
