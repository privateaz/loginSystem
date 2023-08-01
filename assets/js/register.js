const [registerUsername, registerPassword, confirmPassword, btnRegister] =
  document.querySelectorAll("#registerUsername, #registerPassword, #confirmPassword, #btnRegister");

btnRegister.addEventListener("click", (event) => {
  event.preventDefault();
  clearMessages("success-text");
  clearMessages("error-text");
  checkFields();
});

function checkFields() {
  const usernamePattern = /^[a-zA-Z0-9]{3,12}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

  const registerUsernameValue = registerUsername.value;
  const registerPasswordValue = registerPassword.value;
  const confirmPasswordValue = confirmPassword.value;

  let hasError = false;

  if (!usernamePattern.test(registerUsernameValue)) {
    createMessage(
      registerUsername,
      `This field needs to be between 3 and 12 characters`,
      "error-text"
    );
    hasError = true;
  }

  if (!passwordPattern.test(registerPasswordValue)) {
    createMessage(
      registerPassword,
      `This field must have at least 6 characters, a capital letter, and a symbol.`,
      "error-text"
    );
    hasError = true;
  }

  if (registerPasswordValue !== confirmPasswordValue) {
    createMessage(confirmPassword, `Passwords must be the same.`, "error-text");
    hasError = true;
  }

  if (!hasError) {
    const user = {
      username: registerUsernameValue,
      password: registerPasswordValue,
    };
  
    const usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON) || [];
  
    const existingUser = users.find((u) => u.username === user.username);
    if (existingUser) {
      createMessage(registerUsername, `Username already use`, "error-text")
      return;
    }
  
    users.push(user);
  
    const usersUpdatedJSON = JSON.stringify(users);
    localStorage.setItem("users", usersUpdatedJSON);
    createMessage(confirmPassword, `Your account has been successfully created!`, "success-text")
    registerUsername.value = ""
    registerPassword.value = ""
    confirmPassword.value = ""
  }
}

function createMessage(beforeElem, message, type) {
  if (beforeElem.classList.contains(type)) return;
  const div = document.createElement("div");
  div.textContent = message;
  div.classList.add(type);
  beforeElem.parentNode.insertBefore(div, beforeElem.nextSibling);
}

function clearMessages(type) {
  const messages = document.querySelectorAll("." + type);
  messages.forEach((message) => message.remove());
}


const usersJSON = localStorage.getItem("users");
const users = JSON.parse(usersJSON) || [];
