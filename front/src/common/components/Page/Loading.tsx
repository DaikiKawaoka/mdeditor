import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function Loading() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/signin/callback',{ 
      params: searchParams
    }).then((res) => {
      // ログイン成功
      navigate("/");
    }).catch(error => {
      navigate("/signin");
    })
  });

  return (
    <Container component="main" >
      <CssBaseline />
      <Box sx={{ display: 'flex' ,justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
        <CircularProgress size="20rem"/>
      </Box>
    </Container>
  );
}