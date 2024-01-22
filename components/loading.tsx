export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative inline-flex">
        <div className="w-16 h-16 bg-teal-500 rounded-full"></div>
        <div className="w-16 h-16 bg-teal-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-16 h-16 bg-teal-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  )
}