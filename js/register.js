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
  .then(res => console.log(res))
}


$register.addEventListener('click' , e => {
  e.preventDefault()

  getRegister()
})

$toLogin.addEventListener('click' , e => {
  e.preventDefault()

  window.open('./index.html', '_self')
})