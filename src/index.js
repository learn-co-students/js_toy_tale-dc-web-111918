

function getAddBtn(){
  return document.querySelector('#new-toy-btn')
};

function getToyForm(){
  return document.querySelector('.container');
};

function getToyCollectionDiv(){
  return document.querySelector('#toy-collection');
};

function getNewToyName(){
  return document.getElementById('toy-name-input');
};

function getNewToyUrl(){
  return document.getElementById('toy-url-input');
};

function getAddToyForm(){
  return document.querySelector('.add-toy-form');
};

let addToy = false


const toyFormSubmit = document.querySelector('.add-toy-form')

document.addEventListener('DOMContentLoaded', () => {
  populateToysOnLoad();
});
// YOUR CODE HERE

getAddBtn().addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    getToyForm().style.display = 'block'
    // submit listener here
    toyFormSubmitListener();
  } else {
    getToyForm().style.display = 'none'
  }
});

const toyFormSubmitListener = (event) => {
  getToyForm().addEventListener('submit', () => {
    createNewToyFromSubmit();
  })
};

let fetchToysData = () => (
  fetch('http://localhost:3000/toys/')
    .then(res => res.json())
    .then(json => json)
);

let fetchToyData = (n) => (
    fetch(`http://localhost:3000/toys/${n}`)
      .then(res => res.json())
      .then(json => json)
);

let updateToyData = (toyObj) => {
  const data = {likes: toyObj.likes};
  return fetch(`http://localhost:3000/toys/${toyObj.id}`,
    {
      method: "PATCH",
      headers:
        {
          "Content-Type":"application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
};

let createNewToy = (toyData) => {
  return fetch('http://localhost:3000/toys/',
    {
      method: "POST",
      headers:
        {
          "Content-Type":"application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toyData)
    })
};


const populateToysOnLoad = () => {
  let toyData = fetchToysData();
  toyData.then(function(toysData){
    toysData.forEach(function(toyData){
      populateToy(toyData);
    });
  });
};

function populateToy(toyData){
  const div = document.createElement('div');
  div.classList.add("card");
  div.id = toyData.id;

  const h2 = document.createElement("h2");
  h2.innerText = toyData.name;
  div.appendChild(h2);

  const image = document.createElement('img');
  div.appendChild(image);
  image.src = toyData.image;
  image.classList.add("toy-avatar");

  const p = document.createElement("p");
  div.appendChild(p);
  p.id = `pTag-id-${toyData.id}`;
  p.innerText = `${toyData.likes} Likes `;

  const btn = document.createElement("button");
  div.appendChild(btn);
  btn.className = "like-btn";
  btn.innerText = "Like <3";
  btn.id = `toy-obj-id-${toyData.id}`;
  getToyCollectionDiv().appendChild(div);
  btn.addEventListener('click', (event) => {
    ++toyData.likes;
    updateToyData(toyData)
    .then(r => r.json())
    .then(toyData => {
      refreshToyLikes(toyData);
    });
  });
};

function refreshToyLikes(toyData){
  document.getElementById(`pTag-id-${toyData.id}`).innerText = `${toyData.likes + 1} Likes `;

};

//
// function updateLikes(toyObj){
//   updateToyData(toyObj);
//
//
// };

function createToy(){



};

function createNewToyFromSubmit(){
  event.preventDefault();
  const newToy = {
    name: getNewToyName().value,
    image: getNewToyUrl().value,
    likes: 0
  };
  createNewToy(newToy)
  .then(r => r.json())
  .then(newToyObj => {
    populateToy(newToyObj);
  });

  getAddToyForm().reset();
};



// OR HERE!


//add toy info to the card
