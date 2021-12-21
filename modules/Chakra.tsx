import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager,
} from '@chakra-ui/react'
import {GetServerSidePropsContext} from "next";
import {AppProps} from "next/app";
export function Chakra(props: AppProps) {
    const colorModeManager = typeof props.pageProps.cookies === 'string' ? cookieStorageManager(props.pageProps.cookies) : localStorageManager
    return (
        <ChakraProvider colorModeManager={colorModeManager}>
            {props.Component}
        </ChakraProvider>
    )
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            cookies: context.req.headers.cookie ?? '',
        },
    }
}
