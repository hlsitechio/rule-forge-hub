import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-silver rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-silver bg-clip-text text-transparent">
                RulesMarket
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premier marketplace for AI development rules and templates. 
              Enhance your coding workflow with expertly crafted configurations.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products</h4>
            <nav className="space-y-2">
              <Link 
                to="/#products" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse All Rules
              </Link>
              <Link 
                to="/#featured" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Featured Products
              </Link>
              <Link 
                to="/categories/cursor" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cursor AI Rules
              </Link>
              <Link 
                to="/categories/universal" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Universal Templates
              </Link>
            </nav>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Account</h4>
            <nav className="space-y-2">
              <Link 
                to="/dashboard" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                My Purchases
              </Link>
              <Link 
                to="/profile" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Profile
              </Link>
              <Link 
                to="/support" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="space-y-2">
              <Link 
                to="/terms" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/cookies" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
              <Link 
                to="/refunds" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RulesMarket. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link 
              to="/sitemap" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
            <Link 
              to="/accessibility" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Accessibility
            </Link>
            <Link 
              to="/status" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};