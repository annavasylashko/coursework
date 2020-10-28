signUp.addEventListener('click', () =>
    password.value !== password2.value ||
        password.value.length == 0 ||
        email.value.length == 0
        ? alert(
            'Your email or password is not acceptable or passwords are not equal'
        )
        : fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        }).then((res) => {
            if (res.status === 200) {
                alert(res.statusText);
                window.location.href = '/routing/html/todo.html';
            } else alert(`Something went wrong:\n${res.statusText}`);
        })
);