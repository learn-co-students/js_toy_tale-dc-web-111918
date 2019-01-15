document.addEventListener("DOMContentLoaded",function (){

  addBtn.addEventListener('click', () => {
    addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
    // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    let addToy = false
    // YOUR CODE HERE
    fetchAllToys()
  })
})


///////////////////////////////////////////////////////////


  // When the page loads, make a 'GET' request to fetch all the toy objects.
//Step 2
      function fetchAllToys(){
        fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then(allToys => {
          allToys.forEach((toy) => render(toy))
        };
      }

      //With the response data, make a <div class="card">
      //for each toy add it to the toy-collection div.
//Step 2/3/4
      function render(toy){
        let collection = document.getElementbyId('toy-collection')

        let card = document.createElemenet('div')
        card.innerHTML +=
        `<div class= 'card'
        <h2>${toy.name}</h2>
        <image src= ${toy.image} class='toy-avatar' />
        <p>'${toy.likes} Likes'</p>
        <button class= 'like-btn'> 'Like <3' </button>
        </div>`

        collection..appendChild(card)
      }
      //When a user clicks on the add new toy button - a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.

      //The toy should conditionally render to the page.
//Step 4
      function createToy(event){
        event.preventDefault()
        let name = document.querySelector("input[name='name']").value
        let image = document.querySelector("input[name='image']").value

        fetch('http://localhost:3000/toys',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            "Accept" : "application/json"
            },
          body: JSON.stringify({ name: name,
            image: image}
        })
        .then(response =>response.json())
        .then(toy => render(toy))
      }
