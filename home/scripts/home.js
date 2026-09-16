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
      GetData();
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
async function GetData() {
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

    document.querySelector(".ful-name").textContent = reply.fullname;
    document.querySelector(".user-name").textContent = "@" + username;
    document.querySelector(".balance-amount").textContent = "Rp " + reply.money;
  }
  catch (error) {
    console.error("Cant acces server! :", error);
  }
}


// pages
const pageContent = document.getElementById("pageContent");

// Home
function HomePage() {
  pageContent.innerHTML = 
  `
    <div id="userInfo">
      <div class="user-header">
        <h2 class="ful-name">Full Name</h2>
        <span class="user-name">@${username}</span>
      </div>

      <div class="balance-section">
        <div class="balance-label">Saldo</div>
        <div class="balance-amount">Rp 0</div>
      </div>
    </div>
    <div id="Menu-Cepat">
      <button id ="transfer" type="button">
        <i class="fa-solid fa-wallet"></i>
        <span>Transfer</span>
      </button>
      <button id ="top-up" type="button">
        <i class="fa-solid fa-plus"></i>
        <span>Transfer</span>
      </button>
    </div>
  `;

  GetData();
}


// Bayar
function PayPage() {
  pageContent.innerHTML =
  `
    
  `;
  GetData();
}


// Pengaturan
function SettingsPage() {
  pageContent.innerHTML =
  `
    
  `;
  GetData();
}

const navHome = document.getElementById("navHome");
const navPay = document.getElementById("navPay");
const navSettings = document.getElementById("navSettings");


function setActive(button) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
}


// Home
navHome.addEventListener("click", () => {
  setActive(navHome);
  HomePage();
});


// Bayar
navPay.addEventListener("click", () => {
  setActive(navPay);
  PayPage();
});


// Pengaturan
navSettings.addEventListener("click", () => {
  setActive(navSettings);
  SettingsPage();
});

////////////////////////////////////////////////////

// button transfer di menu Cepat
const transferCepat = document.getElementById("transfer");

transferCepat.addEventListener("click", () => {
  window.location.href = "../transaction/transfer/transfer.html";
});

//////////////////////////////////////////////////////////////
Login();