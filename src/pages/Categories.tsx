import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Brain, Zap, Settings, FileText, Bot } from 'lucide-react';

const categories = [
  {
    id: 'cursor-rules',
    name: 'Cursor Rules',
    description: 'AI-powered coding rules and configurations for Cursor IDE',
    icon: Code,
    count: 24,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  },
  {
    id: 'system-prompts',
    name: 'System Prompts',
    description: 'Professional system prompts for various AI models',
    icon: Brain,
    count: 18,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
  },
  {
    id: 'agent-instructions',
    name: 'Agent Instructions',
    description: 'Specialized instructions for AI agents and assistants',
    icon: Bot,
    count: 15,
    color: 'bg-green-500/10 text-green-500 border-green-500/20'
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Automated workflows and process optimization templates',
    icon: Zap,
    count: 12,
    color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  },
  {
    id: 'development-tools',
    name: 'Development Tools',
    description: 'Developer productivity tools and configurations',
    icon: Settings,
    count: 21,
    color: 'bg-red-500/10 text-red-500 border-red-500/20'
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Templates and guides for technical documentation',
    icon: FileText,
    count: 9,
    color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
  }
];

const Categories = () => {
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
                Browse Categories
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover AI tools and templates organized by category. Find exactly what you need to enhance your development workflow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-accent/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} items
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Categories;