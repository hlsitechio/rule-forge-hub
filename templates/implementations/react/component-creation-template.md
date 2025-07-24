# React Component Creation Template

## Template Purpose
Standardized approach for creating React components with consistent structure, typing, and best practices.

## Component Structure Template

### 1. File Naming Convention
```
ComponentName.tsx (PascalCase)
```

### 2. Import Organization
```typescript
// External libraries
import React from 'react';
import { useState, useEffect } from 'react';

// Internal utilities
import { cn } from '@/lib/utils';

// UI components (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Custom hooks
import { useCustomHook } from '@/hooks/useCustomHook';

// Types
import type { ComponentProps } from '@/types';

// Assets
import image from '@/assets/image.png';
```

### 3. Interface Definition
```typescript
interface [ComponentName]Props {
  // Required props
  id: string;
  title: string;
  
  // Optional props
  description?: string;
  className?: string;
  
  // Event handlers
  onClick?: (id: string) => void;
  onSubmit?: (data: FormData) => void;
  
  // Children
  children?: React.ReactNode;
}
```

### 4. Component Implementation
```typescript
export const [ComponentName] = ({
  id,
  title,
  description,
  className,
  onClick,
  onSubmit,
  children,
  ...props
}: [ComponentName]Props) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom hooks
  const { data, error } = useCustomHook(id);
  
  // Event handlers
  const handleClick = () => {
    onClick?.(id);
  };
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [id]);
  
  // Early returns
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  // Main render
  return (
    <Card className={cn("default-styles", className)} {...props}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Action'}
      </Button>
    </Card>
  );
};
```

### 5. Export Pattern
```typescript
// Named export (preferred)
export { ComponentName };

// Default export (when single component)
export default ComponentName;
```

## Best Practices Checklist
- [ ] TypeScript interfaces defined
- [ ] Props properly typed
- [ ] Event handlers typed correctly
- [ ] Loading and error states handled
- [ ] Accessibility attributes included
- [ ] Responsive design considered
- [ ] Performance optimized (memo if needed)
- [ ] Testing considerations included

## Common Patterns

### Form Components
```typescript
interface FormComponentProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Partial<FormData>;
  isLoading?: boolean;
}
```

### List Components
```typescript
interface ListComponentProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyState?: React.ReactNode;
}
```

### Modal Components
```typescript
interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```