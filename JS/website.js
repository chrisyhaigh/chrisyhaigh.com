// Contact form 

$('#contact-form').on('submit', function(e){

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

        success: function(response){
            console.log('Response', response);
            if (response === 'success')
            console.log('Contact message succesfully sent');
        },

        error: function (jqXHR, textStatus, errorThrown) {
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

