import {
  Route,
  Switch
} from 'react-router-dom'
import { Home, Auth, Listing, CreateListing } from './pages'

import { useState } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from './utils/Context/'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const [customer, setCustomer] = useState({})
  const value = { customer, setCustomer }


  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={darkTheme}>
        <div id="main">
          <Switch>
            <Route exact path='/' >
              <Home />
            </Route>
            <Route exact path='/auth' >
              <Auth />
            </Route>
            <Route exact path='/listing/new' >
              <CreateListing />
            </Route>
            <Route exact path='/search/:username' component={Listing} />
            {/* <Page404 /> */}
          </Switch>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
