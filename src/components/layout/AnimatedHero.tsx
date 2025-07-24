import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Zap, Users, Star, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

// Clean minimal hero without backgrounds
export const AnimatedHero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  // Video state management
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout>();
  
  const textSections = [
    { text: "AI Rules", className: "text-7xl md:text-9xl font-black bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent" },
    { text: "Marketplace", className: "text-7xl md:text-9xl font-black text-foreground" },
    { text: "Transform your development workflow with professional-grade AI rules for ", className: "text-2xl md:text-3xl text-muted-foreground" },
    { text: "Cursor, ", className: "text-2xl md:text-3xl text-accent font-semibold" },
    { text: "Windsurf, ", className: "text-2xl md:text-3xl text-accent font-semibold" },
    { text: "Lovable, ", className: "text-2xl md:text-3xl text-accent font-semibold" },
    { text: "and Bolt.new.", className: "text-2xl md:text-3xl text-accent font-semibold" }
  ];
  
  useEffect(() => {
    if (currentSection < textSections.length) {
      const currentText = textSections[currentSection].text;
      if (currentIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, currentSection < 2 ? 80 : 30); // Faster typing for both titles and description
        return () => clearTimeout(timer);
      } else {
        // Move to next section after a pause
        setTimeout(() => {
          setCurrentSection(prev => prev + 1);
          setCurrentIndex(0);
          if (currentSection === 0 || currentSection === 1) {
            setDisplayedText(prev => prev + '\n');
          }
          if (currentSection === 1) {
            setDisplayedText(prev => prev + '\n');
          }
        }, currentSection < 2 ? 600 : 150);
      }
    } else {
      // Blink cursor after text is complete
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    }
  }, [currentSection, currentIndex]);

  // Imgur video source
  const videoSources = [
    { src: 'https://i.imgur.com/818NnMp.mp4', type: 'video/mp4' }
  ];

  // Enhanced video error handling with timeout
  const handleVideoError = useCallback(() => {
    console.log(`Video failed to load: ${videoSources[currentVideoIndex]?.src}`);
    
    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    
    if (currentVideoIndex < videoSources.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setVideoLoaded(false);
      setVideoLoading(true);
    } else {
      console.log('All video sources failed, using fallback');
      setVideoError(true);
      setVideoLoading(false);
    }
  }, [currentVideoIndex, videoSources]);

  const handleVideoLoad = useCallback(() => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setVideoError(false);
    setVideoLoading(false);
    
    // Clear timeout on successful load
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
  }, []);

  const handleVideoLoadStart = useCallback(() => {
    setVideoLoading(true);
    
    // Set timeout for video loading (10 seconds)
    loadTimeoutRef.current = setTimeout(() => {
      console.log('Video load timeout, trying next source');
      handleVideoError();
    }, 10000);
  }, [handleVideoError]);

  // Reset video state when video source changes
  useEffect(() => {
    if (videoRef.current) {
      setVideoLoaded(false);
      setVideoLoading(true);
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* TEMPORARY VIDEO TEST SECTION - Now becoming the main hero */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            onLoadStart={() => console.log('Test video: Load started')}
            onLoadedData={() => console.log('Test video: Data loaded')}
            onCanPlay={() => console.log('Test video: Can play')}
            onEnded={(e) => {
              // Immediately restart for seamless loop
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            }}
            onError={(e) => {
              console.error('Test video error:', e);
              const video = e.target as HTMLVideoElement;
              console.error('Failed src:', video.currentSrc);
            }}
          >
            <source src="https://i.imgur.com/818NnMp.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Enhanced gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/80" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Premium AI Rules & Templates</span>
              <Star className="w-4 h-4 text-accent fill-current" />
            </motion.div>

            {/* Enhanced Typewriter Hero Text */}
            <div className="text-center max-w-5xl mx-auto mb-12">
              <motion.div 
                className="min-h-[500px] flex flex-col justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="space-y-6">
                  {/* Title sections */}
                  <div className="space-y-4">
                    {textSections.slice(0, 2).map((section, index) => {
                      const sectionStart = textSections.slice(0, index).reduce((acc, s) => acc + s.text.length + (index > 0 ? 1 : 0), 0);
                      const sectionEnd = sectionStart + section.text.length;
                      const visibleText = displayedText.slice(sectionStart, sectionEnd);
                      
                      return (
                        <motion.h1
                          key={index}
                          className="leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: visibleText.length > 0 ? 1 : 0,
                            y: visibleText.length > 0 ? 0 : 20
                          }}
                          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                        >
                          <span className={section.className}>
                            {visibleText.split('').map((char, charIndex) => (
                              <motion.span
                                key={charIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                  duration: 0.05,
                                  delay: charIndex * 0.02
                                }}
                              >
                                {char}
                              </motion.span>
                            ))}
                            {currentSection === index && showCursor && (
                              <motion.span
                                className="inline-block w-1 h-12 md:h-16 bg-accent ml-1"
                                animate={{ opacity: [1, 0, 1], scaleY: [1, 1.1, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </span>
                        </motion.h1>
                      );
                    })}
                  </div>
                  
                  {/* Description sections */}
                  <div className="pt-4">
                    <motion.p
                      className="leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: currentSection >= 2 ? 1 : 0,
                        y: currentSection >= 2 ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {textSections.slice(2).map((section, index) => {
                        const actualIndex = index + 2;
                        const sectionStart = textSections.slice(0, actualIndex).reduce((acc, s) => acc + s.text.length + (actualIndex > 1 ? 2 : actualIndex > 0 ? 1 : 0), 0);
                        const sectionEnd = sectionStart + section.text.length;
                        const visibleText = displayedText.slice(sectionStart, sectionEnd);
                        
                        return (
                          <span
                            key={actualIndex}
                            className={section.className}
                          >
                            {visibleText.split('').map((char, charIndex) => (
                              <motion.span
                                key={charIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                  duration: 0.05,
                                  delay: charIndex * 0.02
                                }}
                              >
                                {char}
                              </motion.span>
                            ))}
                            {currentSection === actualIndex && showCursor && (
                              <motion.span
                                className="inline-block w-0.5 h-6 md:h-8 bg-accent ml-1"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </span>
                        );
                      })}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('featured')}
                  className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 text-lg px-10 py-4 h-auto"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center"
                  >
                    Explore Premium Rules
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => scrollToSection('features')}
                  className="border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent/50 text-lg px-10 py-4 h-auto backdrop-blur-sm"
                >
                  <Target className="w-5 h-5 mr-2" />
                  How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: Code2, number: '500+', label: 'AI Rules', color: 'accent' },
                { icon: Zap, number: '10k+', label: 'Downloads', color: 'primary' },
                { icon: Users, number: '2k+', label: 'Developers', color: 'secondary' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className={`flex items-center justify-center w-16 h-16 bg-gradient-${stat.color} rounded-2xl mx-auto mb-4 shadow-glow-${stat.color}/20 group-hover:shadow-glow-${stat.color}/40 transition-all duration-300`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <stat.icon className="w-8 h-8 text-accent-foreground" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-black text-foreground mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-accent rounded-full mt-2"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
};