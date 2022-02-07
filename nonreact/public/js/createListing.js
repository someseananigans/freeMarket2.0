const axios = window.axios
// ----> set variables within the .env <----
const firebaseConfig = {
  apiKey: "AIzaSyAGOsAOTXtMr-AS0DGHL_1dyctsn4iA0mo",
  authDomain: "freemarket-3263e.firebaseapp.com",
  projectId: "freemarket-3263e",
  storageBucket: "freemarket-3263e.appspot.com",
  databaseURL: "https://freemarket-3263e.firebaseio.com",
  messagingSenderId: "623455406150",
  appId: "1:623455406150:web:0f8d92b06ff3902fd16247",
  measurementId: "G-ZSJ89JVWDF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let imageUrl = ''

document.getElementById('createItem').addEventListener('click', event => {
  event.preventDefault()
  let item = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    image: imageUrl,
    category: document.getElementById('category').value
  }
  let token = localStorage.getItem('token')
  axios.post('/api/listings', item, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(() => {
      imageUrl = ''
      window.location = '/profile'
    })
    .catch(err => console.error(err))
})

// firebase file upload
document.getElementById('fileButton').addEventListener('change', event => {
  console.log('ping')
  let file = event.target.files[0]
  let newName = 'Free' + Date.now()
  let storageRef = firebase.storage().ref('images/')
  // 'images/' + file.name
  let imageRef = storageRef.child(newName)
  // let task = storageRef.put(file)
  let task = imageRef.put(file)
  // update status bar
  task.on('state_changed',
    function progress(snapshot) {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      document.getElementById('uploader').value = percentage
    },
    function error(err) { console.log(err) },
    function complete() {
      imageRef.getDownloadURL()
        .then((url) => {
          console.log(url)
          imageUrl = url
        })
        .catch(err => console.log(err))
    }
  )
})

