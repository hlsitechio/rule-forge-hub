import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Zap, Users } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-silver bg-clip-text text-transparent">
              AI Rules
            </span>
            <br />
            <span className="text-foreground">Marketplace</span>
          </h1>
          
          <div className="mb-6">
            <p className="text-sm md:text-base text-accent font-semibold tracking-wide uppercase mb-2">
              Enterprise-tested for Cursor, Windsurf, Bolt.new, Lovable and more
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium AI rules and templates for <span className="text-accent">Cursor</span>, <span className="text-accent">Windsurf</span>, <span className="text-accent">Lovable</span>, and <span className="text-accent">Bolt.new</span>. 
            Stop creating from scratch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300 text-lg px-8 py-3"
            >
              Browse Rules
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border text-foreground hover:bg-secondary text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mx-auto mb-3">
                <Code2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">AI Rules</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-silver rounded-lg mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-dark rounded-lg mx-auto mb-3 border border-border">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">2k+</div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};