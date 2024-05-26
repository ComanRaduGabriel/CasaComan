document.addEventListener("DOMContentLoaded", function() {
    var exactLat = 45.667328; // Înlocuiește cu latitudinea exactă
    var exactLng = 24.447702; // Înlocuiește cu longitudinea exactă

    var map = L.map('map').setView([exactLat, exactLng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([exactLat, exactLng]).addTo(map)
        .bindPopup('Casa Coman')
        .openPopup();
});
