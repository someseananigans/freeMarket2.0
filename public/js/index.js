

// prepares and populates listings in recent listins space
getListings()
// checks if user is logged or not and populates nav accordingly
status()

// modal configurations and setup
const elem = document.getElementById('cardModal');
const instance = M.Modal.init(elem, {
  dismissible: true,
  inDuration: 300, // Transition in duration
  outDuration: 300
});

const elem2 = document.getElementById('lockedModal')
const instance2 = M.Modal.init(elem2, {
  dismissible: true,
  inDuration: 300, // Transition in duration
  outDuration: 300
});

document.getElementById('navbarSearch').addEventListener('input', event => {
  console.log('hit')
  if (document.getElementById('navbarSearch').value) {
    axios.get(`/api/listings/search/${document.getElementById(navbarSearch).value.toLowerCase()}`)
      .then(({ data: listings }) => {
        document.getElementById('listings').innerHTML = `<h3>Search Results: <span>${document.getElementById('navbarSearch').value}</span></h3>`
        listings.forEach(listing => {
          const searchElem = document.createElement('div')
          searchElem.classname = 'col s12 m4 l3 xl3'
          searchElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="card-title center cardTitle">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(searchElem)
        })
      })
      .catch(err => console.error(err))
  } else {
    loadUtil.getListings()
  }
})

document.getElementById('sidebarSearch').addEventListener('input', event => {
  if (document.getElementById('sidebarSearch').value) {
    axios.get(`/api/listings/search/${document.getElementById(sidebarSearch).value.toLowerCase()}`)
      .then(({ data: listings }) => {
        document.getElementById('listings').innerHTML = `<h3>Search Results: <span>${document.getElementById('sidebarSearch').value}</span></h3>`
        listings.forEach(listing => {
          const searchElem = document.createElement('div')
          searchElem.classname = 'col s12 m4 l3 xl3'
          searchElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="card-title center cardTitle">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(searchElem)
        })
      })
      .catch(err => console.error(err))
  } else {
    loadUtil.getListings()
  }
})


document.addEventListener('click', event => {

  let categoryID = event.target.id

  let categories = ['automotive', 'household', 'decor', 'apparel', 'accessories', 'technology', 'pet', 'random']

  if (categories.includes(categoryID)) {
    axios.get(`/api/listings/category/${categoryID}`)
      .then(({ data: listings }) => {
        document.getElementById('listings').innerHTML = `<h3>${categoryID}</h3>`
        listings.forEach(listing => {
          const categoryElem = document.createElement('div')
          categoryElem.className = 'col s12 m4 l3 xl3'
          categoryElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="card-title center cardTitle">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(categoryElem)
        })
      })
      .catch(err => console.error(err))
  }

  if ((event.target.classList.contains('signOut')) && (localStorage.getItem('token'))) {
    localStorage.removeItem('token')
    window.location = './index'
  }

  let id = ''
  if (event.target.className == 'modal-overlay') {

  }
  if (event.target.parentNode.parentNode.classList.contains('listings')) {
    id = event.target.parentNode.parentNode.dataset.id
    console.log(id)
  }
  if (event.target.parentNode.classList.contains('listings')) {
    id = event.target.parentNode.dataset.id
    console.log(id)
  }
  if (event.target.classList.contains('listings')) {
    id = event.target.dataset.id
    console.log(id)
  }
  // modal for logic
  if (id !== '') {

    if (localStorage.getItem('token')) {
      console.log(id)
      axios.get(`/api/listings/id/${id}`)
        .then(({ data: listing }) => {
          document.getElementById('listFull').innerHTML = `
        <div class="row center">
        <p id="listImage"><img src="${listing.image}" height="175px" width="auto"></p>
        </div>
          <div class="row">
          <h4 id="listTitle">${listing.title}</h4>
          </div>
          <div class="row">
          <p id="listDesc">${listing.description}</p>
          </div>
          <a href="mailto:${listing.User.email}">
          <button class="btn modal-close waves-effect yellow darken-3" type="email" name="action">
          <i class="material-icons right">email</i>
          </button>
          </a>
          `

          instance.open();
        })
        .catch(err => console.log(err))
    } else {
      instance2.open()
    }
  }

  // if (localStorage.getItem('token')) {
  //   if (event.target.parentNode.classList.contains('listings')) {
  //     let id = event.target.parentNode.dataset.id
  //   }
  //   else if (event.target.classList.contains('listings')) {
  //     let id = event.target.dataset.id
  //   }
  //   // modal for listings
  //   axios.get(`/api/listings/id/${id}`)
  //     .then(({ data: listing }) => {
  //       document.getElementById('listFull').innerHTML = `
  //         <div class="row center">
  //           <p id="listImage"><img src="${listing.image}" height="175px" width="auto"></p>
  //         </div>
  //         <div class="row">
  //           <h4 id="listTitle">${listing.title}</h4>
  //         </div>
  //         <div class="row">
  //           <p id="listDesc">${listing.description}</p>
  //         </div>
  //         <a href="mailto:${listing.User.email}">
  //           <button class="btn modal-close waves-effect yellow darken-3" type="email" name="action">
  //             <i class="material-icons right">email</i>
  //           </button>
  //         </a>
  //       `
  //     })
  //     .catch(err => console.log(err))
  // }
  // else if ((event.target.parentNode.classList.contains('listings')) && (!localStorage.getItem('token'))) {

  //   // if you click on listing without logging in --> this happens
  //   // add model popup instead of ./login 
  //   // needs login in order to view xyz content
  //   // window.location = './login'
  // }
})