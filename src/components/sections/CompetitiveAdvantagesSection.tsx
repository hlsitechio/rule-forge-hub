import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Clock
} from 'lucide-react';

const competitors = [
  {
    name: 'PromptBase',
    pricing: '$2.99-$9.99',
    issues: ['Generic prompts', 'No specialization', 'Basic quality'],
    color: 'text-red-400'
  },
  {
    name: 'Free GitHub',
    pricing: 'Free',
    issues: ['No testing', 'Inconsistent quality', 'No support'],
    color: 'text-gray-400'
  },
  {
    name: 'SaaS Templates',
    pricing: '$99-$299',
    issues: ['Too generic', 'No AI focus', 'Expensive'],
    color: 'text-orange-400'
  }
];

const advantages = [
  {
    icon: Target,
    title: 'AI-Specialized Focus',
    description: 'Focused exclusively on AI coding assistants and development tools',
    highlight: 'Cursor, Windsurf, Lovable ready'
  },
  {
    icon: Shield,
    title: 'Quality Templates',
    description: 'Carefully crafted rules and templates with clear documentation',
    highlight: 'Well-documented'
  },
  {
    icon: TrendingUp,
    title: 'Bundle Options',
    description: 'Save money with bundle packages vs buying templates individually',
    highlight: 'Better value in bundles'
  },
  {
    icon: Users,
    title: 'Easy Setup',
    description: 'Simple implementation with step-by-step guides for quick setup',
    highlight: 'Quick to implement'
  },
  {
    icon: Clock,
    title: 'Regular Updates',
    description: 'Templates updated as AI tools evolve and new features are released',
    highlight: 'Staying current'
  },
  {
    icon: Award,
    title: 'Implementation Guides',
    description: 'Clear instructions and examples to help you get started quickly',
    highlight: 'Helpful documentation'
  }
];

export const CompetitiveAdvantagesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Market Leadership</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Why We're Different
            </span>
            <br />
            <span className="text-accent">From The Competition</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A fresh approach to AI development templates. Here's what makes our 
            marketplace different from generic alternatives.
          </p>
        </motion.div>

        {/* Competitor Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-muted-foreground">
            The Competition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <h4 className={`text-lg font-bold mb-2 ${competitor.color}`}>
                      {competitor.name}
                    </h4>
                    <Badge variant="outline" className="mb-4">
                      {competitor.pricing}
                    </Badge>
                    <ul className="space-y-2">
                      {competitor.issues.map((issue, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Our Competitive Advantages
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-card via-card/50 to-accent/5 border-accent/20 hover:border-accent/40 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <advantage.icon className="w-6 h-6 text-accent-foreground" />
                    </motion.div>
                    
                    <h4 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                      {advantage.title}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {advantage.description}
                    </p>
                    
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {advantage.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-accent/5 via-primary/5 to-accent/10 border-accent/20 max-w-5xl mx-auto overflow-hidden">
            <CardContent className="p-12 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-accent/20" />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-accent/30 relative z-10"
              >
                <Target className="w-8 h-8 text-accent-foreground" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent relative z-10">
                Ready to Lead the AI Development Revolution?
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto relative z-10">
                Start your AI development journey with professional templates. Quality rules 
                and documentation to help you build better with AI tools.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Save 52% with Bundles
                </Badge>
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Setup in 5 Minutes
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Lifetime Updates
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};