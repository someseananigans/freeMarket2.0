import { } from '../components'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

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
          helperText={fieldError.login && "Please enter your Username/Email"}
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
          helperText={fieldError.passowrd && "Please enter your Password"}
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (!newAuthState) {
      setFieldError({
        ...fieldError,
        login: data.get('login') === "" && true,
        password: data.get('password') === "" && true
      })
      console.log({
        login: data.get('login'),
        password: data.get('password'),
      })
    } else {
      setFieldError({
        ...fieldError,
        email: data.get('email') === "" && true,
        username: data.get('username') === "" && true,
        password: data.get('password') === "" && true,
        name: data.get('name') === "" && true
      })
      console.log({
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name'),
        phone: data.get('phone'),
        username: data.get('username')
      })
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


