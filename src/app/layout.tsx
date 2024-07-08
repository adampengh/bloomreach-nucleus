export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main id='rootLayout' className="root-layout">{children}</main>
      </body>
    </html>
  )
}
