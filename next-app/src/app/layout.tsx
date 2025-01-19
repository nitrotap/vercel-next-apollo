'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import StringsProvider from './context/StringsProvider';
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <StringsProvider>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Teaching Poets Collective</title>
              <meta name="description" content="Teaching Poets Collective - A community of educators sharing poetry and teaching resources" />
              <meta name="keywords" content="poetry, teaching, education, poets, collective, resources" />
              <meta property="og:title" content="Teaching Poets Collective" />
              <meta property="og:description" content="A community of educators sharing poetry and teaching resources" />
              <meta property="og:type" content="website" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://teachingpoets.org" />

            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <Nav />
              {children}
            </body>
          </html>
        </SessionProvider>
      </ApolloProvider>
    </StringsProvider>
  );
}
