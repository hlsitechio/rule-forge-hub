import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Zap, Users, Star, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

// Clean minimal hero without complex animations
export const AnimatedHero = () => {
  // Video state management
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>();
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  // Imgur video source
  const videoSources = [{
    src: 'https://i.imgur.com/818NnMp.mp4',
    type: 'video/mp4'
  }];

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
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <>
      {/* Main Hero Section */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline onLoadStart={() => console.log('Test video: Load started')} onLoadedData={() => console.log('Test video: Data loaded')} onCanPlay={() => console.log('Test video: Can play')} onEnded={e => {
          // Immediately restart for seamless loop
          const video = e.target as HTMLVideoElement;
          video.currentTime = 0;
          video.play();
        }} onError={e => {
          console.error('Test video error:', e);
          const video = e.target as HTMLVideoElement;
          console.error('Failed src:', video.currentSrc);
        }}>
            <source src="https://i.imgur.com/818NnMp.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Enhanced gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/80" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-accent/10 border border-green-500/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-green-600">52% Off Bundle Deal</span>
              <Star className="w-4 h-4 text-accent fill-current" />
              <span className="text-sm font-medium text-accent">• Premium AI Rules & Templates</span>
            </motion.div>

            {/* Simple Hero Text */}
            <div className="text-center max-w-5xl mx-auto mb-12">
              <motion.div className="space-y-6" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }}>
                {/* Title */}
                <div className="space-y-4">
                  <motion.h1 className="leading-tight text-7xl md:text-9xl font-black bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent" initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.3
                }}>
                    AI Rules
                  </motion.h1>
                  <motion.h1 className="leading-tight text-7xl md:text-9xl font-black text-foreground" initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8,
                  delay: 0.5
                }}>
                    Marketplace
                  </motion.h1>
                </div>
                
                {/* Description */}
                <motion.p className="leading-relaxed pt-4 text-2xl md:text-3xl" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.8,
                delay: 0.7
              }}>
                  <span className="text-muted-foreground">
                    Curated AI rules and templates from experienced developers, tested in real projects.
                  </span>
                  <br />
                  <span className="text-accent font-bold">
                    Enterprise-tested for Cursor, Windsurf & more.
                  </span>
                </motion.p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.9
          }}>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button size="lg" onClick={() => scrollToSection('featured')} className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 text-lg px-10 py-4 h-auto">
                  <motion.div animate={{
                  x: [0, 5, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} className="flex items-center">
                    Explore Premium Rules
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('features')} className="border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent/50 text-lg px-10 py-4 h-auto backdrop-blur-sm">
                  <Target className="w-5 h-5 mr-2" />
                  How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Competitive Stats */}
            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.1
          }}>
              {[{
              icon: Code2,
              number: '15+',
              label: 'Pro Rule Sets',
              color: 'accent',
              highlight: 'vs 0 specialized'
            }, {
              icon: Zap,
              number: '52%',
              label: 'Bundle Savings',
              color: 'primary',
              highlight: 'vs individual'
            }, {
              icon: Users,
              number: '2k+',
              label: 'Happy Devs',
              color: 'secondary',
              highlight: 'Fortune 500'
            }, {
              icon: Star,
              number: '4.9',
              label: 'Rating',
              color: 'accent',
              highlight: '500+ reviews'
            }].map((stat, index) => <motion.div key={stat.label} className="text-center group" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 1.3 + index * 0.1
            }} whileHover={{
              y: -5
            }}>
                  <motion.div className="text-3xl font-black text-foreground mb-2" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                duration: 0.5,
                delay: 1.5 + index * 0.1,
                type: "spring"
              }}>
                    {stat.number}
                  </motion.div>
                  <motion.div className={`flex items-center justify-center w-12 h-12 bg-gradient-${stat.color} rounded-xl mx-auto mb-3 shadow-glow-${stat.color}/20 group-hover:shadow-glow-${stat.color}/40 transition-all duration-300`} whileHover={{
                rotate: 5,
                scale: 1.1
              }}>
                    <stat.icon className="w-6 h-6 text-accent-foreground" />
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-accent font-medium">{stat.highlight}</div>
                </motion.div>)}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div className="absolute bottom-4 left-1/2 transform -translate-x-1/2" animate={{
            y: [0, 10, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              
            </motion.div>
          </div>
        </div>
      </section>

    </>;
};