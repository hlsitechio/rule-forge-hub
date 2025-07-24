import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Code2, 
  Rocket, 
  Users, 
  Star, 
  Clock, 
  Award,
  Target,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Setup',
    description: 'Get up and running in under 5 minutes with our professional AI rules and templates.',
    color: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-500'
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Quality',
    description: 'Battle-tested configurations used by thousands of developers worldwide.',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500'
  },
  {
    icon: Code2,
    title: 'Platform Optimized',
    description: 'Specifically crafted for Cursor, Windsurf, Lovable, and Bolt.new platforms.',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500'
  },
  {
    icon: Rocket,
    title: 'Productivity Boost',
    description: 'Increase your development speed by 10x with optimized workflows and rules.',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Sync your entire team with consistent coding standards and best practices.',
    color: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-500'
  },
  {
    icon: Award,
    title: 'Premium Support',
    description: 'Get lifetime updates and premium support from our expert developers.',
    color: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4">
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
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Why Choose Our Platform</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Built for Developers,
            </span>
            <br />
            <span className="text-accent">By Developers</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to supercharge your AI-powered development workflow. 
            Professional-grade rules that save you time and boost your productivity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </motion.div>
                  
                  <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional highlight section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-to-br from-accent/5 via-card to-accent/5 border-accent/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-accent/30"
              >
                <Sparkles className="w-10 h-10 text-accent-foreground" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Join 2,000+ Developers
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Who have already transformed their development workflow with our premium AI rules. 
                Don't get left behind in the AI revolution.
              </p>
              
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  >
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  </motion.div>
                ))}
                <span className="ml-2 text-sm text-muted-foreground font-medium">
                  4.9/5 from 500+ reviews
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};