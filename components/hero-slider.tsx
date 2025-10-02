"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
}

interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function HeroSlider({ slides, autoPlay = true, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, currentSlide, autoPlayInterval, slides.length])

  const handleSlideChange = (index: number) => {
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    handleSlideChange(index)
  }

  const goToPrevious = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    handleSlideChange((currentSlide + 1) % slides.length)
  }

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying)
  }

  if (slides.length === 0) return null

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden rounded-3xl group">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-7000">
        <Image
          src={currentSlideData.image || "/placeholder.svg"}
          alt={currentSlideData.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Animated Content */}
      <div className="relative h-full flex items-center px-6 lg:px-12">
        <div className={`max-w-2xl space-y-6 text-white transform transition-all duration-700 ${
          isTransitioning ? "translate-x-8 opacity-0" : "translate-x-0 opacity-100"
        }`}>
          
          {/* Badge/Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">Now Exploring</span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {currentSlideData.title}
            </span>
          </h1>

          {/* Subtitle with enhanced styling */}
          <p className="text-xl lg:text-2xl font-light text-white/90 leading-relaxed max-w-xl">
            {currentSlideData.subtitle}
          </p>

          {/* Description with improved readability */}
          <p className="text-lg text-white/80 leading-8 max-w-lg font-light">
            {currentSlideData.description}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              size="lg" 
              asChild 
              className="rounded-full px-8 py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              <a href={currentSlideData.primaryCTA.href}>
                {currentSlideData.primaryCTA.text}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-8 py-6 text-lg font-semibold bg-transparent border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transform transition-all duration-300 backdrop-blur-sm"
            >
              <a href={currentSlideData.secondaryCTA.href}>
                {currentSlideData.secondaryCTA.text}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 text-white hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 hover:scale-110 transform transition-all duration-300"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 text-white hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 hover:scale-110 transform transition-all duration-300"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Enhanced Indicators with Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        
        {/* Play/Pause Control */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-white hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20"
          onClick={toggleAutoplay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        {/* Progress Indicators */}
        <div className="flex gap-3 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 group"
              onClick={() => goToSlide(index)}
            >
              <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-white transition-all duration-300 ${
                    index === currentSlide ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
              <div className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "bg-white scale-125" 
                  : "bg-white/50 group-hover:bg-white/70 group-hover:scale-110"
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 text-white/70 font-light text-sm backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  )
}