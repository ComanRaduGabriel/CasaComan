import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpsn1VR8vHv2DsLwfME8uDs4uey2qvvtw",
  authDomain: "rezervari-cabana.firebaseapp.com",
  projectId: "rezervari-cabana",
  storageBucket: "rezervari-cabana.appspot.com",
  messagingSenderId: "807568620944",
  appId: "1:807568620944:web:deee664f118f72f0bfc715",
  measurementId: "G-62E42VRSHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async function() {
    const nume = document.getElementById("name");
    const telefon = document.getElementById("phone");
    const rezerva = document.getElementById("rezerva");
    let selectedInfo;

    // Load existing reservations
    async function loadReservations() {
        const rezervari = collection(db, "rezervari");
        const rezervariSnapshot = await getDocs(rezervari);
        let events = [];
        rezervariSnapshot.forEach((doc) => {
            let data = doc.data();
            events.push({
                id: doc.id, // Adding the document ID
                title: data.nume,
                start: data["data intrare"],
                end: data["data iesire"],
                backgroundColor: data.culoare, // Use saved color
                borderColor: data.culoare, // Use saved color for border
                textColor: "white", // Ensure text is readable
                extendedProps: {
                    phone: data.telefon,
                    status: 'booked'
                },
                editable: false, // Make the event non-editable
                durationEditable: false // Make the event duration non-editable
            });
        });
        return events;
    }

    // Generate a random color
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Add new reservation
    rezerva.addEventListener('click', async (e) => {
        e.preventDefault();
        const randomColor = getRandomColor();
        try {
            await addDoc(collection(db, "rezervari"), {
                nume: nume.value,
                telefon: telefon.value,
                "data intrare": selectedInfo.startStr,
                "data iesire": selectedInfo.endStr,
                culoare: randomColor // Save random color
            });
            alert("Rezervarea a fost efectuata cu succes!");
            resetForm();
            selectedInfo = null;
            modal.style.display = "none";
            calendar.refetchEvents();
        } catch (error) {
            console.error("Eroare la adăugarea documentului: ", error);
        }
    });

    // Initialize calendar
    var calendarEl = document.getElementById('calendar');
    var modal = document.getElementById("reservationModal");
    var span = document.getElementsByClassName("close")[0];
    var notification = document.getElementById("notification");
    var today = new Date().toISOString().slice(0,10);

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectHelper: true,
        events: async function(fetchInfo, successCallback, failureCallback) {
            let events = await loadReservations();
            successCallback(events);
        },
        select: function(info) {
            if (info.startStr < today) {
                alert("Nu puteți rezerva pentru zilele anterioare.");
                return;
            }
            let eventExists = calendar.getEvents().some(event => {
                return (info.start >= event.start && info.start < event.end) || 
                       (info.end > event.start && info.end <= event.end) || 
                       (info.start <= event.start && info.end >= event.end);
            });
            if (eventExists) {
                alert("Această perioadă este deja rezervată.");
                return;
            }
            resetForm(); // Reset form each time modal is opened
            selectedInfo = info;
            modal.style.display = "block";
        },
        eventRender: function(info) {
            info.el.style.fontSize = "1.2em"; // Set larger font size
            info.el.style.fontWeight = "bold"; // Set bold text
            info.el.style.borderRadius = "5px";
        }
    });
    calendar.render();

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function resetForm() {
        document.getElementById("reservationForm").reset();
    }

    function showNotification() {
        notification.className = "notification show";
        setTimeout(function() {
            notification.className = notification.className.replace("show", "");
        }, 3000);
    }
});
