import { Navbar } from '../components'
// import '../index.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../utils/Context/';
import { useHistory } from 'react-router-dom'
import { User } from '../utils/API'

const Home = () => {
  const { customer, setCustomer } = useContext(UserContext)

  const history = useHistory()
  // const [state, setState] = useState(false)
  // const toggleDraw = () => setState(!state)



  const capFirst = (name) => {
    const names = name.split(' ')
    for (let index = 0; index < names.length; index++) {
      names[index] = names[index][0].toUpperCase() + names[index].slice(1)
    }
    return names.join(' ')
  }



  return (
    <>

      <Navbar />
      {customer.name && <h1 onClick={console.log(customer)}>{'Welcome back, ' + capFirst(customer.name)}</h1>}

    </>
  )
}

export default Home