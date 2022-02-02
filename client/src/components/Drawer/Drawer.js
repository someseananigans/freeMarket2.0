import { useState } from 'react'
import { Drawer as Draw } from '@mui/material/';
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


const Drawer = ({ open, toggle }) => {

  const [expand, setExpand] = useState({
    test: false
  })

  const handleClick = (name) => {
    setExpand({ ...expand, [name]: !expand[name] })
  }

  return (
    <>
      <Draw
        anchor={'right'}
        open={open}
        onClose={toggle}
      >
        <SideNav>
          <div>This is wear name/logo goes</div>
          <List
            sx={{ bgcolor: 'background.paper', padding: '0 10px 0 10px' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Sub Header
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </List>
          <Divider />
          <List
            sx={{ bgcolor: 'background.paper', padding: '0 10px 0 10px' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Sub Header
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Listings" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick('test')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
              {expand.test ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expand.test} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Listings" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <h3>test</h3>
        </SideNav>
      </Draw>
    </>


  )
}

export default Drawer
