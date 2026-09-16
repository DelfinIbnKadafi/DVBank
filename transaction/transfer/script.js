const username = localStorage.getItem("Username");
const password = localStorage.getItem("Password");

/// login
async function Login() {
  try {
    const data = {
      name: username,
      pw: password
    };

    const response = await fetch("http://localhost:7777/request/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const reply = await response.json();

    if (reply.Status === "ALL_GOOD") {
      GetData(1);
    }
    else {
      window.location.href = "../index.html";
    }
  }
  catch (error) {
    console.error("Cant acces server! :", error);
  }
}

/// get data
async function GetData(ahhh) {
  try {
    const data = {
      name: username
    };

    const response = await fetch("http://localhost:7777/request/getdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const reply = await response.json();

    console.log("Full Name : ", reply.fullname);
    console.log("Money : ", reply.money);

    if(ahhh === 2) {
      return reply.money;
    }
  }
  catch (error) {
    console.error("Cant acces server! :", error);
  }
}

Login();

const back = document.getElementById("back-button");
back.addEventListener("click", function Back() {
  window.location.href = "../home/home.html";
});


// submit transfer
const amountInput = document.getElementById("amount");

amountInput.addEventListener("input", () => {
  const value = amountInput.value.replace(/\D/g, "");
  amountInput.value = value ? Number(value).toLocaleString("id-ID") : "";
});

const tujuan = document.getElementById("username");
const form = document.getElementById("Transfer-Box");

form.addEventListener("submit", async function transfer(event) {
  event.preventDefault();

  const username = tujuan.value;
  const amount = parseInt(amountInput.value.replace(/\./g, ""), 10);

  console.log(username);
  console.log(amount);

  if(await GetData(2) < amount) {
    alert("Uang anda tidak cukup!");
    return;
  }
});