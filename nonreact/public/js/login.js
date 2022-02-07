// For phone number formatting
let cleave = new Cleave(document.getElementById('phoneS'), {
  phone: true,
  phoneRegionCode: 'US'
})


document.getElementById("passwordL").addEventListener("keyup", event => {
  event.preventDefault()
  if (event.keyCode === 13) {
    document.getElementById('login').click()
  }
})

document.getElementById("passwordS").addEventListener("keyup", event => {
  event.preventDefault()
  if (event.keyCode === 13) {
    document.getElementById('signUp').click()
  }
})

document.getElementById('signUp').addEventListener('click', event => {

  let newUser = {
    name: document.getElementById('nameS').value,
    phone: document.getElementById('phoneS').value,
    username: document.getElementById('usernameS').value,
    password: document.getElementById('passwordS').value,
    email: document.getElementById('emailS').value
  }

  axios.post('/api/user/register', newUser)
    .then(({ data }) => {
      if (data.user) {
        localStorage.setItem('token', data.user)
        window.location = '/'
      } else {
        data.status.name && document.getElementById('nameS').classList.add('invalid')
        document.getElementById('invalidName').innerHTML = data.status.name

        data.status.email && document.getElementById('emailS').classList.add('invalid')
        data.status.email && document.getElementById('emailS').classList.remove('valid')
        document.getElementById('invalidEmail').innerHTML = data.status.email

        data.status.phone && document.getElementById('phoneS').classList.add('invalid')
        document.getElementById('invalidPhone').innerHTML = data.status.phone


        data.status.username && document.getElementById('usernameS').classList.add('invalid')
        data.status.username && document.getElementById('usernameS').classList.remove('valid')
        document.getElementById('invalidUser').innerHTML = data.status.username

        data.status.password && document.getElementById('passwordS').classList.add('invalid')

        document.getElementById('invalidPassword').innerHTML = data.status.password

      }
      console.log(data)
    })
    .catch(err => console.log(err))
})

document.getElementById('login').addEventListener('click', event => {
  axios.post('/api/user/login', {
    username: document.getElementById('usernameL').value,
    password: document.getElementById('passwordL').value
  })
    .then(({ data: token }) => {
      if (token.user) {
        localStorage.setItem('token', token.user)
        window.location = '/'
      } else {
        document.getElementById('invalid').innerHTML = "Username and/or Password were incorrect. Please try again."
        document.getElementById('usernameL').classList.add('invalid')
        document.getElementById('passwordL').classList.add('invalid')
      }
    })
    .catch(err => console.log(err))
})

