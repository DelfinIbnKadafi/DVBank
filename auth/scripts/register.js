const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  
  if (password !== confirmPassword) {
    NotifRegister("Kata sandi tidak cocok!");
    return;
  }

  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const data = {
    fullname: fullname,
    username: username,
    email: email,
    phone: phone,
    password: password
  };

  try {
    const response = await fetch('http://localhost:7777/request/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const reply = await response.json();

    if(reply.Status === "USN_IS_EXIST") {
      NotifRegister("Username sudah terdaftar!");
      return;
    }
    else if(reply.Status === "EMAIL_IS_EXIST") {
      NotifRegister("Email sudah terdaftar!");
      return;
    }
    else if(reply.Status === "SUCCES_CREATE_ACCOUNT") {
      // ready login
      // set browser data
      localStorage.setItem("Username", username);
      localStorage.setItem("Password", password);

      window.location.href = "../home/home.html";
    }
    
  }
  catch (error) {
    NotifRegister("Server sedang bermasalah!");
  }
  
});

function NotifRegister(text) {
  document.querySelector(".Notif").textContent = text;
}