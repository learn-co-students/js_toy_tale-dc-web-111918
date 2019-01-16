document.addEventListener('DOMContentLoaded', function(){
  getAllToys().then(response => response.json())
  // .then(console.log('DOM LOADED'))
  .then((allToys)=>{allToys.forEach(toy => {
    renderToy(toy)
    })
  });

  addToyBtn().addEventListener('click', () => {
    // hide & seek with the form
    if (toyFormDiv().style.display = 'none') {
      toyFormDiv().style.display = 'block'
      // submit listener here
      getNewToyForm().addEventListener('submit', handleNewToyFormSubmit)
    } else {
      toyFormDiv().style.display = 'none'
    }
  })
});


// DOM Elements:
function getToyBox(){
  return document.getElementById('toy-collection')
};

function toyFormDiv(){
  return document.querySelector('.container')
};

function addToyBtn(){
  return document.querySelector('#new-toy-btn')
};

function getNewToyForm(){
  return document.getElementById('new-toy-form')
};

function getNewToyName(){
  return document.getElementById('new-toy-name')
};

function getNewToyImg(){
  return document.getElementById('new-toy-img')
};

function getLikesPTag(id){
  return document.getElementById(`like-pTag-${id}`)
}


// Fetch Routes:
function getAllToys(){
  return fetch('http://localhost:3000/toys')
}

function createNewToy(newToyInfo){
  const data = newToyInfo
    return fetch('http://localhost:3000/toys',{
      method: "POST",
      headers:
        {
          "Content-Type": "application/json",
              Accept: "application/json"
        },
      body: JSON.stringify(data)
    })
}

function toyLikes(toyId, likesNumber){
  const data  = {likes: likesNumber}
  return fetch(`http://localhost:3000/toys/${toyId}`,
    {
      method: "PATCH",
      headers:
        {
          "Content-Type": "application/json",
              Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
}



function renderToy(toyObj){
  const headerTag = document.createElement('h2')
  headerTag.innerText = toyObj.name

  const imgTag = document.createElement('img')
  imgTag.src = toyObj.image
  imgTag.classList.add('toy-avatar')

  const pTag = document.createElement('p')
  pTag.innerText = `${toyObj.likes} Likes`
  pTag.id = `like-pTag-${toyObj.id}`

  const likesBtn = document.createElement('button')
  likesBtn.innerText = "Like <3"
  likesBtn.classList.add("like-btn")
  likesBtn.addEventListener('click', (e) => {likesClickHandler(toyObj)})

  const toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyDiv.id = toyObj.id

  toyDiv.appendChild(headerTag);
  toyDiv.appendChild(imgTag);
  toyDiv.appendChild(pTag);
  toyDiv.appendChild(likesBtn);

  getToyBox().appendChild(toyDiv)
}


// Event Handlers:
function handleNewToyFormSubmit(e){
  e.preventDefault();

  const newToy ={
    name: getNewToyName().value,
    image: getNewToyImg().value,
    likes: 0
  }

  createNewToy(newToy)
  .then(r => r.json())
  .then(newToyObj => {
    renderToy(newToyObj)
  })

  getNewToyForm().reset();
}

function likesClickHandler(toyObj){
  toyLikes(toyObj.id, ++toyObj.likes)
  .then(r => r.json())
  .then(updatedToyObj => {
    getLikesPTag(updatedToyObj.id).innerText = `${updatedToyObj.likes} Likes`
  })
}
