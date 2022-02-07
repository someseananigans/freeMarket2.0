import { useState, useContext, useEffect } from 'react'
import {
  styled,
  alpha
} from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Stack,
  Button,
  Avatar
} from '@mui/material/';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  FavoriteBorder as FaveIcon,
  ChatBubbleOutline as ChatIcon,
  ShoppingCartOutlined as ShopIcon
} from '@mui/icons-material/';
import { Drawer } from '..';
import { UserContext } from '../../utils/Context/';
import { useHistory } from 'react-router-dom'
import { User } from '../../utils/API'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const IconButtonv2 = styled(IconButton)(({ theme }) => ({
  marginLeft: 0,
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const { customer, setCustomer } = useContext(UserContext)

  const loadCustomer = () => {
    User.getCurrent()
      .then(user => {
        setCustomer(user)
        console.log(user)
      })
      .catch(err => console.log(err))
  }

  const history = useHistory()
  const [drawer, setDrawer] = useState(false)
  const toggleDrawer = () => setDrawer(!drawer)


  useEffect(() => {
    console.log(customer)
    if (localStorage.getItem('user') && !customer.name) {
      loadCustomer()
    }

  }, []);


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', cursor: "pointer" } }}
              onClick={history.push('/')}
            >
              MUI
            </Typography>
            <Search sx={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Stack spacing={1} direction="row">
              <IconButtonv2>
                <FaveIcon
                  sx={{
                    height: '27px',
                    width: '27px'
                  }} />
              </IconButtonv2>
              <IconButtonv2>
                <ChatIcon
                  sx={{
                    height: '27px',
                    width: '27px'
                  }} />
              </IconButtonv2>
              <IconButtonv2>
                <ShopIcon
                  sx={{
                    height: '27px',
                    width: '27px'
                  }} />
              </IconButtonv2>

              <IconButtonv2>
                <Avatar
                  alt={customer.username}
                  src={customer.profile}
                  sx={{
                    height: '30px',
                    width: '30px'
                  }}
                  onClick={toggleDrawer} />
              </IconButtonv2>
              <Button onClick={() => history.push('/listing/new')} variant="contained" >List an Item</Button>
            </Stack>
            {/* <IconButtonv2
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 0, ml: 2 }}
              onClick={toggleDrawer}
            >
              <Badge badgeContent={17} color="error">
                <MenuIcon />
              </Badge>
            </IconButtonv2> */}
          </Toolbar>
        </AppBar>

      </Box>
      <Drawer
        open={drawer}
        toggle={toggleDrawer}
      />
    </>
  );
}

export default Navbar