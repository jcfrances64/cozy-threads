import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import { Link } from "react-router-dom"
import logo from "../../assets/Cozy.png"

export const MenuBar = () => (
  <Box width="100vw" sx={{ margin: 0, padding:0 }}>
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between"}}>
        <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }}} component={Link} to="/">
          <img src={logo} height="50px" width="auto" />
        </IconButton>
        <IconButton component={Link} to="/cart">
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
)