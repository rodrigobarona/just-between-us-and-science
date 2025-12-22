export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-16 border-t border-foreground/20 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-3">
          <p className="text-foreground/70 text-sm">
            © {currentYear} Dr. Patrícia Mota, PT, PhD. All rights reserved.
          </p>
          <p className="text-foreground/60 text-xs max-w-2xl mx-auto">
            The content provided in this podcast is for informational and educational purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or other qualified health provider with any questions 
            you may have regarding a medical condition.
          </p>
          <p className="text-foreground/70 text-sm">
            Presented by <a href="https://eleva.care" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-semibold">Eleva.care</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

