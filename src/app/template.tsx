export default function RootTemplate({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div id='rootTemplate' className="template">
      {children}
    </div>
  )
}
