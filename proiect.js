
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("translated-header").style.opacity = "1";
    document.getElementById("translated-list").style.opacity = "1";
    // Get the modal
    var modal = document.getElementById('reservationModal');

    // Get the button that opens the modal
    var btn = document.getElementById('openModalBtn'); // You need to add a button with this ID to open the modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Notification logic
    var notification = document.getElementById('notification');
    var form = document.getElementById('reservationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Add your form submission logic here
        // After successful form submission, show notification
        notification.className = 'notification show';
        setTimeout(function() {
            notification.className = notification.className.replace('show', '');
        }, 3000);
    });
});
