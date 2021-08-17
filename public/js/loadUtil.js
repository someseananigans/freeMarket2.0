


const getListing = (id) => {
  axios.get(`/api/listings/id/${id}`)
    .then(({ data: listing }) => {
      console.log(listing)
    })
}

const status = () => {
  if (localStorage.getItem('token')) {
    // main nav
    let signOut = document.createElement('li')
    signOut.innerHTML = `<a class="hide-on-small-only signOut">Log Out</a>`

    let myProf = document.createElement('li')
    myProf.innerHTML = `<a class="hide-on-small-only" href="/myProfile">My Profile</a>`

    document.getElementById('navList').append(myProf)
    document.getElementById('navList').append(signOut)

    // side nav
    let signOut2 = document.createElement('li')
    signOut2.innerHTML = `<a class="hide-on-med-and-up signOut" >Log Out</a>`

    let myProf2 = document.createElement('li')
    myProf2.innerHTML = `<a class="hide-on-med-and-up" href="/myProfile">My Profile</a>`

    document.getElementById('slide-out').append(myProf2)
    document.getElementById('slide-out').append(signOut2)

  } else {
    // unlogged in user
    // main nav
    let signIn = document.createElement('li')
    signIn.innerHTML = `<a href="./login.html">SignUp/Login</a>`

    document.getElementById('navList').append(signIn)

    // side nav
    let signInS = document.createElement('li')
    signInS.innerHTML = `<a href="./login.html">SignUp/Login</a>`

    document.getElementById('slide-out').append(signInS)
  }
}

const getListings = (count) => {
  // api call to grab count of all listings
  // initial call also returns the first x amount of listings
  if (!count) { count = 1 }

  axios.get(`api/listings/${count}`)
    .then(({ data }) => {
      let limit = 5 // 20 listings per page (consistent with api)
      let pageCount = data.total / limit

      if (document.getElementById('pages').innerHTML.length < 100) {
        // pagination
        document.getElementById('pages').innerHTML = `
          <li class="disabled" id="left"><i class="material-icons">chevron_left</i></li>
          <input 
            id="pageNumber" 
            value='${count} of ${data.total / data.subtotal} '
            data-pages=${data.total / data.subtotal} 
            class="pageInput"
          >
          <li class="waves-effect" id="right"><i class="material-icons">chevron_right</i></li>
        `
      }


      // clear the listings' space
      document.getElementById('listings').innerHTML = ''
      // load listings onto page
      data.listings.forEach(listing => {
        const title = listing.title.charAt(0).toUpperCase() + listing.title.slice(1)
        const listingElem = document.createElement('div')
        listingElem.className = 'col s12 m4 l3 xl3'
        listingElem.innerHTML = `
            <div class="card hoverable listings modal-trigger" id="cardItem" data-target="modal1" data-id=${listing.id}>
              <div class="card-image" style="background-image: url(${listing.image})"></div>
              <div class="titleBox valign-wrapper">
                <h3 class="card-title center">${listing.title}</h3>
              </div>
            </div>
          `
        document.getElementById('listings').append(listingElem)
      })
    })


  // axios.get('/api/listings')
  //   .then(({ data: listings }) => {
  //     listings.forEach(listing => {
  //       const title = listing.title.charAt(0).toUpperCase() + listing.title.slice(1)
  //       const listingElem = document.createElement('div')
  //       listingElem.className = 'col s12 m4 l3 xl3'
  //       listingElem.innerHTML = `
  //         <div class="card hoverable listings modal-trigger" id="cardItem" data-target="modal1" data-id=${listing.id}>
  //           <div class="card-image" style="background-image: url(${listing.image})"></div>
  //           <div class="titleBox valign-wrapper">
  //             <h3 class="card-title center cardTitle">${listing.title}</h3>
  //           </div>
  //         </div>
  //       `
  //       document.getElementById('listings').append(listingElem)
  //     })
  //   })
  //   .catch(err => console.error(err))
}
