const baseURL = 'https://rickandmortyapi.com/api/character'
const charactersContainer = document.querySelector(".characters-container")

// Fetch data from the API
fetch(baseURL)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    // Handle the data from the API here
    processCharacterData(data)
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error)
  })

const processCharacterData = (data) => {
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

// Function to open the modal
const openModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'block'
  }
  
  // Function to close the modal
  const closeModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = 'none'
  }


