document.addEventListener('DOMContentLoaded', () => {
    console.clear();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.querySelector('#registerBtn');
    const loginBtn = document.querySelector('#loginBtn');

    registerBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });
    loginBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://127.0.0.1:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);
            // alert(JSON.stringify(data.message));
            if(data.message!='Login successful'){
                document.querySelector('.error').classList.remove('hidden');
                loginForm.reset();
            }else{
                document.querySelector('.error').classList.add('hidden');
                loginForm.reset();
                alert(`Welcome back ${username}`);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://127.0.0.1:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);
            // alert(JSON.stringify(data.message));
        } catch (error) {
            console.error('Error:', error);
        }
    });


});
