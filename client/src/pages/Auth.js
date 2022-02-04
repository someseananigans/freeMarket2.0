import { } from '../components'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography
} from '@mui/material'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { User } from '../utils'
import UserContext from '../utils/Context/UserContext';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {"2022"}
      {'.'}
    </Typography>
  );
}

const Login = ({ handleSubmit, toggleAuthState, fieldError }) => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Username/Email"
          name="login"
          autoComplete="login"
          autoFocus
          error={fieldError.login}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={fieldError.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={toggleAuthState}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  )
}

const Register = ({ handleSubmit, toggleAuthState, fieldError }) => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          error={fieldError.name}
          helperText={fieldError.name && "Please enter your Name"}
        />
        <TextField
          margin="normal"
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={fieldError.email}
          helperText={fieldError.email && "Please enter an Email"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          error={fieldError.username}
          helperText={fieldError.username && "Please enter a Username"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={fieldError.password}
          helperText={fieldError.password && "Please enter your Password"}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2" onClick={toggleAuthState}>
              {"Have an account? Login"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  )
}



const Auth = () => {
  const { customer, setCustomer } = useContext(UserContext)
  const history = useHistory()

  const [newAuthState, setNewAuthState] = useState(false)
  const [fieldError, setFieldError] = useState({
    login: false,
    password: false,
    email: false,
    username: false,
    name: false
  })

  const toggleAuthState = () => {
    console.log('test')
    setNewAuthState(!newAuthState)
  }

  const handleLogin = async (data) => {
    await User.login(data)
      .then(res => {
        if (res.login) {
          localStorage.setItem('user', res.user)
          // *** incorporate a logging in page transition ***
          // history.push('/')
          setCustomer(res.info)
          console.log(customer)
        } else {
          setFieldError({ ...fieldError, login: true, password: true })
          // create login failure notification
          console.log(res.message)
        }
      })
      .catch(err => console.log(err))
  }

  const handleRegister = (data) => {
    console.log('hit')
    User.login(data)
      .then(res => {

      })
      .catch(error => console.log(error))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (!newAuthState) {
      const data = {
        login: formData.get('login'),
        password: formData.get('password')
      }
      setFieldError({
        ...fieldError,
        login: data.login === "" && true,
        password: data.password === "" && true
      })
      // if formData exists attempt login
      if (data.login && data.password) { handleLogin(data) }
      console.log(data)
    } else {
      const data = {
        email: formData.get('email'),
        username: formData.get('username'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        pasword: formData.get('pasword')
      }
      setFieldError({
        ...fieldError,
        email: data.email === "" && true,
        username: data.username === "" && true,
        password: data.password === "" && true,
        name: data.name === "" && true
      })
      // if formData exists attempt register
      if (data.username && data.email && data.name && data.passowrd) { handleRegister(data) }
      console.log(data)
    }

  };

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container component="main" sx={{ height: 'fit-content', width: '1000px' }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            {newAuthState ? <Register handleSubmit={handleSubmit} toggleAuthState={toggleAuthState} fieldError={fieldError} /> : <Login handleSubmit={handleSubmit} toggleAuthState={toggleAuthState} fieldError={fieldError} />}


          </Box>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Auth


