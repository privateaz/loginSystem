// Login.js
const [loginUsername, loginPassword] = document.querySelectorAll("#loginUsername, #loginPassword");

const btnLogin = document.getElementById("btnLogin"); // Adicionei a variável btnLogin para facilitar o acesso ao botão de login

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  const loginUsernameValue = loginUsername.value;
  const loginPasswordValue = loginPassword.value;

  const usersJSON = localStorage.getItem("users");
  const users = JSON.parse(usersJSON) || [];

  const user = users.find((user) => user.username === loginUsernameValue);

  if (!user) {
    alert("User not found!"); 
    return;
  }

  if (loginPasswordValue !== user.password) {
    alert("Invalid credentials!");
  } else {
    alert("Success! You are logged in."); 
    loginUsername.value = "";
    loginPassword.value = "";    
  }
});
