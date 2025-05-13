/**
 * Root Layout untuk Next.js App Router
 * Wajib ada agar aplikasi bisa dibuild
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Code to Video Creator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
