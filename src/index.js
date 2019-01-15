//////////////////////////////FUNCTIONAL JS/////////////////////////////////////

//////Bring out create new toy form///////
getAddButton().addEventListener('click', () => {
  // hide & seek with the form
  if (getToyFormDiv().style.display == 'none') {
    getToyFormDiv().style.display = 'block'
    // submit listener here
    getNewToyForm().addEventListener('submit', handleNewToyFormSubmit)
  } else {
    getToyFormDiv().style.display = 'none'
  }
})
////////////////////////////////////////

// fetch all the toys
function getAllToys() {
  // returns the Promise object from this fetch
  return fetch("http://localhost:3000/toys")
}

// fetch to increase the likes of a toy
function updateToyLikes(toyId, likesNumber) {
  const data = {likes: likesNumber}

  return fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
}

function createNewToy(newToyObj) {
  const data = newToyObj

  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

//////// when DOM is loaded, render all toys
document.addEventListener("DOMContentLoaded", () => {
  // once Promise is resolved, we get a HTTP object as the response
  getAllToys()
  .then(response => response.json())
  .then(allToys => {
    //iterate over array and render each toy & put on the DOM
    allToys.forEach(toy => renderToy(toy))
  })
})

function renderToy(toyObj) {
  const headerTag = document.createElement('h2')
  headerTag.innerText = toyObj.name

  const imgTag = document.createElement('img')
  imgTag.src = toyObj.image
  imgTag.classList.add('toy-avatar')

  const pTag = document.createElement('p')
  pTag.innerText = `${toyObj.likes} Likes`
  pTag.id = `like-pTag-${toyObj.id}`

  const likesButton = document.createElement('button')
  likesButton.innerText = "Like <3"
  likesButton.classList.add('like-btn')
  likesButton.addEventListener('click', (e) => {handleLikesClick(toyObj)})

  const toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyDiv.id = toyObj.id

  toyDiv.appendChild(headerTag)
  toyDiv.appendChild(imgTag)
  toyDiv.appendChild(pTag)
  toyDiv.appendChild(likesButton)

  getToyBox().appendChild(toyDiv)
}


//////// Get DOM Elements:
function getToyBox() {
  return document.getElementById('toy-collection')
}

function getLikesPTag(id) {
  return document.getElementById(`like-pTag-${id}`)
}

function getToyFormDiv() {
  return document.querySelector('.container')
}

function getAddButton() {
  return document.querySelector('#new-toy-btn')
}

function getNewToyForm() {
  return document.getElementById('new-toy-form')
}

function getNewToyName() {
  return document.getElementById('new-toy-name')
}

function getNewToyImage() {
  return document.getElementById('new-toy-img')
}


////// Event Handlers:
function handleLikesClick(toyObj) {
  //need info for updateToyLikes(toyId, likesNumber)
  updateToyLikes(toyObj.id, ++toyObj.likes)
  .then(r => r.json())
  .then(updatedToyObj => {
    //get likes field and change innerText for like DOM element
    getLikesPTag(updatedToyObj.id).innerText = `${updatedToyObj.likes} Likes`
  })
  //
}

function handleNewToyFormSubmit(e) {
  e.preventDefault();

  //get user input from form
  const newToy = {
    name: getNewToyName().value,
    image: getNewToyImage().value,
    likes: 0
  }
  //make fetch request & put response on the DOM
  createNewToy(newToy)
  .then(r => r.json())
  .then(newToyObj => renderToy(newToyObj))

  getNewToyForm().reset();
}
