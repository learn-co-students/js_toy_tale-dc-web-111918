const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyCollectionDiv = document.getElementById('toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const toysUrl = 'http://localhost:3000/toys'
let addToy = false


document.addEventListener('DOMContentLoaded', init)

function init() {
  // console.log('loaded')
  fetchToys();

  document.addEventListener('click', increaseToyLikes)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
    addToyForm.addEventListener('submit', createNewToy)
  } else {
    toyFormContainer.style.display = 'none'
  }
})

///////////STEP 2: Fetch Andy's toys///////////////
function fetchToys() {

  return fetch(toysUrl, {
    method: "GET"
  })
  .then(res => res.json())
  .then(json => json.forEach(addInfoToCard))
}

///////////STEP 3: Add toy info to card///////////////
function addInfoToCard(toyObj) {
  // var div = document.createElement('div');
  // div.classList.add("card");
  //
  // var h2 = document.createElement('h2');
  // h2.innerText = toyObj.name;
  // div.appendChild(h2);
  //
  // toyCollection.appendChild(div);

  toyCollectionDiv.innerHTML += `
    <div class="card">
      <h2>${toyObj.name}</h2>
      <img src=${toyObj.image} class="toy-avatar" />
      <p>${toyObj.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <p hidden>${toyObj.id}</p>
    </div>
  `
}

///////////STEP 4: Add a new toy ////////////////////
function createNewToy(e) {
  e.preventDefault();

  fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${e.target["0"].value}`,
      "image": `${e.target["1"].value}`,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(addInfoToCard)

  addToyForm.reset()
}

///////////STEP 5: Increase toy's likes ////////////////////
function increaseToyLikes(e) {
  if (e.target.className === "like-btn") {
    let increasedLikeNumber = parseInt(e.target.previousElementSibling.innerHTML) + 1;
    e.target.previousElementSibling.innerHTML = `${increasedLikeNumber} likes`;

    let id = parseInt(e.target.nextElementSibling.innerHTML);
    let newUrl = toysUrl + "/" + id;

    return fetch(newUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": increasedLikeNumber
      })
    })
    // .then(res => res.json())
    // .then()
  }
}

//https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist
