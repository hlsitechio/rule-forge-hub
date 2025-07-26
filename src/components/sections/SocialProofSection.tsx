import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  TrendingUp, 
  Users, 
  Building2, 
  CheckCircle,
  Quote,
  Sparkles
} from 'lucide-react';

const stats = [
  {
    number: '50+',
    label: 'Premium Rules',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    number: '5+',
    label: 'AI Platforms',
    icon: TrendingUp,
    color: 'text-green-500'
  },
  {
    number: 'New',
    label: 'Marketplace',
    icon: Star,
    color: 'text-yellow-500'
  },
  {
    number: '24/7',
    label: 'Support',
    icon: CheckCircle,
    color: 'text-purple-500'
  }
];

const companyLogos = [
  { name: 'Cursor', logo: '💻', size: 'AI Editor' },
  { name: 'Windsurf', logo: '🌊', size: 'IDE' },
  { name: 'Lovable', logo: '💜', size: 'AI Builder' },
  { name: 'Bolt.new', logo: '⚡', size: 'Platform' },
  { name: 'v0', logo: '🎯', size: 'Generator' },
  { name: 'Claude', logo: '🤖', size: 'AI Assistant' }
];

const quickTestimonials = [
  {
    text: "Great collection of AI rules. Well-organized and easy to implement.",
    author: "Developer",
    role: "Frontend Engineer",
    company: "Anonymous",
    rating: 5,
    initials: "DE"
  },
  {
    text: "Clean, professional templates that save time on setup.",
    author: "Builder",
    role: "Full Stack Developer",
    company: "Independent",
    rating: 5,
    initials: "BU"
  },
  {
    text: "Helpful starting point for AI development workflows.",
    author: "Coder",
    role: "Software Engineer",
    company: "Freelancer",
    rating: 5,
    initials: "CO"
  }
];

export const SocialProofSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-8"
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">Proven Results</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring" }}
                  className="text-3xl font-black mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-card mx-auto mb-2`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            Supporting popular AI development platforms
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 group"
              >
                <div className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {company.logo}
                </div>
                <Badge variant="outline" className="text-xs">
                  {company.size}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {quickTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-accent/30 mb-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-accent/10 text-accent text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", delay: 1 }}
            className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Join the AI Development Revolution</span>
            <Star className="w-4 h-4 text-accent fill-current" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};