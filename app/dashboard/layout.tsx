export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>Teste de navbar</nav>
      {children}
      <footer>Teste de footer</footer>
    </section>
  )
}
