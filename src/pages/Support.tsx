import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, FileText, HelpCircle, Clock, CheckCircle } from 'lucide-react';

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: MessageCircle,
    availability: 'Online now',
    status: 'available'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message and we\'ll respond within 24 hours',
    icon: Mail,
    availability: '24h response',
    status: 'available'
  },
  {
    title: 'Documentation',
    description: 'Browse our comprehensive guides and tutorials',
    icon: FileText,
    availability: 'Always available',
    status: 'available'
  },
  {
    title: 'FAQ',
    description: 'Find answers to commonly asked questions',
    icon: HelpCircle,
    availability: 'Instant answers',
    status: 'available'
  }
];

const Support = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Support Center
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're here to help! Choose the best way to get support for your questions and issues.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Support Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">How can we help you?</h2>
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-accent/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                              <option.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <CardTitle className="text-lg group-hover:text-accent transition-colors">
                                {option.title}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground">
                                {option.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {option.availability}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue or question in detail..."
                      rows={6}
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Support;