

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

let token = localStorage.getItem('token')
console.log(token)

axios.get('api/user/auth', {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(({ data }) => {
    document.getElementById('nameU').value = data.name
    document.getElementById('activeN').classList.add('active')
    document.getElementById('emailU').value = data.email
    document.getElementById('activeE').classList.add('active')
    document.getElementById('usernameU').value = data.username
    document.getElementById('activeU').classList.add('active')
    document.getElementById('phoneU').value = data.phone
    document.getElementById('activeP').classList.add('active')
  })
  .catch(err => console.log(err))

document.getElementById('editBtn').addEventListener('click', event => {
  document.getElementById('items').innerHTML = `<h1 style="text-align: center; font-weight: 100; color: #1e88e5;">My Profile</h1>
        <div class="card-panel">
          <div class="row">
            <div class="itemName input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="nameU" type="text" class="validate">
              <label id="activeN" for="nameU">Name</label>
            </div>
          </div>
          <div class="row">
            <div class="itemName input-field col s12">
              <i class="material-icons prefix">email</i>
              <input id="emailU" type="email" class="validate">
              <label id="activeE" for="emailU">Email</label>
              <div id="invalidEmail"></div>
            </div>
          </div>
          <div class="row">
            <div class="itemName input-field col s12">
              <i class="material-icons prefix">phone</i>
              <input id="phoneU" type="tel" class="validate">
              <label id="activeP" for="phoneU">Phone Number</label>
            </div>
          </div>
          <div class="row">
            <div class="itemName input-field col s12">
              <i class="material-icons prefix">create</i>
              <input id="usernameU" type="text" class="validate">
              <label id="activeU" for="usernameU">Username</label>
              <div id="invalidUser"></div>
            </div>
          </div>
          <button class="waves-effect yellow darken-3 btn" type="submit" name="action" id="updateProfile">Save
            <i class="material-icons right">send</i>
          </button>
        </div>`
  // For phone number formatting
  let cleave = new Cleave(document.getElementById('phoneU'), {
    phone: true,
    phoneRegionCode: 'US'
  })
  axios.get('api/user/auth', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(({ data }) => {
      document.getElementById('nameU').value = data.name
      document.getElementById('activeN').classList.add('active')
      document.getElementById('emailU').value = data.email
      document.getElementById('activeE').classList.add('active')
      document.getElementById('usernameU').value = data.username
      document.getElementById('activeU').classList.add('active')
      document.getElementById('phoneU').value = data.phone
      document.getElementById('activeP').classList.add('active')

      let currentUsername = data.username

      document.getElementById('updateProfile').addEventListener('click', event => {
        axios.get('/api/usernames')
          .then(({ data: usernames }) => {

            let token = localStorage.getItem('token')
            let auth = {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
            let update = {
              name: document.getElementById('nameU').value,
              email: document.getElementById('emailU').value,
              phone: document.getElementById('phoneU').value
            }

            if (!validateEmail(document.getElementById('emailU').value)) {
              document.getElementById('invalidEmail').innerHTML = 'Invalid email'
            }
            axios.get('api/user/auth', {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
              .then(({ data }) => {
                // confirms that username doesn't already exist 
                if ((!usernames.includes(document.getElementById('usernameU').value)) || (document.getElementById('usernameU').value == currentUsername)) {
                  update.username = document.getElementById('usernameU').value
                } else {
                  document.getElementById('invalidUser').innerHTML = 'Username already exists'
                  document.getElementById('usernameU').classList.add('invalid')
                }
                // updates user if username is unique and email is valid
                if (validateEmail(update.email) && update.username) {
                  axios.put('/api/user', update, auth)
                    .then(() => {
                      window.location = '/profile'
                    })
                    .catch(err => console.log(err))
                }
              })
              .catch(err => console.log(err))
          })
      })
    })
    .catch(err => console.log(err))
})




