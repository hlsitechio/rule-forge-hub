import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Clock, Shield } from 'lucide-react';

export const CTASection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/40 rounded-full"
          animate={{
            y: [-20, -120, -20],
            x: [0, 30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-accent/15 border border-accent/30 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-lg font-bold text-accent">Limited Time Offer</span>
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-foreground">Ready to</span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200%' }}
            >
              Transform Your Code?
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start your AI development journey with professional templates and rules. 
            Get started in just 5 minutes.
          </motion.p>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Zap, text: "Quick setup" },
              { icon: Clock, text: "Ready to use" },
              { icon: Shield, text: "Quality templates" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center space-x-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl py-4 px-6 hover:border-accent/30 transition-all duration-300"
              >
                <feature.icon className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('featured')}
                className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 text-xl px-12 py-6 h-auto"
              >
                <motion.div
                  className="flex items-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Start Building Better Code
                  <ArrowRight className="ml-3 w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('products')}
                className="border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent/50 text-xl px-12 py-6 h-auto backdrop-blur-sm"
              >
                Browse All Rules
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Supporting popular AI platforms
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {['Cursor', 'Windsurf', 'Lovable', 'Bolt.new', 'v0'].map((company, index) => (
                <motion.span
                  key={company}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-lg font-semibold text-muted-foreground"
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};