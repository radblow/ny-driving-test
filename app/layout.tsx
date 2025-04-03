import '../styles/globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by RadBlow.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#ffffff" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="NY Driving Test" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
    </head>
      <body>
        {children}
        </body>
    </html>
  )
}
