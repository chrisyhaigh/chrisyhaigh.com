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

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar-container');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navItem = document.querySelector('.side-nav-link');

    navItem.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');

        if (sidebar.classList.contains('show-sidebar')) {
            sidebarToggle.style.visibility = 'hidden';
        } else {
            sidebarToggle.style.visibility = 'visible';
        }
    })

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');

        if (sidebar.classList.contains('show-sidebar')) {
            sidebarToggle.style.visibility = 'hidden';
        } else {
            sidebarToggle.style.visibility = 'visible';
        }
    });

    document.body.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('show-sidebar');
            sidebarToggle.style.visibility = 'visible';
        }
    });

});

// Fade in effect


function fadeUp() {
    const fadeUpElements = document.querySelectorAll('.fade-up');

    fadeUpElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom > windowHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.visibility = 'visible';
        }
    })
}

function fadeRight() {
    const fadeRightElements = document.querySelectorAll('.fade-right');

    fadeRightElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom > windowHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            element.style.visibility = 'visible';
        }
    })
}

function fadeLeft() {
    const fadeLeftElements = document.querySelectorAll('.fade-left');

    fadeLeftElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementBottom > windowHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            element.style.visibility = 'visible';
        }
    })
}

function handleScroll() {
    fadeUp();
    fadeLeft();
    fadeRight();
}

window.addEventListener('scroll', handleScroll);


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

