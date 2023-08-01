const [loginUsername, loginPassword] = document.querySelectorAll(
  "#loginUsername, #loginPassword"
);

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  clearMessages("success-text");
  clearMessages("error-text");

  const loginUsernameValue = loginUsername.value;
  const loginPasswordValue = loginPassword.value;

  const usersJSON = localStorage.getItem("users");
  const users = JSON.parse(usersJSON) || [];

  const user = users.find((user) => user.username === loginUsernameValue);

  if (!user || loginPasswordValue !== user.password) {
    createMessage(loginPassword, `Invalid credentials`, "error-text");
    return;
  }

  if (loginPasswordValue === user.password) {
    createMessage(loginPassword, `Login successful!`, "success-text");
    loginUsername.value = "";
    loginPassword.value = "";
  }
});

function createMessage(beforeCamp, message, type) {
  if (beforeCamp.classList.contains(type)) return;
  const div = document.createElement("div");
  div.textContent = message;
  div.classList.add(type);
  beforeCamp.parentNode.insertBefore(div, beforeCamp.nextSibling);
}

function clearMessages(type) {
  const messages = document.querySelectorAll("." + type);
  messages.forEach((message) => message.remove());
}
