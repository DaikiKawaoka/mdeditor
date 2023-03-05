import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/Page/SignIn';
import SignUp from '../components/Page/SignUp';
import { Home } from '../components/Page/Home';
import Head from '../components/Head';
import Header from '../components/Header';
import NotSignInHeader from '../components/NotSignInHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'

export const Router = () => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
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
      <Route path="/" element={
        <ThemeProvider theme={theme}>
          <Head title='Home | Markdown Editor'/>
          <Header/>
          <Home />
        </ThemeProvider>
      } />
    </Routes>
  )
}
