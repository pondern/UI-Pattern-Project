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
                <div>
                    <img src="${img.primaryImage}" alt="${img.title}" />
                </div>
            `

            container.insertAdjacentHTML("beforeend", html)
        }
    })
}

const openModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'block'
  }
  
  const closeModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'none'
  }

  const processArtData = (data) => {
    const charactersArr = data.results

    charactersArr.forEach((character)=>{
        const characterHTML = `
            <div class="character">
                <img src="${character.image}" alt="${character.name}" data-id="${character.id}">
            </div>
        `

        charactersContainer.insertAdjacentHTML("beforeend", characterHTML)
    })

    const characterDivs = document.querySelectorAll(".character")

    characterDivs.forEach((characterDiv) => {
        characterDiv.addEventListener("click", handleClick)
    })
}

function handleClick(e){
    const id = e.target.dataset.id
    fetch(`${baseURL}/${id}`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        const modalTitle = document.querySelector("#modal-title")
        const modalImg = document.querySelector("#modal-image")
        const descriptionPTage = document.querySelector("#modal-description")

        modalTitle.innerText = res.name
        modalImg.src = res.image
        descriptionPTage.innerText = res.status
        openModal()
    })
}