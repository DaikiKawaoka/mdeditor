import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/Page/SignIn';
import SignUp from '../components/Page/SignUp';
import Loading from '../components/Page/Loading';
import { Home } from '../components/Page/Home';
import Head from '../components/Head';
import NotSignInHeader from '../components/NotSignInHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box';

export const Router = () => {
  // const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = createTheme({
    palette: {
      mode: 'dark'
      // mode: isDarkMode ? 'dark' : 'light'
    }
  })

  return (
    <Routes>
      <Route path="/signin" element={
        <ThemeProvider theme={theme}>
          <Head title='Sign in | Markdown Editor'/>
          <NotSignInHeader/>
          <SignIn />
        </ThemeProvider>
      } />
      <Route path="/signup" element={
        <ThemeProvider theme={theme}>
          <Head title='Sign up | Markdown Editor'/>
          <NotSignInHeader/>
          <SignUp />
        </ThemeProvider>
      } />
      <Route path="/signin/callback" element={
        <ThemeProvider theme={theme}>
          <Head title='Loading | Markdown Editor'/>
          <NotSignInHeader/>
          <Loading />
        </ThemeProvider>
      } />
      <Route path="/" element={
        <ThemeProvider theme={theme}>
          <Head title='Home | Markdown Editor'/>
          <Box sx={{ height: '100vh' }}>
            <Home />
          </Box>
        </ThemeProvider>
      } />
      <Route path="*" element={
        <ThemeProvider theme={theme}>
          <Head title='Home | Markdown Editor'/>
          <Box sx={{ height: '100vh' }}>
            <Home />
          </Box>
        </ThemeProvider>
      } />
    </Routes>
  )
}
