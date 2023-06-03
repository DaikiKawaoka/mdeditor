import GoogleButton from 'react-google-button';
import axios from "axios";

type Props = {
  label: string;
};

export const GoogleBtn = (props: Props) => {
  const onClick = () => {
    axios.get(process.env.REACT_APP_APP_URL + '/sanctum/csrf-cookie').then(() => {
      axios.get(process.env.REACT_APP_API_URL + '/auth/redirect').then((res) => {
        window.location.href = res.data.redirect_url;
      }).catch(error => {
        console.log(error)
      })
    })
  }

  return (
    <GoogleButton
      type='dark'
      label={props.label}
      onClick={ onClick }
    />
  )
}
