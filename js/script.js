const $title = document.querySelector('.title')
const $content = document.querySelector('.content')
const $date = document.querySelector('.date')
const $submit = document.querySelector('.submit')
const $container = document.querySelector('.container')
const $loader = document.querySelector('.loader')
const $signOut = document.querySelector('.signOut')

const base = 'https://todo-itacademy.herokuapp.com/api'
const accessToken = localStorage.getItem('accessToken')

window.addEventListener('DOMContentLoaded', () => {
  $loader.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>'
  getTodos()
})

function getTodos(){
  fetch(`${base}/todos`, {
    method:'GET',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(r => {
      const todos = r.todos
      const result = todos  
        .map(todo => cardTemplate(todo))
        .join('')

        $container.innerHTML = result
    })
}

function getSingleTodo(id){
  return fetch(`${base}/todos/${id}`, {
    method: 'GET',
    headers: {
      'Content-type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
}

function createTodos(title, content, date){
  $submit.disabled = true

  fetch(`${base}/todos/create`, {
    method: 'POST', 
    headers: {
      'Content-type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    body: JSON.stringify({
      title,
      content, 
      date,
    })
  })
    .then(() => {
      getTodos()
    })
    .finally(() => $submit.disabled = false)
}

function cardTemplate({title, content, date, id, completed, edited}){
  return `
    <div class="card">
      <div class="card-left">
        <div class="card-header">
          <h1>${title}</h1>
          ${completed ? `<img src="https://emojio.ru/images/apple-b/2705.png" style="width: 25px; height: 25px; margin-top: 5px; margin-left: 15px">` : ''}
        </div>
        <div class="card-body">
          <p>${content}</p>
          <span class="time">
            ${date}
            ${edited.state ? `<span class="small">Edited. ${edited.date}</span>` : ''}
          </span>
        </div>
      </div>

      <div class="card-right">
        <button class="completed" onclick="completeTodo('${id}')">Completed</button>
        <button class="editBtn" onclick="editTodo('${id}')">Edit</button>
        <button class="deleteBtn" onclick="deleteTodo('${id}')">Delete</button>
      </div>
    </div>
  `
}

function completeTodo(id){
  fetch(`${base}/todos/${id}/completed`, {
    method: 'GET', 
    headers: {
      'Content-type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }
  })
    .then(getTodos)
}

function deleteTodo(id){
  fetch(`${base}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }
  })
    .then(getTodos)
}

function editTodo(id){
  getSingleTodo(id)
    .then(res => {
      const askTitle = prompt('New title', res.title)
      const askContent = prompt('New content', res.content)

      fetch(`${base}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type':'application/json',
          'Authorization':`Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: askTitle || res.title,
          content: askContent || res.content
        })
      })
        .then(getTodos)
    })
}

$submit.addEventListener('click', e => {
  e.preventDefault()

  $submit.disabled = true

  createTodos($title.value, $content.value, $date.value)
})

$signOut.addEventListener('click', e => {
  e.preventDefault()

  const refreshToken = localStorage.getItem('refreshToken')

  $signOut.disabled = true
  $signOut.classList.add('disabled')

  fetch(`${base}/logout`, {
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    body:JSON.stringify({refreshToken})
  })
    .then(res => res.json())
    .then(() => {
      localStorage.clear()
      window.open('./auth.html', '_self')
    })
    .finally(() => {
      $signOut.disabled = false
      $signOut.classList.remove('disabled')
    })
})