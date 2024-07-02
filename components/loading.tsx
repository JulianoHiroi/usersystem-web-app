export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative inline-flex">
        <div className="h-16 w-16 rounded-full bg-[#163029]"></div>
        <div className="absolute left-0 top-0 h-16 w-16 animate-ping rounded-full bg-[#163029]"></div>
        <div className="absolute left-0 top-0 h-16 w-16 animate-pulse rounded-full bg-[#163029]"></div>
      </div>
    </div>
  )
}
