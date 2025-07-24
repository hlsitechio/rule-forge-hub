# Responsive Design Implementation Template

## Template Purpose
Systematic approach to creating responsive layouts using Tailwind CSS and modern design principles.

## Responsive Strategy

### 1. Mobile-First Approach
```css
/* Base styles - Mobile (default) */
.component {
  @apply flex flex-col gap-4 p-4;
}

/* Small tablets - sm: (640px+) */
.component {
  @apply sm:flex-row sm:gap-6 sm:p-6;
}

/* Large tablets - md: (768px+) */
.component {
  @apply md:gap-8 md:p-8;
}

/* Desktop - lg: (1024px+) */
.component {
  @apply lg:gap-12 lg:p-12;
}

/* Large desktop - xl: (1280px+) */
.component {
  @apply xl:gap-16 xl:p-16;
}

/* Extra large - 2xl: (1536px+) */
.component {
  @apply 2xl:gap-20 2xl:p-20;
}
```

### 2. Breakpoint Strategy
```typescript
// tailwind.config.ts - Custom breakpoints if needed
export default {
  theme: {
    screens: {
      'xs': '475px',    // Extra small devices
      'sm': '640px',    // Small devices
      'md': '768px',    // Medium devices
      'lg': '1024px',   // Large devices
      'xl': '1280px',   // Extra large devices
      '2xl': '1536px',  // 2X large devices
      '3xl': '1920px',  // 3X large devices (custom)
    }
  }
}
```

### 3. Component Responsive Patterns

#### Layout Components
```typescript
// Responsive Container
export const ResponsiveContainer = ({ children, className }: Props) => {
  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto px-4",
      "sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
};

// Responsive Grid
export const ResponsiveGrid = ({ children, className }: Props) => {
  return (
    <div className={cn(
      "grid grid-cols-1 gap-4",
      "sm:grid-cols-2 sm:gap-6",
      "lg:grid-cols-3 lg:gap-8",
      "xl:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
};
```

#### Card Components
```typescript
// Responsive Card
export const ResponsiveCard = ({ children, className }: Props) => {
  return (
    <Card className={cn(
      "p-4 space-y-4",
      "sm:p-6 sm:space-y-6",
      "lg:p-8 lg:space-y-8",
      className
    )}>
      {children}
    </Card>
  );
};
```

#### Typography Components
```typescript
// Responsive Heading
export const ResponsiveHeading = ({ children, level = 1 }: Props) => {
  const baseClasses = "font-bold text-foreground";
  
  const sizeClasses = {
    1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl",
    2: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl",
    3: "text-lg sm:text-xl lg:text-2xl xl:text-3xl",
    4: "text-base sm:text-lg lg:text-xl xl:text-2xl",
  };

  return (
    <h1 className={cn(baseClasses, sizeClasses[level])}>
      {children}
    </h1>
  );
};
```

### 4. Navigation Patterns

#### Responsive Navigation
```typescript
export const ResponsiveNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
          </div>

          {/* Mobile menu button - Only visible on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/products">Products</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
```

### 5. Image Responsive Patterns

#### Responsive Images
```typescript
// Responsive Image Component
export const ResponsiveImage = ({ src, alt, className }: Props) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img 
        src={src}
        alt={alt}
        className={cn(
          "w-full h-auto object-cover",
          "transition-transform duration-300 hover:scale-105"
        )}
        loading="lazy"
      />
    </div>
  );
};

// Responsive Hero Image
export const ResponsiveHero = ({ src, alt, children }: Props) => {
  return (
    <div className="relative">
      <div className={cn(
        "h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]",
        "bg-gradient-to-r from-primary/20 to-secondary/20"
      )}>
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Overlay Content */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        "p-4 sm:p-6 md:p-8 lg:p-12"
      )}>
        {children}
      </div>
    </div>
  );
};
```

### 6. Form Responsive Patterns

#### Responsive Forms
```typescript
// Responsive Form Layout
export const ResponsiveForm = ({ children, className }: Props) => {
  return (
    <form className={cn(
      "space-y-4 sm:space-y-6",
      "max-w-md sm:max-w-lg lg:max-w-xl mx-auto",
      className
    )}>
      {children}
    </form>
  );
};

// Responsive Form Grid
export const ResponsiveFormGrid = ({ children }: Props) => {
  return (
    <div className={cn(
      "grid grid-cols-1 gap-4",
      "sm:grid-cols-2 sm:gap-6",
      "lg:gap-8"
    )}>
      {children}
    </div>
  );
};
```

### 7. Spacing and Sizing Utilities

#### Consistent Spacing Scale
```typescript
// Responsive spacing utilities
const spacing = {
  xs: "gap-2 p-2",
  sm: "gap-4 p-4 sm:gap-6 sm:p-6",
  md: "gap-6 p-6 md:gap-8 md:p-8",
  lg: "gap-8 p-8 lg:gap-12 lg:p-12",
  xl: "gap-12 p-12 xl:gap-16 xl:p-16",
};

// Responsive text sizes
const textSizes = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base",
  base: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl lg:text-2xl",
  xl: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl",
};
```

### 8. Testing Responsive Design

#### Browser Testing
```markdown
## Device Testing Checklist
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1920px)

## Feature Testing
- [ ] Navigation works on all sizes
- [ ] Text is readable on all devices
- [ ] Images scale properly
- [ ] Forms are usable on mobile
- [ ] Touch targets are adequate (44px min)
- [ ] Content doesn't overflow
- [ ] Performance is acceptable
```

#### CSS Testing Utilities
```css
/* Debug responsive breakpoints */
.debug-responsive::before {
  @apply fixed top-0 left-0 z-50 bg-black text-white p-2 text-sm;
  content: "XS";
}

@screen sm {
  .debug-responsive::before {
    content: "SM";
  }
}

@screen md {
  .debug-responsive::before {
    content: "MD";
  }
}

@screen lg {
  .debug-responsive::before {
    content: "LG";
  }
}

@screen xl {
  .debug-responsive::before {
    content: "XL";
  }
}
```

## Best Practices Checklist

- [ ] Mobile-first approach implemented
- [ ] Touch-friendly interface (44px minimum touch targets)
- [ ] Readable text sizes on all devices
- [ ] Adequate contrast ratios
- [ ] Fast loading on mobile networks
- [ ] Accessible navigation on all devices
- [ ] Consistent spacing scale
- [ ] Proper image optimization
- [ ] Performance testing completed
- [ ] Cross-browser compatibility verified