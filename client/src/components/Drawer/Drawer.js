import { useState, useContext } from 'react'
import { UserContext } from '../../utils/Context/';
import { useHistory } from 'react-router-dom'
import { Drawer as Draw, Avatar } from '@mui/material/';
import { styled } from '@mui/material/styles';

import { Divider, ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { MoveToInbox as InboxIcon, Drafts as DraftsIcon, Send as SendIcon, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'


const SideNav = styled('div')(({ theme }) => ({
  // padding: theme.spacing(2, 2),
  height: '100%',
  width: '220px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

const ProfileWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  padding: '20px'
}))

const TextWrapper = styled('div')(({ theme }) => ({
  marginLeft: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

const ListItemBtn = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: '25px',

}))

const Drawer = ({ open, toggle }) => {

  const [expand, setExpand] = useState({
    test: false
  })
  const { customer, setCustomer } = useContext(UserContext)
  const history = useHistory()

  // const handleClick = (name) => {
  //   setExpand({ ...expand, [name]: !expand[name] })
  // }

  const logOut = () => {
    localStorage.removeItem('user')
    history.push('/auth')
  }


  return (
    <>
      <Draw
        anchor={'right'}
        open={open}
        onClose={toggle}
      >
        <SideNav>
          <ProfileWrapper>
            <Avatar
              alt={customer.username}
              src={customer.profile}
              sx={{
                height: '40px',
                width: '40px'
              }} />
            <TextWrapper>
              <h4>{customer.username}</h4>
              <p onClick={() => history.push('/auth')}>View Profile</p>
            </TextWrapper>
          </ProfileWrapper>
          <Divider />
          <List
            sx={{ bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" style={{
                height: '35px', padding: '0 15px 0 15px'
              }}>
                SELLING
              </ListSubheader>
            }
          >
            <ListItemBtn onClick={() => history.push('/listing/new')}>
              <ListItemText primary="List an Item" />
            </ListItemBtn>
            <ListItemBtn>
              <ListItemText primary="My Listings" />
            </ListItemBtn>
          </List>
          <Divider />
          <List
            sx={{ bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" style={{
                height: '35px', padding: '0 15px 0 15px'
              }}>
                BUYING
              </ListSubheader>
            }
          >
            <ListItemBtn>
              <ListItemText primary="Favorites" />
            </ListItemBtn>
            <ListItemBtn>
              <ListItemText primary="My Purchases" />
            </ListItemBtn>
            {/* <ListItemBtn onClick={() => handleClick('test')}>
              <ListItemText primary="Contact" />
              {expand.test ? <ExpandLess /> : <ExpandMore />}
            </ListItemBtn>
            <Collapse in={expand.test} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemBtn sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemBtn>
                <ListItemBtn sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Listings" />
                </ListItemBtn>
                <ListItemBtn sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemBtn>
              </List>
            </Collapse> */}
          </List>
          <Divider />
          <List
            sx={{ bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" style={{
                height: '35px', padding: '0 15px 0 15px'
              }}>
                SYSTEM
              </ListSubheader>
            }
          >
            <ListItemBtn>
              <ListItemText primary="Contact" />
            </ListItemBtn>
            <ListItemBtn>
              <ListItemText primary="How it Works" />
            </ListItemBtn>
            <Divider style={{ paddingBottom: '8px' }} />
            <ListItemBtn style={{ marginTop: '8px' }} onClick={logOut}>
              <ListItemText primary="Log Out" />
            </ListItemBtn>
          </List>

        </SideNav>
      </Draw >
    </>


  )
}

export default Drawer
