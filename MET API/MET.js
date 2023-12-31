const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'
const searchBox = document.querySelector('.input-form')
const inputTag = document.querySelector("input")
const container = document.querySelector(".images-container")

searchBox.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    let searchTerm = e.target.elements.search.value
    
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`)
    .then(res => res.json())
    .then(res => {
        let total = 0
        total = res.total > 100 ? 100 : res.total
        
        let searchedIDs = []

        for (let i = 0; i < total; i++) {
            searchedIDs.push(fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.objectIDs[i]}`)
            .then(res => res.json()));
        }

        inputTag.value = ""

        Promise.all(searchedIDs)
        .then(res => displayImages(res))
    })
}

function displayImages(images){
    container.innerHTML = ""

    images.forEach(img => {
        if (img.primaryImage) {
            let html = `
                <div class="images">
                    <img src="${img.primaryImage}" alt="${img.title}" />
                </div>
            `

            container.insertAdjacentHTML("beforeend", html)
        }
    })

    const imageDivs = document.querySelectorAll(".images")

    imageDivs.forEach((imageDivsDiv, i) => {
        imageDivsDiv.addEventListener("click", (e) => handleClick(e, images[i]))
    })
}

function handleClick(e, artpiece){
    console.log(artpiece)
    let divContainer = document.querySelector(".modal-info")
    divContainer.innerHTML = ""

    let divInfo = `
        <div class="cool">
          <img src="${artpiece.primaryImage}"</img>
            <p>Artist Name: ${artpiece.artistDisplayName}</p>
            <p>Artist Nationality: ${artpiece.artistNationality}</p>
            <p>Dimensions: ${artpiece.dimensions}</p>
            <p>Department: ${artpiece.department}</p>
            <p>Medium: ${artpiece.medium}</p>
        </div>
    `
  
    divContainer.insertAdjacentHTML("beforeend", divInfo);
    openModal()
}


const openModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'block'
  }
  
  const closeModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'none'
  }

 
 