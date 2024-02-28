// create map
const map = L.map('map').setView([-27.2202101, -49.6457065], 15)

// create and add titleLayer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon
const icon = L.icon({
  iconUrl: './public/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68]
})

let marker

// create and add marker
map.on('click', event => {
  const lat = event.latlng.lat
  const lng = event.latlng.lng

  document.querySelector('[name=lat]').value = lat
  document.querySelector('[name=lng]').value = lng

  // remove icon
  marker && map.removeLayer(marker)

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map)
})

// add photo field
function addPhotoField() {
  // container of photos
  const container = document.querySelector('#images')

  // duplicate .new-upload
  const fieldsContainer = document.querySelectorAll('.new-upload')

  // image clone
  const newFieldContainer =
    fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

  // verify if field is empty, if returns yes, don't add
  const input = newFieldContainer.children[0]

  if (input.value == '') {
    return
  }

  // clean field
  input.value = ''

  // add image clone to container #images
  container.appendChild(newFieldContainer)
}

function deleteField(event) {
  const span = event.currentTarget

  const fieldsContainer = document.querySelectorAll('.new-upload')

  if (fieldsContainer.length < 2) {
    // clean field
    span.parentNode.children[0].value = ''
    return
  }

  // delete field
  span.parentNode.remove()
}

// select yes or no
function toggleSelect(event) {
  // remove .active in the clicked button
  document.querySelectorAll('.button-select button').forEach(button => {
    button.classList.remove('active')
  })

  // add .active
  const button = event.currentTarget
  button.classList.add('active')

  // update input hidden with selected value
  const input = document.querySelector('[name="open_on_weekends"]')

  input.value = button.dataset.value
}
