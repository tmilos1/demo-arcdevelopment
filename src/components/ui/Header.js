import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo: {
    height: "8em"
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "2"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  appbar: {
    backgroundColor: theme.palette.common.blue,
  }  
}))

const Header = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }
  
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === '/services' && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === '/revolution' && value !== 1) {
      setValue(2)
    } else if (window.location.pathname === '/about' && value !== 1) {
      setValue(3)
    } else if (window.location.pathname === '/contact' && value !== 1) {
      setValue(4)
    }
  }, [value])

  const handleChange = (e, value) => {
    setValue(value)
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters >
            <Button 
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => { setValue(0) }}
              disableRipple
            >
              <img src={logo} className={classes.logo} alt="company logo" />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab className={classes.tab} component={Link} to="/" label="Home" />
              <Tab 
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab}
                component={Link}
                onMouseOver={event => handleClick(event)}
                to="/services"
                label="Services"
              />
              <Tab className={classes.tab} component={Link} to="/revolution" label="Revolution" />
              <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
              <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
              Free Estimate
            </Button>
            <Menu 
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{paper: classes.menu}}
              elevation={0}
              MenuListProps={{onMouseLeave: handleClose}}
            >
              <MenuItem 
                onClick={() => {handleClose(); setValue(1);}}
                component={Link}
                to="/services"
                classes={{root: classes.menuItem}}
              >
                Services
              </MenuItem>
              <MenuItem 
                onClick={() => {handleClose(); setValue(1);}}
                component={Link}
                to="/customsoftware"
                classes={{root: classes.menuItem}}
              >
                Custom Software Development
              </MenuItem>
              <MenuItem 
                onClick={() => {handleClose(); setValue(1);}}
                component={Link}
                to="/mobileapps"
                classes={{root: classes.menuItem}}
              >
                Mobile App Development
              </MenuItem>
              <MenuItem 
                onClick={() => {handleClose(); setValue(1);}}
                component={Link}
                to="/websites"
                classes={{root: classes.menuItem}}
              >
                Website Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

export default Header;
