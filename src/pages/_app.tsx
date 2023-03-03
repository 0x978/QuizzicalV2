import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { api } from "~/utils/api";

import "~/styles/globals.css";

// loading libraries
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeStart', () =>  NProgress.start());
        router.events.on('routeChangeComplete', () =>  NProgress.done());
        router.events.on('routeChangeError', () =>  NProgress.done());
    }, []);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
