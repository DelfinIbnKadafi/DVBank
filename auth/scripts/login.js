const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    name: username,
    pw: password
  };
  
  try {
    const response = await fetch('http://localhost:7777/request/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const reply = await response.json();

    if(reply.Status === 'ACCOUNT_NOT_EXIST') {
      alert("Tidak dapat menemukan akun!");
      return;
    }
    else if(reply.Status === "PW_IS_WRONG") {
      alert("Password salah!");
      return;
    }
    else if(reply.Status === "ALL_GOOD") {
      // set browser data
      localStorage.setItem("Username", username);
      localStorage.setItem("Password", password);

      window.location.href = "../home/home.html";
      return;
    }
  }
  catch (error) {
    console.error('Cant acces server! :', error);
  }
});