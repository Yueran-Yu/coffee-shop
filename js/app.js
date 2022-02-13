// hide preloader
// all the images scripts links have finished loading
// window event list

eventListeners()

function eventListeners() {
  const ui = new UI()

  window.addEventListener('load', function () {
    ui.hidePreloader()
  })

  // nav btn
  const navBtn = document.querySelector('.navBtn')
  navBtn.addEventListener('click', () => {
    ui.showNav()
  })
  // control the video
  document.querySelector('.video__switch').addEventListener('click', () => {
    ui.videoControls()
  })


  // here we add something
  // submit the form
  document.querySelector('.drink-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const name = document.querySelector('.input-name').value
    const lastname = document.querySelector('.input-lastname').value
    const email = document.querySelector('.input-email').value
    let value = ui.checkEmpty(name, lastname, email)

    if (value) {
      ui.showFeedback('customer added to the list', 'success')
      let pers = new Person(name, lastname, email)
      ui.addCustomer(pers)
      ui.clearFields()
    } else {
      ui.showFeedback('some form empty', 'error')
    }
  })

  // display modal
  const links = document.querySelectorAll('.work-item__icon')
  links.forEach(item => {
    item.addEventListener('click', event => {
      ui.showModal(event)
    })
  })

  // hide modal
  document.querySelector('.work-modal__close').addEventListener('click', () => {
    ui.closeModal()
  })
}

// play/ pause the video
UI.prototype.videoControls = function () {
  let btn = document.querySelector('.video__switch-btn')
  if (!btn.classList.contains('btnSlide')) {
    btn.classList.add('btnSlide')
    document.querySelector('.video__item').pause()
  } else {
    btn.classList.remove('btnSlide')
    document.querySelector('.video__item').play()
  }
  // document.querySelector('.video__switch-btn').classList.toggle('btnSlide')
}

UI.prototype.hidePreloader = function () {
  setTimeout(function () { document.querySelector('.preloader').style.display = 'none' }, 500)
}

UI.prototype.showNav = function () {
  // please to use toggle
  document.querySelector('.nav').classList.toggle('nav--show')
}

// check for empty values
UI.prototype.checkEmpty = function (name, lastname, email) {
  let result;
  if (name === '' || lastname === '' || email === '') {
    result = false
  } else {
    result = true
  }
  return result
}

UI.prototype.showFeedback = function (sometext, type) {
  let feedback = document.querySelector('.drink-form__feedback')
  feedback.innerText = sometext
  feedback.classList.add(type)
  this.removeAlert(type)
}

UI.prototype.removeAlert = type => {
  setTimeout(() => {
    document.querySelector('.drink-form__feedback').classList.remove(type)
  }, 2000)
}

UI.prototype.addCustomer = function (customer) {
  const images = [1, 2, 3, 4, 5]
  let random = Math.floor(Math.random() * images.length)
  const div = document.createElement('div')
  div.classList.add('person')
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__lastname">${customer.lastname}</h4>`
  document.querySelector('.drink-card__list').appendChild(div)
}

UI.prototype.clearFields = function () {
  document.querySelector('.input-name').value = ''
  document.querySelector('.input-lastname').value = ''
  document.querySelector('.input-email').value = ''
}

// show modal
UI.prototype.showModal = function (event) {
  event.preventDefault()
  if (event.target.parentElement.classList.contains('work-item__icon')) {
    let id = event.target.parentElement.dataset.id
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item')
    modal.classList.add('work-modal--show')
    let result = modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
  }
}

// hide modal
UI.prototype.closeModal = function () {
  document.querySelector('.work-modal').classList.remove('work-modal--show')
}
function Person(name, lastname, email) {
  this.name = name
  this.lastname = lastname
  this.email = email
}

function UI() {

}



