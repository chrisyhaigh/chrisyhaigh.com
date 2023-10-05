// Contact form 

$('contact-form').on('submit', function(e) {

    e.preventDefault();

    let formData = $(this).serialize();

    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    if (!name || !email || !message) {
        alert('Please fill in all the required fields.');
        return;
    };

    $.ajax({
        url: 'PHPMailer-master/src/email-contact.php',
        type: 'POST',
        dataType: 'json',
        data: formData,

        success: function(response) {
            if (response.success) {
                console.log('Email sent successfully')
            } else {
                console.log('Error sending message')
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', status, error);
        },
    })
    
});

//preloader
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
            $(this).remove();
    });
    }
});

