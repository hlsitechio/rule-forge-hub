import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/components/auth/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MobileNav } from '@/components/layout/MobileNav';
import { User, LogOut, ShoppingBag, Store, Sparkles, Search, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: any }) => (
    <Button 
      variant="ghost" 
      onClick={() => navigate(href)}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-300 hover-scale group
        ${isActive(href) 
          ? 'text-accent-foreground bg-accent/10 shadow-sm' 
          : 'text-muted-foreground hover:text-foreground'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />}
      <span className="relative">
        {children}
        <span className={`
          absolute -bottom-1 left-0 h-0.5 bg-gradient-accent transition-all duration-300
          ${isActive(href) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}
        `} />
      </span>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group animate-fade-in"
            onClick={() => navigate('/')}
          >
            <div className="relative w-9 h-9 bg-gradient-accent rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-glow-accent group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-accent-foreground animate-pulse" />
              <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black bg-gradient-accent bg-clip-text text-transparent tracking-tight">
                RulesMarket
              </h1>
              <p className="text-xs text-muted-foreground font-medium -mt-1">
                AI Rules & Prompts
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-8">
            <div className="flex items-center space-x-1 bg-secondary/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/50">
              <NavLink href="/marketplace" icon={Store}>
                Marketplace
              </NavLink>
              <NavLink href="/#featured" icon={Heart}>
                Featured
              </NavLink>
              <NavLink href="/support" icon={Search}>
                Support
              </NavLink>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <MobileNav />
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Quick Actions */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/purchases')}
                    className="relative text-muted-foreground hover:text-accent-foreground transition-all duration-300 hover-scale"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full hover-scale group">
                      <Avatar className="h-9 w-9 border-2 border-border group-hover:border-accent transition-colors duration-300">
                        <AvatarFallback className="bg-gradient-accent text-accent-foreground font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 bg-card/95 backdrop-blur-xl border-border/50 shadow-xl animate-scale-in" 
                    align="end" 
                    forceMount
                  >
                    <div className="px-3 py-2 border-b border-border/50">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Premium Member</p>
                    </div>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer transition-colors duration-200 hover:bg-accent/10"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="mr-3 h-4 w-4 text-accent" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer transition-colors duration-200 hover:bg-accent/10"
                      onClick={() => navigate('/marketplace')}
                    >
                      <Store className="mr-3 h-4 w-4 text-accent" />
                      <span>Browse Marketplace</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer transition-colors duration-200 hover:bg-accent/10"
                      onClick={() => navigate('/purchases')}
                    >
                      <ShoppingBag className="mr-3 h-4 w-4 text-accent" />
                      <span>My Purchases</span>
                    </DropdownMenuItem>
                    
                    <div className="border-t border-border/50 mt-1">
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200" 
                        onClick={signOut}
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => setAuthOpen(true)}
                className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 font-semibold px-6 py-2 rounded-full hover-scale"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
};