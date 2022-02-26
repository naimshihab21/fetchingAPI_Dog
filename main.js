// Promises
// 3 states : Pending, Fulfilled, Rejected

let url = 'https://dog.ceo/api/breeds/list/all'

let timer
let deleteFirstDelay

async function loadBreed() {
  try {
    let response = await fetch(url)
    let res = await response.json()
    getData(res.message)
  } catch(e) {
    console.log('There was a problem')
  }
}

loadBreed()

const selectInner = document.querySelector('#select')
function getData(breed) {
  selectInner.innerHTML = `
    <select onChange="loadByBreed(this.value)">
      <option>Choose a Image</option>
      ${Object.keys(breed).map(get => {
        return `<option>${get}</option>`
      }).join('')}
    </select>
  `
}

// ===== FUNCTION LOADBYBREED =====

async function loadByBreed(x) {
  if(x != 'Choose a Image') {
    const response = await fetch(`https://dog.ceo/api/breed/${x}/images`)
    const data = await response.json()
    createSlideShow(data.message)
  }
}

// ===== FUNCTION CREATESLIDESHOW =====

function createSlideShow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstDelay)
  
  if(images.length > 1) {
    document.querySelector('#img').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div> `

  currentPosition += 2
  if(images.length == 2) currentPosition = 0

  timer = setInterval(nextSlide, 3000)
  } else {
    document.querySelector('#img').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide"></div> `
  }

  // ===== FUNCTION NEXTSLIDE =====

  function nextSlide() {
    document.querySelector('#img').insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstDelay = setTimeout(function() {
      document.querySelector('.slide').remove()
    }, 1000)

    if(currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }

  }
}





