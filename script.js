// ==========================
// LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            alert("Login Successful!");
            window.location.href = "reservation.html";
        } else {
            alert("Invalid Username or Password!");
        }
    });
}

// ==========================
// RESERVATION
// ==========================

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {

    // Set minimum date as today
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    reservationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        let mobile = document.getElementById("mobile").value.trim();
        let trainNo = document.getElementById("trainNo").value.trim();
        let trainName = document.getElementById("trainName").value.trim();
        let from = document.getElementById("from").value.trim();
        let to = document.getElementById("to").value.trim();
        let date = document.getElementById("date").value;
        let travelClass = document.getElementById("class").value;

        if (mobile.length !== 10 || isNaN(mobile)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        if (from.toLowerCase() === to.toLowerCase()) {
            alert("From and To stations cannot be the same.");
            return;
        }

        // Generate PNR
        let pnr = "PNR" + Math.floor(100000000 + Math.random() * 900000000);

        const ticket = {
            pnr: pnr,
            name: name,
            age: age,
            gender: gender,
            mobile: mobile,
            trainNo: trainNo,
            trainName: trainName,
            from: from,
            to: to,
            date: date,
            travelClass: travelClass
        };

        localStorage.setItem(pnr, JSON.stringify(ticket));

        document.getElementById("result").innerHTML = `
            <div class="success">
                <h2>✅ Reservation Successful</h2>
                <br>
                <p><strong>PNR:</strong> ${pnr}</p>
                <p><strong>Passenger:</strong> ${name}</p>
                <p><strong>Train:</strong> ${trainName} (${trainNo})</p>
                <p><strong>Journey:</strong> ${from} ➜ ${to}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Class:</strong> ${travelClass}</p>
            </div>
        `;

        reservationForm.reset();
    });
}

// ==========================
// SEARCH TICKET
// ==========================

function searchTicket() {

    let pnr = document.getElementById("searchPNR").value.trim();

    let ticket = localStorage.getItem(pnr);

    if (ticket == null) {
        alert("Ticket Not Found!");
        document.getElementById("ticketDetails").innerHTML = "";
        return;
    }

    ticket = JSON.parse(ticket);

    document.getElementById("ticketDetails").innerHTML = `

    <table>

        <tr>
            <th>PNR</th>
            <td>${ticket.pnr}</td>
        </tr>

        <tr>
            <th>Name</th>
            <td>${ticket.name}</td>
        </tr>

        <tr>
            <th>Age</th>
            <td>${ticket.age}</td>
        </tr>

        <tr>
            <th>Gender</th>
            <td>${ticket.gender}</td>
        </tr>

        <tr>
            <th>Mobile</th>
            <td>${ticket.mobile}</td>
        </tr>

        <tr>
            <th>Train No</th>
            <td>${ticket.trainNo}</td>
        </tr>

        <tr>
            <th>Train Name</th>
            <td>${ticket.trainName}</td>
        </tr>

        <tr>
            <th>From</th>
            <td>${ticket.from}</td>
        </tr>

        <tr>
            <th>To</th>
            <td>${ticket.to}</td>
        </tr>

        <tr>
            <th>Date</th>
            <td>${ticket.date}</td>
        </tr>

        <tr>
            <th>Class</th>
            <td>${ticket.travelClass}</td>
        </tr>

    </table>

    <br>

    <button class="cancel-btn"
            onclick="cancelTicket('${ticket.pnr}')">
            Cancel Ticket
    </button>

    `;
}

// ==========================
// CANCEL TICKET
// ==========================

function cancelTicket(pnr) {

    if (confirm("Are you sure you want to cancel this ticket?")) {

        localStorage.removeItem(pnr);

        alert("Ticket Cancelled Successfully!");

        document.getElementById("ticketDetails").innerHTML = "";

        document.getElementById("searchPNR").value = "";
    }

}