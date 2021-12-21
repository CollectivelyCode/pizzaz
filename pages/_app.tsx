import { ChakraProvider } from '@chakra-ui/react'
import {AppProps} from "next/app";
import {Chakra} from "../modules/Chakra";

function Pizzaz(props: AppProps) {
  return (
      <Chakra {...props}>
        <props.Component {...props.pageProps} />
      </Chakra>
  )
}

export default Pizzaz
