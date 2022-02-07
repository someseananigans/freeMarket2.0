const hAuth = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem('user')}`
}

const hNorm = {
  "Content-Type": "application/json",
}

const Listing = {
  getCurrent: () => fetch('/api/user/listings', {
    method: 'GET',
    headers: hAuth
  })
    .then(response => response.json()),
  getUserListings: (uid) => fetch(`/api/listings/user/${uid}`, {
    method: 'GET',
    headers: hNorm
  })
    .then(response => response.json()),
  getAll: () => fetch('/api/listings', {
    method: 'GET',
    headers: hNorm
  })
    .then(response => response.json()),
  getIncrement: (position) => fetch(`/api/listings/${position}`, {
    method: 'GET',
    headers: hNorm
  })
    .then(response => response.json()),
  create: (info) => fetch('/api/listings', {
    method: 'POST',
    headers: hAuth,
    body: JSON.stringify(info)
  })
    .then(response => response.json()),
  update: (update, id) => fetch(`/api/listings/${id}`, {
    method: 'PUT',
    headers: hAuth,
    body: JSON.stringify(update)
  })
    .then(response => response.json()),
  delete: (id) => fetch(`/api/listings/${id}`, {
    method: 'DELETE',
    headers: hAuth
  })
    .then(response => response.json())
}

export default Listing
