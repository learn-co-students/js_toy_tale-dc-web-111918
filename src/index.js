const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded',()=>{
  loadToys()
})


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




function loadToys(){
  fetch('http://localhost:3000/toys')
  .then(response=>response.json())
  .then(toys=>{
    toys.forEach((toy)=>{
      displayToy(toy)
    })
  })
}

function displayToy(toy){
  //create card element
  toyCollection = document.querySelector('#toy-collection')
  toyDiv = document.createElement('div')
  toyDiv.classList.add("card")
  toyCollection.appendChild(toyDiv)

  //add name element
  toyName = document.createElement('h2')
  toyName.innerText = toy.name
  toyDiv.appendChild(toyName)

  //add image
  toyImage = document.createElement('img')
  toyImage.classList.add('toy-avatar')
  toyImage.src = toy.image
  toyDiv.appendChild(toyImage)

  //Likes
  toyLikes = document.createElement('p')
  if (typeof(toy.likes) != "undefined"){
  toyLikes.innerText = `Likes: ${toy.likes}`
  }
  else{
  toyLikes.innerText = `Likes: 0`
  }
  toyDiv.appendChild(toyLikes)

  //Like button
  likeButton = document.createElement('button')
  likeButton.classList.add('like-btn')
  likeButton.innerText= "Likes <3"
  likeButton.id = toy.id
  toyDiv.appendChild(likeButton)
  likeButton.addEventListener("click",onClickToy)
}


document.querySelector('.add-toy-form').addEventListener('submit',(e)=>{
  e.preventDefault()
  createToy()
  e.target.reset()
})


function createToy(){
  let name = document.querySelector("input[name='name']").value
  let image = document.querySelector("input[name='image']").value

  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image
    })
  })
  .then(response=>response.json())
  .then(toy=>{
    displayToy(toy)
  })
}

function onClickToy(e){
  let toyId = e.currentTarget.id
  let newLikes = (e.currentTarget.previousSibling.innerText[7])
  newLikes = parseInt(newLikes) + 1
  editToy(toyId,newLikes)
}

function editToy(id,newLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  .then(response=>response.json())
  //How do I reflect changes on front end???
}
