import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Zap, Users, Star, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import heroDeveloperImage from '@/assets/hero-developer-hooded.jpg';
import { useEffect, useState } from 'react';

// Typewriter animation component for hero text
export const AnimatedHero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const textSections = [
    { text: "AI Rules", className: "text-6xl md:text-8xl font-black bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent" },
    { text: "Marketplace", className: "text-6xl md:text-8xl font-black text-foreground" },
    { text: "Transform your development workflow with professional-grade AI rules for ", className: "text-xl md:text-2xl text-muted-foreground" },
    { text: "Cursor, ", className: "text-xl md:text-2xl text-accent font-semibold" },
    { text: "Windsurf, ", className: "text-xl md:text-2xl text-accent font-semibold" },
    { text: "Lovable, ", className: "text-xl md:text-2xl text-accent font-semibold" },
    { text: "and Bolt.new.", className: "text-xl md:text-2xl text-accent font-semibold" }
  ];
  
  useEffect(() => {
    if (currentSection < textSections.length) {
      const currentText = textSections[currentSection].text;
      if (currentIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, currentSection < 2 ? 120 : 40); // Slower for titles, faster for description
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
        }, currentSection < 2 ? 800 : 200);
      }
    } else {
      // Blink cursor after text is complete
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    }
  }, [currentSection, currentIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Developer background image with reduced fade effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${heroDeveloperImage})`,
        }}
      />
      
      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/50 to-background/70" />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(120, 113, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(175, 173, 255, 0.1) 0%, transparent 50%)",
          backgroundSize: "200% 200%"
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full"
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

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
          <div className="text-center max-w-4xl mx-auto mb-12">
            <motion.div 
              className="min-h-[400px] flex flex-col justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="text-center leading-tight whitespace-pre-wrap font-sans">
                {textSections.map((section, index) => {
                  const sectionStart = textSections.slice(0, index).reduce((acc, s) => acc + s.text.length + (index > 0 && index < 3 ? 1 : 0), 0);
                  const sectionEnd = sectionStart + section.text.length;
                  const visibleText = displayedText.slice(sectionStart, sectionEnd);
                  
                  return (
                    <motion.span
                      key={index}
                      className={section.className}
                      style={{ 
                        display: index < 2 ? 'block' : 'inline',
                        marginBottom: index === 1 ? '2rem' : '0'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: visibleText.length > 0 ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {visibleText}
                      {currentSection === index && showCursor && (
                        <motion.span
                          className="inline-block w-0.5 h-6 md:h-8 bg-accent ml-1"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </motion.span>
                  );
                })}
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
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </section>
  );
};