const $emailInput = document.querySelector('.emailInput')
const $passwordInput = document.querySelector('.passwordInput')
const $register = document.querySelector('.register')
const $toRegister = document.querySelector('.toRegister')

const BASE_URL = 'https://todo-itacademy.herokuapp.com/api'

function getRegister(){
  fetch(`${BASE_URL}/login`, {
    method:'POST',
    body: JSON.stringify({
      email: $emailInput.value ,
      password: $passwordInput.value ,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('isActivated', res.user.isActivated)
    localStorage.setItem('userId', res.user.id)
    window.open('./index.html', '_self')
  })  
}


$register.addEventListener('click' , e => {
  e.preventDefault()

  getRegister()
})

$toRegister.addEventListener('click' , e => {
  e.preventDefault()

  window.open('./register.html', '_self')
})