import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/components/auth/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, User, LogOut, ShoppingBag, Home, Package, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-card border-border">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-silver rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <h2 className="text-lg font-bold bg-gradient-silver bg-clip-text text-transparent">
                RulesMarket
              </h2>
            </div>

            {/* User Section */}
            {user ? (
              <div className="bg-secondary p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-silver text-primary-foreground">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Premium Member</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground mb-3">
                  Sign in to access your purchases and dashboard
                </p>
                <Button
                  onClick={() => {
                    setAuthOpen(true);
                    setOpen(false);
                  }}
                  className="w-full bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300"
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-3 h-4 w-4" />
                Home
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleNavigation('/categories')}
              >
                <Package className="mr-3 h-4 w-4" />
                Browse Rules
              </Button>

              {user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleNavigation('/marketplace')}
                  >
                    <Store className="mr-3 h-4 w-4" />
                    Marketplace
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleNavigation('/purchases')}
                  >
                    <ShoppingBag className="mr-3 h-4 w-4" />
                    My Purchases
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Button>
                </>
              )}
            </nav>

            {/* Sign Out */}
            {user && (
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};