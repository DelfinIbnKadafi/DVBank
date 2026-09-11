const username = localStorage.getItem("Username");
const password = localStorage.getItem("Password");

// Tes Login dulu
async function Login() {
  try {
  
    const data = {
      name: username,
      pw: password
    };
    
    const response = await fetch('http://localhost:7777/request/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const reply = await response.json();

    if(reply.Status === "ALL_GOOD") {
      GetData();
    }
  }
  catch (error) {
    console.error('Cant acces server! :', error);
  }
}

Login();

async function GetData() {
  try {
  
    const data = {
      name: username
    };
    
    const response = await fetch('http://localhost:7777/request/getdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const reply = await response.json();

    console.log("Full Name : ", reply.fullname);
    console.log("Money : ", reply.money);

    

    document.querySelector(".ful-name").textContent = reply.fullname;
    document.querySelector(".user-name").textContent = "@" + username;
    document.querySelector(".balance-amount").textContent = "Rp " + reply.money;
  }
  catch (error) {
    console.error('Cant acces server! :', error);
  }
}
////////////////////////////////////////////////////////////////////////