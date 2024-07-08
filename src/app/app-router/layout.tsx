export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="app-router-layout">
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  )
}
