// Navbar
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".navbar-nav .nav-item");

    navItems.forEach(function (navItem) {
      navItem.addEventListener("click", function () {
        const collapsedMenu = document.getElementById("navbarNav");
        if (collapsedMenu.classList.contains("show")) {
          collapsedMenu.classList.remove("show");
        }
      });
    });
});



//Home Arrow Button 
document.addEventListener('DOMContentLoaded', function() {
    const arrowButtonContainer = document.querySelector('.arrow-button-container');
    const navbar = document.querySelector('.navbar');
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    window.addEventListener('scroll', function () {
        const banner = document.querySelector('.main-banner');
        const scrollPosition = window.scrollY;

        if (banner) {
            const bannerRect = banner.getBoundingClientRect();

            if (bannerRect.top >= 0 && bannerRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                arrowButtonContainer.style.opacity = '0';
                navbar.style.backgroundColor = 'transparent';
            } else {
                arrowButtonContainer.style.opacity = '1';
                navbar.style.backgroundColor = 'black';
            }
        }

        if (isMobile && scrollPosition < 30) {
            navbar.style.backgroundColor = 'transparent';
            arrowButtonContainer.style.opacity = '0';
        }
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
            confirmation.html('Message Sent');
            console.log(jqXHR, textStatus, errorThrown);
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
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

