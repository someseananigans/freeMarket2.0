

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

const elem3 = document.getElementById('pageModal');
const instance3 = M.Modal.init(elem3, {
  dismissible: true,
  inDuration: 300, // Transition in duration
  outDuration: 300
});

document.getElementById('navbarSearch').addEventListener('input', event => {
  if (document.getElementById('navbarSearch').value) {
    axios.get(`/api/listings/search/${document.getElementById('navbarSearch').value.toLowerCase()}`)
      .then(({ data: listings }) => {
        document.getElementById('spaceOne').innerHTML = `<h3>Search Results: <span>${document.getElementById('navbarSearch').value}</span></h3><ul class="pagination" id="pages"></ul>`
        document.getElementById('listings').innerHTML = ''
        listings.forEach(listing => {
          const searchElem = document.createElement('div')
          searchElem.className = 'col s12 m4 l3 xl3'
          searchElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="center card-title">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(searchElem)
        })
      })
      .catch(err => console.error(err))
  } else {
    getListings()
  }
})

document.getElementById('sidebarSearch').addEventListener('input', event => {
  if (document.getElementById('sidebarSearch').value) {
    axios.get(`/api/listings/search/${document.getElementById('sidebarSearch').value.toLowerCase()}`)
      .then(({ data: listings }) => {
        document.getElementById('spaceOne').innerHTML = `<h3>Search Results: <span>${document.getElementById('sidebarSearch').value}</span></h3><ul class="pagination" id="pages"></ul>`
        document.getElementById('listings').innerHTML = ''
        listings.forEach(listing => {
          const searchElem = document.createElement('div')
          searchElem.className = 'col s12 m4 l3 xl3'
          searchElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="center card-title">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(searchElem)
        })
      })
      .catch(err => console.error(err))
  } else {
    getListings()
  }
})

document.querySelector("input")
  .addEventListener('change', (e) => {
    console.log(e.currentTarget.value);
  });

document.addEventListener('click', event => {

  const pageCount = document.getElementById('pageNumber') && document.getElementById('pageNumber').dataset.pages
  let currentPage = document.getElementById('pageNumber') && parseInt(document.getElementById('pageNumber').value.split(' ')[0])

  // open pagination modal
  if (event.target.id == 'pageNumber') {
    document.getElementById('pageModal').innerHTML = `
      <div id="pageDrop" class="pageDrop">
        <h5>Jump to page</h5>
        <input
        type="number"
        max=${pageCount} 
        min=1 x
        value=${currentPage} 
        class="pageInput"
        id="modalInput"
        >
        <div class="btnBox">
          <button id="pageJump" class="modalBtn">Jump</button>
          <button id="cancel" class="modalBtn gray">Cancel</button>
        </div>
      </div>
    `
    instance3.open()
  }

  // jump button handler
  if (event.target.id == 'pageJump') {
    let page = document.getElementById('modalInput').value
    currentPage != page ? getListings(page) : instance3.close()

    currentPage = page
    document.getElementById('pageNumber').value = `${currentPage} of ${pageCount}`

    document.getElementById('right').className = currentPage >= pageCount ? 'disabled' : 'waves-effect'
    document.getElementById('left').className = currentPage <= 1 ? 'disabled' : 'waves-effect'

    instance3.close()
  }

  // cancel button handler
  if (event.target.id == 'cancel') instance3.close()

  // right button handler
  if (event.target.parentNode.id == 'right') {
    if (event.target.parentNode.className == 'waves-effect' && currentPage < pageCount) {
      currentPage++
      document.getElementById('pageNumber').value = `${currentPage} of ${pageCount}`
      getListings(currentPage)
    }
  }

  // left button handler
  if (event.target.parentNode.id == 'left') {
    if (event.target.parentNode.className == 'waves-effect' && currentPage > 0) {
      currentPage--
      document.getElementById('pageNumber').value = `${currentPage} of ${pageCount}`
      getListings(currentPage)
    }
  }

  // disabled/eneble handling
  if (document.getElementById('right')) {
    document.getElementById('right').className = currentPage >= pageCount ? 'disabled' : 'waves-effect'
  }
  if (document.getElementById('left')) {
    document.getElementById('left').className = currentPage <= 1 ? 'disabled' : 'waves-effect'
  }





  // category search
  let categoryID = event.target.id

  let categories = ['automotive', 'household', 'decor', 'apparel', 'accessories', 'technology', 'pet', 'random']

  if (categories.includes(categoryID)) {
    axios.get(`/api/listings/category/${categoryID}`)
      .then(({ data: listings }) => {
        document.getElementById('spaceOne').innerHTML = `<h3 class="category">${categoryID}</h3>`
        document.getElementById('listings').innerHTML = ``
        listings.forEach(listing => {
          const categoryElem = document.createElement('div')
          categoryElem.className = 'col s12 m4 l3 xl3'
          categoryElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="cardModal" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="center card-title">${listing.title}</h3>
              </div>
            </div>
          `
          document.getElementById('listings').append(categoryElem)
        })
      })
      .catch(err => console.error(err))
  }

  // signOut
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


  if (id !== '') {
    // send to new page (fuck modals)

    let url = `./listing.html?id=${encodeURIComponent(id)}`
    document.location.href = url

    // if (localStorage.getItem('token')) {

    //   axios.get(`/api/listings/id/${id}`)
    //     .then(({ data: listing }) => {
    //       document.getElementById('listFull').innerHTML = `
    //     <div class="row center">
    //     <p id="listImage"><img src="${listing.image}" height="175px" width="auto"></p>
    //     </div>
    //       <div class="row">
    //       <h4 id="listTitle">${listing.title}</h4>
    //       </div>
    //       <div class="row">
    //       <p id="listDesc">${listing.description}</p>
    //       </div>
    //       <a href="mailto:${listing.User.email}">
    //       <button class="btn modal-close waves-effect yellow darken-3" type="email" name="action">
    //       <i class="material-icons right">email</i>
    //       </button>
    //       </a>
    //       `

    //       instance.open();
    //     })
    //     .catch(err => console.log(err))
    // } else {
    //   instance2.open()
    // }
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