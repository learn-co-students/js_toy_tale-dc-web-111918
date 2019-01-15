document.addEventListener("DOMContentLoaded", function(){
  let addToyForm = document.querySelector('.add-toy-form')
  addToyForm.addEventListener('submit', function(){
    event.preventDefault()
    let toyName = document.querySelector('#name-input').value
    let toyImg = document.querySelector('#img-input').value
    postNewToy(toyName, toyImg)
  })

  getAllToys()

})

function postNewToy(toyName, toyImg){
  let data = {
    "name": toyName,
    "image": toyImg,
    "likes": 0
  }
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => res.json())
  .then(toy => {
    renderToy(toy)
  })
}

function getAllToys(){
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => renderToy(toy))
  })
}

function renderToy(toy){
  let toyCollection = document.querySelector('#toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')
  let toyHeader = document.createElement('h2')
  toyHeader.innerText = toy.name
  toyCard.appendChild(toyHeader)
  let toyImage = document.createElement('img')
  toyImage.classList.add('toy-avatar')
  toyImage.src = toy.image
  toyCard.appendChild(toyImage)
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes `
  toyCard.appendChild(toyLikes)
  let toyLikeButton = document.createElement('button')
  toyLikeButton.classList.add('like-btn')
  toyLikeButton.innerText = 'Like <3'
  toyLikeButton.id = toy.id
  // toyLikeButton.addEventListener('click', toyLikeButtonHandler(toy, toyLikes))
  toyLikeButton.addEventListener('click', toyLikeButtonHandler)
  toyCard.appendChild(toyLikeButton)
  toyCollection.appendChild(toyCard)
}

// function toyLikeButtonHandler(toy, toyLikes){
//   // +1 to likes
//   let toyId = toy.id
//   let newLikes = parseInt(toy.likes)+1
//   updateLikes(toyId, newLikes)
//   toyLikes.innerText = toy.likes
// }
function toyLikeButtonHandler(e){
  let toyId = e.currentTarget.id
  let likeTag = e.currentTarget.previousSibling
  let likes = parseInt(likeTag.innerText)
  let newLikes = likes + 1
  updateLikes(toyId, newLikes)
  likeTag.innerText = `${newLikes} Likes `
}

function updateLikes(toyId, newLikes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  .then(res => res.json())

}

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
