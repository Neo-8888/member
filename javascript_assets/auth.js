document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg');
  msg.textContent = '';
  try {
    const token = await login(email, password);
    saveToken(token);
    window.location.href = 'dashbord.html';
  } catch (err) {
    msg.textContent = err.message;
  }
});
