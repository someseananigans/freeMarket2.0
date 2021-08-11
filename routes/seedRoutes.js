const router = require('express').Router()
const { User } = require('../models')
const { Listing } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

let users = [
  {
    name: "Sean",
    email: "SeanDoe@gmail.com",
    username: "Sean",
    password: "Admin"
  },
  {
    name: "Joseph",
    email: "JosephDoe@gmail.com",
    username: "Joseph",
    password: "Admin"
  },
  {
    name: "Kyle",
    email: "KyleDoe@gmail.com",
    username: "Kyle",
    password: "Admin"
  },
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
    title: 'Washer and Dryer Machine',
    description: '1 Year old Washer and Dryer. No damages and in pristine condition. We were gifted a new matching set for our wedding, so we are looking for new owners for these bad boys.',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fwasher.jpg?alt=media&token=97d1ac3d-4de2-4825-aa3f-461ac7b46681',
    category: "household",
    uid: 1
  },
  {
    title: 'Dog Food',
    description: 'Our dog has grown out of this type of dog food. It expires 04/21/2022.',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fpetfood.jpg?alt=media&token=f56c0caf-b3d8-4852-96d9-501586b49b11',
    category: "pet",
    uid: 1
  },
  {
    title: 'Tide Pods',
    description: 'Tid Pods! Get your Tide Pods!! Really trying to get rid of these bad boys after my baby almost ate it. Do not plan on being a baby killer',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Ftidepods.jpg?alt=media&token=98b63c15-c077-45f8-bc30-3d5654abf363',
    category: "household",
    uid: 1
  },
  {
    title: 'Build-a-Pool',
    description: 'Ya know.... That pool thing that every family that will neer have an actual pool gets~',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fpool.jpg?alt=media&token=48f20d35-7ab5-41dd-8072-171857a55a5f',
    category: "random",
    uid: 1
  },
  {
    title: 'Venza',
    description: 'Prestine condition venza. Considering bids/best offer',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fvenza.jpg?alt=media&token=27c895ca-88aa-42ff-886d-79f284ff75c1',
    category: "automotive",
    uid: 2
  },
  {
    title: 'Purse',
    description: 'I really want to get rid of this thing before my wife realizes I took it',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fpurse.jpg?alt=media&token=044b01b4-8caf-403a-8c90-ed45b232ac0d',
    category: "accessories",
    uid: 2
  },
  {
    title: 'P5 Controller',
    description: 'Up for grabs by best offer',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fp5%20controller.jpg?alt=media&token=b2dee78a-3bfc-44ed-9c5d-7a7599684491',
    category: "technology",
    uid: 2
  },
  {
    title: 'Fake Nails',
    description: 'My wife is aiming to be more natural, so she no longer needs this nail set',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fnails.jpg?alt=media&token=7c926e54-369d-4613-a117-1ca5640fc0d5',
    category: "random",
    uid: 2
  },
  {
    title: 'Mustang',
    description: 'Looking for an offer on this beauty',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fmustang.jpg?alt=media&token=37d53d63-4d87-44fb-87df-24752cf0c770',
    category: "automotive",
    uid: 3
  },
  {
    title: 'Golf Bag',
    description: 'Still in pretty good condition. Black leather',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fgolfbag.jpg?alt=media&token=41413b8e-220e-4525-b764-77f8ef3711cb',
    category: "random",
    uid: 3
  },
  {
    title: 'Lebraun Lakers Funko Pop',
    description: 'I got a spare. It has some box damage, but still in good condition. Free or first offer by the end of march.',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Ffunkopop.jpg?alt=media&token=f2a48ba4-8e3c-4ceb-97da-8953a5e69ab5',
    category: "random",
    uid: 3
  },
  {
    title: 'Fridge',
    description: 'Heavy duty stainless steal fridgerator',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Ffridge.jpg?alt=media&token=2f7aa91c-a1a9-4867-bf81-a148bbc933c2',
    category: "household",
    uid: 3
  },
  {
    title: `Woman's Coat`,
    description: 'Size medium button up coat',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fcoat.jpg?alt=media&token=334f37dc-0263-4782-980d-17cb80c8a9a0',
    category: "apparel",
    uid: 4
  },
  {
    title: 'Blue Couch',
    description: '2 set blue couch. Comes in a 3 seater and a 2 seater.',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fcouch.jpg?alt=media&token=ccd2c913-a515-41da-94e9-ccfcaafc9c21',
    category: "decor",
    uid: 4
  },
  {
    title: 'Kia',
    description: 'I steal cars and give them away',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fcivic.jpg?alt=media&token=0eb166b5-aa2f-4c29-be09-64bbef67c03e',
    category: "automotive",
    uid: 4
  },
  {
    title: 'Bird Cage',
    description: 'After watching bird cage.... I freed my birds',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fbirdcage.jpg?alt=media&token=ca2475b1-071d-4321-8f54-cbaafe8d668c',
    category: "random",
    uid: 4
  },
  {
    title: 'This  Little Poopers',
    description: `My hubby has been too stressed from work and we can't make time to care for him. Looking for someone who can give him the attention he needs.`,
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fuhoh.jpg?alt=media&token=9887837a-6a25-4657-b656-7f8c95ba8dc0',
    category: "pet",
    uid: 5
  },
  {
    title: 'El Pablo',
    description: `He's all grown up (9 months old). Accepting offers until the end of April.`,
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fbigboy.jpg?alt=media&token=cdd95590-3a44-4139-8e1e-65485bfc92a4',
    category: "pet",
    uid: 5
  },
  {
    title: 'Cute Shiba',
    description: 'Looking for a new owner who can love him as much as we do.',
    image: 'https://firebasestorage.googleapis.com/v0/b/freemarket-3263e.appspot.com/o/images%2Fmommy.jpg?alt=media&token=baad96e2-ab70-4c15-806c-e606ef5a531a',
    category: "pet",
    uid: 5
  }
]

// users and listings table must be dropped first for seed to work
// seed users and than seed listings
// router.post('/users', passport.authenticate('jwt'), (req, res) => {
//   if (req.user.isAdmin) {
//     User.destroy({ where: {} })
//       .then(() => {
//         for (let i = 0; i < users.length; i++) {
//           let { name, email, username } = users[i]
//           User.register(new User({ name, email, username }), users[0].password, err => {
//             if (err) { console.log(err) }
//             res.sendStatus(200)
//           })
//         }
//       })
//       .catch(err => console.log(err))
//   }
//   else {
//     res.json({
//       status: 401,
//       message: 'Unauthorized: Admin access only'
//     })
//     return
//   }
// })

router.post('/users', (req, res) => {
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
})


router.post('/listings', (req, res) => {
  Listing.destroy({ where: {} })
    .then(() => {
      listings.forEach(listing => {
        listing.title = listing.title.toLowerCase()
      });
      Listing.bulkCreate(listings)
        .then(() => {
          res.sendStatus(200)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router