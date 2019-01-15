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

document.addEventListener("DOMContentLoaded", function(){
	console.log('connected')
	getAllToys();

	let form = document.querySelector('form')
	form.addEventListener('submit', formSubmit)

});

function formSubmit(e){
	e.preventDefault();
	postNewToy();
}

function getAllToys(){
		
		fetch('http://localhost:3000/toys')
		.then(res => res.json())
		.then(toys => {
			console.log(toys)
			toys.forEach(toy => {
				renderToy(toy)
			})
		})
}

function postNewToy(){
	let name = document.querySelector('input[name="name"').value
	let url = document.querySelector('input[name="image"').value

	fetch('http://localhost:3000/toys', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify({
			name: name,
			image: url
		})
	}).then(res => res.json())
	.then(toys => {
		console.log(toys)
		renderToy(toys)
	})
}

function renderToy(toy){
	let showToy = document.querySelector('#toy-collection')

	let toyDiv = document.createElement('div')
	toyDiv.classList.add('card')
	// don't forget to set id to each card
	toyDiv.id = `toy-${toy.id}`
	showToy.appendChild(toyDiv)


	let header = document.createElement('h2')
	header.innerText = toy.name
	toyDiv.appendChild(header)

	let image = document.createElement('img')
	image.classList.add('toy-avatar')
	image.src = toy.image
	toyDiv.appendChild(image)

	let likes = document.createElement('p')
	// ternary operator = if/else on one line
	likes.innerText = (toy.likes ? toy.likes : 0) + ' Likes'
	toyDiv.appendChild(likes)

	let likeBtn = document.createElement('button')
	likeBtn.classList.add('like-btn')
	likeBtn.innerText = 'Like <3'
	toyDiv.appendChild(likeBtn)
	likeBtn.addEventListener('click', function(){
		increaseLike(toy.id, toy.likes)
	});
}

function increaseLike(id, currentLikes){
	// setting currentLikes if it undefined 
	currentLikes = currentLikes ? currentLikes : 0;
	fetch(`http://localhost:3000/toys/${id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify({
			likes: ++currentLikes
		})
	})
	.then(res => res.json())
	.then(toy => {
		console.log(toy);
		// debugger;
		document.querySelector(`#toy-${id} > p`).innerText = `${currentLikes} Likes`
		// updates currentLikes (p tag)
		// `#toy-${id} > p` this means find the p tag that is a child of toy-id
	})
}










