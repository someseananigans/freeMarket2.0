import {
  Route,
  Switch
} from 'react-router-dom'
import { Home, Auth } from './pages'

import { createTheme, ThemeProvider } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <div id="main">
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route exact path='/auth' >
            <Auth />
          </Route>
          {/* <Page404 /> */}
        </Switch>
      </div>
    </ThemeProvider>
  )
}

export default App
