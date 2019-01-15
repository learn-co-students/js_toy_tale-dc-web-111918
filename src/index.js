document.addEventListener('DOMContentLoaded', function () {
  getAllToys()
  addBtn().addEventListener('click', showForm)
  submitBtn().addEventListener('click', onSubmitForm)
})

let addToy = false

const addBtn = () => document.querySelector('#new-toy-btn')
const submitBtn = () => document.querySelector('#submit-button')
const toyForm = () => document.querySelector('.container')

const showForm = () => {
  addToy = !addToy
  if (addToy) {
    toyForm().style.display = 'block'
  } else {
    toyForm().style.display = 'none'
  }
}

function getAllToys(){

  return fetch('http://localhost:3000/toys/')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => renderToy(toy))
  })
}

function renderToy(toy){

  let toyContainer = document.querySelector('#toy-collection')

  let toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyContainer.appendChild(toyDiv)

  let header = document.createElement('h4')
  header.innerText = toy.name
  toyDiv.appendChild(header)

  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`
  toyDiv.appendChild(toyLikes)

  let image = document.createElement('img')
  image.src = toy.image
  image.classList.add('toy-avatar')
  toyDiv.appendChild(image)

  let button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = 'Like <3'
  button.id = toy.id
  toyDiv.appendChild(button)
  button.addEventListener('click', addLikeToCard)
}

function onSubmitForm(event) {
  event.preventDefault()
  let name = document.querySelector('#name-field').value
  let imageURL = document.querySelector('#url-field').value
  fetch('http://localhost:3000/toys/', {
     method: 'POST',
     headers: {
       'Content-type' : 'application/json',
       'Accept' : 'application/json'
     },
     body: JSON.stringify({name: name, image: imageURL, likes: 0})
  }).then(response => response.json())
  .then(toy => renderToy(toy))
}

function addLikeToCard(event) {
  let toyId = event.target.id
  let likeElement = event.target.parentElement.children[1]
  let updatedLikes = parseInt(likeElement.innerText.split(' Likes')[0]) + 1
  updateLikesOnServer(toyId, updatedLikes)
  .then(data => likeElement.innerText = `${updatedLikes} Likes`)


}

function updateLikesOnServer(toyId, updatedLikes) {
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-type' : 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({likes: `${updatedLikes}`})
  })
}
