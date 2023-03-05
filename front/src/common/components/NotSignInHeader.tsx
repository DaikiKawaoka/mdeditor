import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function NotSignInHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#161b21" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_APP_NAME}
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/signin"
            sx={{
              textTransform: 'none'
            }}
          >
            Sign in
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            sx={{
              textTransform: 'none'
            }}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
