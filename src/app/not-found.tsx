import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-accent">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground/70 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

