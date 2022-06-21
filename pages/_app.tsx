import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider>
    <ChakraProvider>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
    </ChakraProvider>
  </SessionProvider>
  )
}

export default MyApp
