function skillsClick() {
    const logoContainer = document.querySelector('.skills-container .logo-container');
  
    if (logoContainer.style.display === 'none') {
      logoContainer.style.display = 'flex';
    } else {
      logoContainer.style.display = 'none';
    }
  }
  
const skillsButton = document.getElementById('skills-button');
skillsButton.addEventListener('click', skillsClick);

function experienceClick() {
    const experienceContainer = document.querySelector('#experience .experience-container');

    if (experienceContainer.style.display === 'none') {
        experienceContainer.style.display = 'block';
    } else {
        experienceContainer.style.display = 'none';
    }
}

const experienceButton = document.getElementById('experience-button');
experienceButton.addEventListener('click', experienceClick);

  
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

