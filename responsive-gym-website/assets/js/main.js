/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
    const header = document.getElementById('header')
    if (this.scrollY >= 50) header.classList.add('bg-header')
    else header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (!link) return

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link')
        } else {
            link.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUpEl = document.getElementById('scroll-up')
    if (this.scrollY >= 350) scrollUpEl.classList.add('show-scroll')
    else scrollUpEl.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '40px',
        duration: 1200,
        delay: 200,
        reset: false
    })

    sr.reveal('.home__data, .home__img', { interval: 100 })
    sr.reveal('.logos__img', { interval: 80 })
    sr.reveal('.program__card', { interval: 100 })
    sr.reveal('.choose__img, .choose__data', { interval: 100 })
    sr.reveal('.pricing__card', { interval: 100 })
    sr.reveal('.calculate__img, .calculate__data', { interval: 100 })
    sr.reveal('.footer__content', { interval: 100 })
}

/*=============== CALCULATE BMI JS ===============*/
const calculateButton = document.getElementById('calculate-button')
const heightInput = document.getElementById('height')
const weightInput = document.getElementById('weight')
const calculateMessage = document.getElementById('calculate-message')

if (calculateButton) {
    calculateButton.addEventListener('click', () => {
        const height = heightInput.value
        const weight = weightInput.value

        // Check if the fields have a value
        if (height === '' || weight === '') {
            calculateMessage.textContent = 'Fill in the Height and Weight'
            calculateMessage.classList.add('color-red')
            calculateMessage.classList.remove('color-green')

            // Remove message three seconds
            setTimeout(() => {
                calculateMessage.textContent = ''
            }, 3000)
            return
        }

        // BMI Formula
        const heightMeters = height / 100
        const bmi = (weight / (heightMeters * heightMeters)).toFixed(1)

        // Show your health status
        let status = ''
        if (bmi < 18.5) {
            status = `Your BMI is ${bmi} and you are skinny`
        } else if (bmi >= 18.5 && bmi < 25) {
            status = `Your BMI is ${bmi} and you are healthy`
        } else {
            status = `Your BMI is ${bmi} and you are overweight`
        }

        // Add color and display message
        calculateMessage.textContent = status
        calculateMessage.classList.remove('color-red')
        calculateMessage.classList.add('color-green')

        // To clear the input field
        heightInput.value = ''
        weightInput.value = ''

        // Remove message four seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 4000)
    })
}

/*=============== FOOTER EMAIL JS ===============*/
const formButton = document.getElementById('form-button')
const emailInput = document.getElementById('email')
const footerMessage = document.getElementById('footer-message')

if (formButton) {
    formButton.addEventListener('click', () => {
        const email = emailInput.value.trim()

        // Check if the field has a value
        if (email === '') {
            footerMessage.textContent = 'You must enter your email'
            footerMessage.classList.add('color-red')
            footerMessage.classList.remove('color-green')

            // Remove message three seconds
            setTimeout(() => {
                footerMessage.textContent = ''
            }, 3000)
            return
        }

        // Show message and add color
        footerMessage.textContent = 'You registered successfully'
        footerMessage.classList.remove('color-red')
        footerMessage.classList.add('color-green')

        // To clear the input field
        emailInput.value = ''

        // Remove message after three seconds
        setTimeout(() => {
            footerMessage.textContent = ''
        }, 3000)
    })
}

/*=============== REGISTER MODAL ===============*/
const registerModal = document.getElementById('register')
const registerOpen = document.getElementById('register-open')
const registerClose = document.getElementById('register-close')
const registerForm = document.getElementById('register-form')
const registerMessage = document.getElementById('register-message')

if (registerOpen) {
    registerOpen.addEventListener('click', () => {
        registerModal.classList.add('show-register')
        document.body.style.overflow = 'hidden'
    })
}

const closeRegister = () => {
    registerModal.classList.remove('show-register')
    document.body.style.overflow = ''
}

if (registerClose) {
    registerClose.addEventListener('click', closeRegister)
}

// Close when clicking the dark overlay (outside the form)
if (registerModal) {
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) closeRegister()
    })
}

// Close with the Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registerModal && registerModal.classList.contains('show-register')) {
        closeRegister()
    }
})

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('register-name').value.trim()
        const email = document.getElementById('register-email').value.trim()
        const phone = document.getElementById('register-phone').value.trim()
        const plan = document.getElementById('register-plan').value

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (name === '' || email === '' || phone === '' || plan === '') {
            registerMessage.textContent = 'Please fill in all fields'
            registerMessage.style.color = 'hsl(4, 71%, 50%)'
            return
        }

        if (!emailPattern.test(email)) {
            registerMessage.textContent = 'Please enter a valid email'
            registerMessage.style.color = 'hsl(4, 71%, 50%)'
            return
        }

        // Success — in a real app this would POST to a server
        registerMessage.textContent = `Welcome, ${name}! You're registered for the ${plan} plan.`
        registerMessage.style.color = 'var(--first-color)'

        registerForm.reset()

        setTimeout(() => {
            closeRegister()
            registerMessage.textContent = ''
        }, 2500)
    })
}
