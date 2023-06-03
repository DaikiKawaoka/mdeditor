import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { GoogleBtn } from "../GoogleBtn";
import axios from "axios";

type SignInFormData = {
  email: string;
  password: string;
  remember_me: boolean;
};

type Errors = {
  email: Array<string>,
  password: Array<string>
}

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    remember_me: false,
  });

  const [errors, setErrors] = useState<Errors>({
    email: [],
    password: [],
  });

  const onClick = () => {
    // sign up
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post(process.env.REACT_APP_API_URL + "/signin", {
          email: formData.email,
          password: formData.password,
          remember_me: formData.remember_me,
        })
        .then((res) => {
          // サインアップ成功
          navigate("/");
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              setErrors({email: ['emailまたはpasswordが正しくありません。'], password:['']})
              break
            case 422:
              setErrors(error.response.data.errors);
              break;
            default:
              console.log(error);
              break;
          }
        });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email && errors.email.length > 0}
            helperText={errors.email && errors.email.length > 0 ? errors.email[0] : ""}
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password && errors.password.length > 0}
            helperText={errors.password[0] && errors.password.length > 0 ? errors.password[0] : ""}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={formData.remember_me}
                onChange={(e) =>
                  setFormData({ ...formData, remember_me: e.target.checked })
                }
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
            onClick={onClick}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GoogleBtn label="Sign in with Google" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
