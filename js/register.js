const $emailInput = document.querySelector('.emailInput')
const $passwordInput = document.querySelector('.passwordInput')
const $register = document.querySelector('.register')
const $toLogin = document.querySelector('.toLogin')

const BASE_URL = 'https://todo-itacademy.herokuapp.com/api'

function getRegister(){
  fetch(`${BASE_URL}/registration`, {
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
    window.open('./auth.html', '_self')
  })  
  .finally(() => {
    $register.disabled = false
  })
}


$register.addEventListener('click' , e => {
  e.preventDefault()

  $register.disabled = true
  getRegister(base)
})

window.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken')

  if(accessToken){
    window.open('./auth.html', '_self')
  }

})

$toLogin.addEventListener('click' , e => {
  e.preventDefault()

  window.open('./auth.html', '_self')
})