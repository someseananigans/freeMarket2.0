const Listing = require('./Listing.js')
const User = require('./User.js')

let users = [
  {
    name: "John Doe",
    email: "johnDoe@gmail.com",
    username: "JJJDoe",
    password: "M3rrrrrr"
  },
  {
    name: "Jane Doe",
    email: "janeDoe@gmail.com",
    username: "janeDoe",
    password: "Mist3rrrrrr"
  },
  {
    name: "Jim Doe",
    email: "jimDoe@gmail.com",
    username: "JimDoe",
    password: "Jeeberrrrrr"
  },
  {
    name: "Jamie Doe",
    email: "jamieDoe@gmail.com",
    username: "JamieDoe",
    password: "j33b3rrrrrr"
  }
]

let listings = [
  {
    title: 'item1',
    description: 'description',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2FFree2021?alt=media&token=24ee4eb0-6a19-4c57-b043-8c874f98c424',
    uid: 1
  },
  {
    title: 'item2',
    description: 'description',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2FFree1616523445770?alt=media&token=aae0eff9-ba98-435a-a407-214ba70bbd09',
    uid: 2
  },
  {
    title: 'item3',
    description: 'description',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2FFree1616523428519?alt=media&token=af8ea66e-629d-40be-b9d0-d859247baf11',
    uid: 3
  },
  {
    title: 'item4',
    description: 'description',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2FFree1616522923798?alt=media&token=891c0a3a-3fdb-4d2f-8324-ac75457786eb',
    uid: 1
  }
]

// users and listings table must be dropped first for seed to work
// seed users and than seed listings
User.destroy({ where: {} })
  .then(() => {
    for (let i = 0; i < users.length; i++) {
      let { name, email, username } = users[i]
      User.register(new User({ name, email, username }), users[0].password, err => {
        if (err) { console.log(err) }
        res.sendStatus(200)
      })
    }
  })
  .catch(err => console.log(err))

Listing.destroy({ where: {} })
  .then(() => {
    Listing.bulkCreate(listings)
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))