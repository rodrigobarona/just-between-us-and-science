"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check, Facebook, Linkedin, MessageCircle } from "lucide-react"
import { useState } from "react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  url: string
}

export function ShareDialog({ open, onOpenChange, title, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [textCopied, setTextCopied] = useState(false)

  // Use production URL if on localhost
  const productionUrl = url.includes('localhost') 
    ? url.replace(/localhost:\d+/, 'podcast.patriciamota.com').replace('http://', 'https://')
    : url

  const shareText = `🎙️ Just listened to "${title}" on Just Between Us … and Science podcast!\n\nCheck it out: ${productionUrl}`
  const shortShareText = `🎙️ "${title}" on Just Between Us … and Science podcast! ${productionUrl}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(productionUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(shareText)
    setTextCopied(true)
    setTimeout(() => setTextCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortShareText)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/dialog/share?app_id=966242223397117&href=${encodeURIComponent(productionUrl)}&display=popup&quote=${encodeURIComponent(`🎙️ Just listened to "${title}" on Just Between Us … and Science podcast!`)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productionUrl)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
  }

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(whatsappUrl, '_blank', 'width=550,height=420')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Share Episode</DialogTitle>
          <DialogDescription className="text-card-foreground/70">
            Share this episode with your network
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Shareable Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Shareable Text</label>
            <div className="relative">
              <div className="bg-background/50 border border-border rounded-lg p-4 pr-12 text-sm text-card-foreground">
                {shareText}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 hover:bg-background/80"
                onClick={handleCopyText}
              >
                {textCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={shareOnTwitter}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={shareOnFacebook}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={shareOnLinkedIn}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={shareOnWhatsApp}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Episode Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={productionUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-background/50 border border-border rounded-md text-card-foreground"
              />
              <Button onClick={handleCopyLink} variant="outline" className="border-border">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

