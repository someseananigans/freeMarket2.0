const axios = window.axios
// ----> set variables within the .env <----
// const firebaseConfig = {
//   apiKey: "AIzaSyAGOsAOTXtMr-AS0DGHL_1dyctsn4iA0mo",
//   authDomain: "freemarket-3263e.firebaseapp.com",
//   projectId: "freemarket-3263e",
//   storageBucket: "freemarket-3263e.appspot.com",
//   databaseURL: "https://freemarket-3263e.firebaseio.com",
//   messagingSenderId: "623455406150",
//   appId: "1:623455406150:web:0f8d92b06ff3902fd16247",
//   measurementId: "G-ZSJ89JVWDF"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


// let imageUrl = ''
// // firebase file upload
// document.getElementById('fileButton').addEventListener('change', event => {
//   let file = event.target.files[0]
//   let newName = 'Free' + Date.now()
//   let storageRef = firebase.storage().ref('images/')
//   // 'images/' + file.name
//   let imageRef = storageRef.child(newName)
//   // let task = storageRef.put(file)
//   let task = imageRef.put(file)
//   // update status bar
//   task.on('state_changed',
//     function progress(snapshot) {
//       let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       document.getElementById('uploader').value = percentage
//     },
//     function error(err) { console.log(err) },
//     function complete() {
//       imageRef.getDownloadURL()
//         .then((url) => {
//           imageUrl = url
//         })
//         .catch(err => console.log(err))
//     }
//   )
// })

// page load
const getMyListings = () => {
  let token = localStorage.getItem('token')
  axios.get('/api/user/auth', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    // grabs all listings from user and posts in a card
    .then(({ data: { listings } }) => {
      document.getElementById('items').innerHTML = '<h3>My Listings</h3>'
      listings.forEach(listing => {
        let listingElem = document.createElement('div')
        listingElem.className = 'col s12 m6 l4 xl3'
        listingElem.innerHTML = `
              <div class="card hoverable listings cardItem" data-target="modal1" data-id=${listing.id}>
                <div class="card-image">
                <img src="${listing.image}" height="175px" width="auto">
                </div>
                <div class="listingTitle">
                <span class="card-title">${listing.title}</span>
                <div>
                <div class="myListingsBtn">
                 <a class="waves-effect waves-light btn modal-trigger editPost yellow darken-3" data-id=${listing.id}  href="#modal1">Edit Post</a>
          <a class="waves-effect waves-light btn deletePost yellow darken-3" data-id=${listing.id} href="#">Delete Post</a>
                </div>
          </div>
        `
        document.getElementById('items').append(listingElem)
      })
    })
    .catch(err => console.log(err))
}


const elem = document.getElementById('modal1');
const instance = M.Modal.init(elem, {
  dismissible: true,
  inDuration: 300, // Transition in duration
  outDuration: 300
});

// global event listener
document.addEventListener('click', event => {
  // edit post event listener
  if (event.target.classList.contains('editPost')) {
    const id = event.target.dataset.id
    axios.get(`/api/listings/id/${id}`)
      .then(({ data: listing }) => {
        document.getElementById('uTitle').value = listing.title
        document.getElementById('activeT').classList.add('active')
        document.getElementById('uDescription').value = listing.description
        document.getElementById('activeD').classList.add('active')
        document.getElementById('saveUpdate').dataset.id = id
        instance.open()
      })
      .catch(err => console.log(err))
  }
  // Save item update modal
  if (event.target.id === 'saveUpdate') {
    let token = localStorage.getItem('token')
    const id = event.target.dataset.id
    let update = ''
    if (imageUrl) {
      update = {
        title: document.getElementById('uTitle').value,
        description: document.getElementById('uDescription').value,
        image: imageUrl
      }
    } else {
      update = {
        title: document.getElementById('uTitle').value,
        description: document.getElementById('uDescription').value
      }
    }
    axios.put(`/api/listings/${id}`, update, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(() => {
        getMyListings()
      })
      .catch(err => console.log(err))
  }


  // delete post event listener
  if (event.target.classList.contains('deletePost')) {
    let token = localStorage.getItem('token')
    const id = event.target.dataset.id
    axios.delete(`api/listings/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(() => {
        event.target.parentNode.parentNode.remove()
      })
      .catch(err => console.error(err))
  }
  if (event.target.classList.contains('saveUpdate')) {
    const id = event.target.dataset.id
  }
})

getMyListings()


