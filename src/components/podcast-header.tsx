import Image from "next/image"

export function PodcastHeader() {
  return (
    <div className="space-y-8">
      <div className="w-full aspect-[2/1] relative">
        <Image
          src="/assets/jbus-logo.png"
          alt="Just Between Us ...and Science logo"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <p className="text-foreground/95 text-2xl font-light mt-6 text-center">
          The Women&apos;s Health Lab
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">About the Podcast</h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Join Dr. Patrícia Mota, PT, PhD, as she takes you behind the scenes of women&apos;s health — from the latest research to everyday experiences. With curiosity, humor, and a love of evidence, Patrícia explores hormones, pregnancy, pelvic health, recovery, and how to stay active through every stage of life.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          Each episode blends science, stories, and practical insights, making complex health research easy to understand and apply — for women, healthcare professionals, and anyone curious about how our bodies really work.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Presented by</h3>
        <a href="https://eleva.care" target="_blank" rel="noopener noreferrer" className="inline-block">
          <Image
            src="/assets/eleva-care-logo-white.png"
            alt="Eleva Care"
            width={240}
            height={48}
            className="h-10 w-auto opacity-90"
          />
        </a>
      </div>
    </div>
  )
}

