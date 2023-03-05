import { Helmet } from "react-helmet"

type Props = { title: string }

const Head = ({ title }: Props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{ title }</title>
    </Helmet>
  )
}

export default Head;
