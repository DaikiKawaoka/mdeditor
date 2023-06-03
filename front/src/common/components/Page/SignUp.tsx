import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleBtn } from '../GoogleBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type SignUpFormData = {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

export default function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: [],
    password: [],
    first_name: [],
    last_name: [],
  });

  const onClick = () => {
    // sign up
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(
        process.env.REACT_APP_API_URL + '/signup',
        {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name
        }
      )
      .then((res) => {
        // サインアップ成功
        navigate("/signin");
      }).catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      });
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                error={errors.first_name && errors.first_name.length > 0}
                helperText={errors.first_name && errors.first_name.length > 0 ? errors.first_name[0] : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                error={errors.last_name && errors.last_name.length > 0}
                helperText={errors.last_name && errors.last_name.length > 0 ? errors.last_name[0] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email && errors.email.length > 0}
                helperText={errors.email && errors.email.length > 0 ? errors.email[0] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password && errors.password.length > 0}
                helperText={errors.password && errors.password.length > 0 ? errors.password[0] : ""}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            onClick={onClick}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Box sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <GoogleBtn
              label='Sign up with Google'
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}