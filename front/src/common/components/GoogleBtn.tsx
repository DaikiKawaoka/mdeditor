import GoogleButton from 'react-google-button';

type Props = {
  label: string;
};

export const GoogleBtn = (props: Props) => {
  const onClick = () => {
    console.log('Google button clicked');
  }
  return (
    <GoogleButton
      type='dark'
      label={props.label}
      onClick={ onClick }
    />
  )
}
