import Image from 'next/image'

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logos/logo.png"
        alt="C2AIR Logo"
        width={200}
        height={240}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
