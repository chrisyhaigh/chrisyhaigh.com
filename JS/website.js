// Navbar
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll("#collapsed-navbar .nav-item");

    navItems.forEach(function (navItem) {
      navItem.addEventListener("click", function () {
        const collapsedMenu = document.getElementById("navbarNavAltMarkup");
        if (collapsedMenu.classList.contains("show")) {
          collapsedMenu.classList.remove("show");
        }
      });
    });
});

// Contact Form

$('#contact-form').on('submit', function(e) {
    e.preventDefault();

    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    $.ajax({
        url: 'php/email-contact.php',
        type: 'POST',
        dataType: 'json',
        data: {
            name: name,
            email: email,
            message: message,
        },

        success: function(response) {
            console.log('Response', response);

            const confirmation = $('#message-confirmation');

            if (response.status === 'success') {
                confirmation.html('Message Sent');
                console.log('Contact message successfully sent');
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
            const confirmation = $('#message-confirmation');
            confirmation.html('Error sending Message');
            console.log('Error sending message', jqXHR, textStatus, errorThrown);
        },
    });
});


// Preloader

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
            $(this).remove();
    });
    }
});

