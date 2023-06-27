
//label input in Contact form
function handleInput(element) {
    const label = element.previousElementSibling;

    if (element.value !== '') {
        label.classList.add('hidden');
    } else {
        label.classList.remove('hidden');
    }
};

//preloader
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
            $(this).remove();
    });
    }
});

