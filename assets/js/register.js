// Register.js
const [registerUsername, registerPassword, confirmPassword, btnRegister] =
  document.querySelectorAll("#registerUsername, #registerPassword, #confirmPassword, #btnRegister");

btnRegister.addEventListener("click", (event) => {
  event.preventDefault();
  clearErrorMessages();
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
    createError(
      registerUsername,
      `This field needs to be between 3 and 12 characters`
    );
    hasError = true;
  }

  if (!passwordPattern.test(registerPasswordValue)) {
    createError(
      registerPassword,
      `This field must have at least 6 characters, a capital letter, and a symbol.`
    );
    hasError = true;
  }

  if (registerPasswordValue !== confirmPasswordValue) {
    createError(confirmPassword, `Passwords must be the same.`);
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
      alert("Username already in use. Please choose another username.");
      return;
    }
  
    users.push(user);
  
    const usersUpdatedJSON = JSON.stringify(users);
    localStorage.setItem("users", usersUpdatedJSON);
    alert("User saved in Local Storage!");
    registerUsername.value = ""
    registerPassword.value = ""
    confirmPassword.value = ""
  }
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-text");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
}

function createError(errorCamp, message) {
  if (errorCamp.classList.contains("error-text")) return;
  const div = document.createElement("div");
  div.textContent = message;
  div.classList.add("error-text");
  errorCamp.insertAdjacentElement("afterend", div);
}

const usersJSON = localStorage.getItem("users");
const users = JSON.parse(usersJSON) || [];

console.log(users); 
