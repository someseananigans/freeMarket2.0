

const getListings = () => {
  console.log('hit')
  axios.get('/api/listings')
    .then(({ data: listings }) => {
      listings.forEach(listing => {
        const title = listing.title.charAt(0).toUpperCase() + listing.title.slice(1)
        const listingElem = document.createElement('div')
        listingElem.className = 'col s12 m4 l3 xl3'
        listingElem.innerHTML = `
        <div class="card hoverable listings modal-trigger" id="cardItem" data-target="modal1" data-id=${listing.id}>
        <div class="card-image" style="background-image: url(${listing.image})"></div>
        <div class="titleBox valign-wrapper">
              <h3 class="card-title center cardTitle">${listing.title}</h3>
              </div>
              </div>
              `
        document.getElementById('listings').append(listingElem)
      })
    })
    .catch(err => console.error(err))
}

const status = () => {
  console.log('hit')
  if (localStorage.getItem('token')) {
    // logged in user
    // main nav
    let signOut = document.createElement('li')
    signOut.innerHTML = `<a class="hide-on-small-only signOut" >Log Out</a>`

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

