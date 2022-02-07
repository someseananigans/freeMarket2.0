const hAuth = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem('user')}`
}

const hNorm = {
  "Content-Type": "application/json",
}

const User = {
  getCurrent: () => fetch('/api/user/info', {
    method: 'GET',
    headers: hAuth
  })
    .then(response => response.json()),
  getAll: () => fetch('/api/users', {
    method: 'GET',
    headers: hNorm
  })
    .then(response => response.json()),
  getUser: (uid) => fetch(`/api/user/${uid}`, {
    method: 'GET',
    headers: hNorm
  }),
  login: (login) => fetch('/api/user/login', {
    method: 'POST',
    headers: hNorm,
    body: JSON.stringify(login)
  })
    .then(response => response.json()),
  register: (register) => fetch('/api/user/register', {
    method: 'POST',
    headers: hNorm,
    body: JSON.stringify(register)
  })
    .then(response => response.json()),
  update: (update) => fetch('/api/user', {
    method: 'PUT',
    headers: hAuth,
    body: JSON.stringify(update)
  }),
  delete: () => fetch('/api/user', {
    method: 'DELETE',
    headers: hAuth
  })
}

export default User
