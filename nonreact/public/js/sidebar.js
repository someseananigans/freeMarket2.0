const elem5 = document.getElementById('listingModal');
const instance5 = M.Modal.init(elem5, {
  dismissible: true,
  inDuration: 300, // Transition in duration
  outDuration: 300
});



document.addEventListener('click', event => {
  // sidebar 
  if (event.target.id == 'editMyProfile') {
    window.location = '/myProfile'
  }
  if (event.target.id == 'createListing') {
    instance5.open()
  }
  if (event.target.id == 'myListings') {
    window.location = '/myListings'
  }
})

document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/login'
})