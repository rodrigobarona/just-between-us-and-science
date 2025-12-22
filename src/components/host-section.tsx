import Image from "next/image"

export function HostSection() {
  return (
    <div className="flex items-start gap-4">
      <Image
        src="/assets/patricia-profile.png"
        alt="Dr. Patrícia Mota"
        width={96}
        height={96}
        className="w-24 h-24 rounded-full object-cover border-4 border-accent flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-2">Host</h3>
        <p className="text-foreground/90">
          <span className="font-semibold">Dr. Patrícia Mota, PT, PhD</span> — Physiotherapist, researcher, and educator passionate about bridging science and daily life.
        </p>
      </div>
    </div>
  )
}

