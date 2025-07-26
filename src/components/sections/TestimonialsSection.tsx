import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Dev",
    role: "Frontend Developer",
    company: "Independent",
    avatar: "AD",
    content: "Clean and well-structured AI rules. Good starting point for Cursor development.",
    rating: 5,
    platform: "Cursor"
  },
  {
    name: "Jamie Code",
    role: "Full Stack Engineer",
    company: "Freelancer",
    avatar: "JC",
    content: "Nice collection of Windsurf configurations. Saves time on initial setup.",
    rating: 4,
    platform: "Windsurf"
  },
  {
    name: "Sam Builder",
    role: "Product Developer",
    company: "Solo",
    avatar: "SB",
    content: "Helpful Lovable templates. Well-organized and easy to follow.",
    rating: 5,
    platform: "Lovable"
  },
  {
    name: "Riley Tech",
    role: "Software Engineer",
    company: "Consultant",
    avatar: "RT",
    content: "Good Bolt.new starter templates. Professional quality and clear documentation.",
    rating: 4,
    platform: "Bolt.new"
  },
  {
    name: "Morgan Stack",
    role: "Developer",
    company: "Freelance",
    avatar: "MS",
    content: "Solid collection of AI development rules. Good value for the price.",
    rating: 5,
    platform: "Multi-Platform"
  },
  {
    name: "Taylor Code",
    role: "Engineer",
    company: "Independent",
    avatar: "TC",
    content: "Well-documented templates with clear implementation guides.",
    rating: 4,
    platform: "General"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/5 via-background to-accent/5">
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
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Developer Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">What Developers</span>
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fresh marketplace for AI development rules and templates. 
            Here's feedback from early users.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full bg-card/70 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 group relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <CardContent className="p-6 relative z-10">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </motion.div>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2 font-medium">
                      {testimonial.platform}
                    </span>
                  </div>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Quote className="w-8 h-8 text-accent/30 mb-3" />
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </motion.div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="w-12 h-12 border-2 border-accent/20">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=7c3aed&color=fff`} />
                        <AvatarFallback className="bg-gradient-accent text-accent-foreground font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-accent font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { metric: "New", label: "Marketplace" },
              { metric: "50+", label: "AI Rules" },
              { metric: "5+", label: "Platforms" },
              { metric: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-black text-accent mb-1">
                  {stat.metric}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};