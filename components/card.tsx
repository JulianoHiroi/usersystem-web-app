type CardProps = {
  title: string
}

export default function Card({ title }: CardProps) {
  return (
    <div className="h-52 w-52 overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
      <h1> {title}</h1>
    </div>
  )
}
