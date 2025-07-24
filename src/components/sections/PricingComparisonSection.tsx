import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Star,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const pricingComparison = [
  {
    name: 'PromptBase',
    logo: '🌐',
    price: '$2.99-$9.99',
    priceNote: 'per generic prompt',
    type: 'competitor',
    features: [
      { name: 'Generic AI prompts', included: true },
      { name: 'Basic quality', included: true },
      { name: 'AI coding specialization', included: false },
      { name: 'Testing & validation', included: false },
      { name: 'Video tutorials', included: false },
      { name: 'Team licensing', included: false },
      { name: 'Enterprise support', included: false },
      { name: 'Lifetime updates', included: false }
    ]
  },
  {
    name: 'Free GitHub',
    logo: '🔓',
    price: 'Free',
    priceNote: 'but you get what you pay for',
    type: 'competitor',
    features: [
      { name: 'Basic cursor rules', included: true },
      { name: 'No quality guarantee', included: true },
      { name: 'AI coding specialization', included: false },
      { name: 'Testing & validation', included: false },
      { name: 'Video tutorials', included: false },
      { name: 'Team licensing', included: false },
      { name: 'Enterprise support', included: false },
      { name: 'Professional documentation', included: false }
    ]
  },
  {
    name: 'Our Platform',
    logo: '🚀',
    price: '$17.99-$99.99',
    priceNote: 'professional AI rules',
    type: 'ours',
    popular: true,
    features: [
      { name: 'AI coding specialization', included: true },
      { name: 'Professional testing', included: true },
      { name: 'Video tutorials', included: true },
      { name: 'Team licensing', included: true },
      { name: 'Enterprise support', included: true },
      { name: 'Lifetime updates', included: true },
      { name: 'Bundle savings (52% off)', included: true },
      { name: 'Multiple platform support', included: true }
    ]
  }
];

const bundleHighlight = {
  title: 'Complete AI Developer Bundle',
  originalPrice: 209.94,
  bundlePrice: 99.99,
  savings: 109.95,
  savingsPercent: 52,
  includes: [
    'Universal AI Rules ($39.99)',
    'React/Next.js Rules ($27.99)',
    'Python/Django Rules ($27.99)',
    'Enterprise Code Review ($49.99)',
    'Cursor Pro Rules ($29.99)',
    'Windsurf Ultimate Config ($34.99)'
  ]
};

export const PricingComparisonSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background to-accent/5">
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
            <span className="text-sm font-medium text-accent">Pricing Comparison</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Best Value in
            </span>
            <br />
            <span className="text-accent">AI Development Tools</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how we compare to the competition. Professional quality at unbeatable prices.
          </p>
        </motion.div>

        {/* Pricing Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {pricingComparison.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: plan.type === 'ours' ? -8 : -3, scale: plan.type === 'ours' ? 1.03 : 1.01 }}
              className={`relative ${plan.type === 'ours' ? 'lg:scale-105' : ''}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gradient-accent text-accent-foreground px-4 py-2 shadow-glow-accent/30">
                    <Crown className="w-4 h-4 mr-2" />
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              <Card className={`h-full ${
                plan.type === 'ours' 
                  ? 'bg-gradient-to-br from-accent/5 via-card to-primary/5 border-accent/40 shadow-glow-accent/10' 
                  : 'bg-card/50 border-border/50'
              } backdrop-blur-sm transition-all duration-300`}>
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="text-4xl mb-4">{plan.logo}</div>
                  <CardTitle className={`text-2xl font-bold ${
                    plan.type === 'ours' ? 'text-accent' : 'text-foreground'
                  }`}>
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className={`text-3xl font-black ${
                      plan.type === 'ours' ? 'text-accent' : 'text-foreground'
                    }`}>
                      {plan.price}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.priceNote}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      {feature.included ? (
                        <Check className={`w-5 h-5 flex-shrink-0 ${
                          plan.type === 'ours' ? 'text-green-500' : 'text-muted-foreground'
                        }`} />
                      ) : (
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}

                  {plan.type === 'ours' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="pt-6"
                    >
                      <Button 
                        className="w-full bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300"
                        size="lg"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Started Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bundle Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-green-500/5 via-card to-green-500/10 border-green-500/20 overflow-hidden">
            <CardContent className="p-12 relative">
              {/* Background decoration */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12 text-green-500/20" />
                </motion.div>
              </div>

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6"
                >
                  <Star className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Bundle Deal</span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    {bundleHighlight.title}
                  </span>
                </h3>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-2xl text-muted-foreground line-through">
                    ${bundleHighlight.originalPrice}
                  </span>
                  <span className="text-4xl font-black text-green-600">
                    ${bundleHighlight.bundlePrice}
                  </span>
                  <Badge className="bg-green-500 text-white">
                    Save {bundleHighlight.savingsPercent}%
                  </Badge>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  You save <span className="font-bold text-green-600">${bundleHighlight.savings}</span> 
                  {' '}with our complete bundle vs buying individually
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {bundleHighlight.includes.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 px-8 py-4 text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Complete Bundle Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};