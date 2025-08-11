import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Send error to backend logging service in production
    if (import.meta.env.PROD) {
      // apiClient.post('/errors', { error: error.toString(), errorInfo });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-destructive mb-4">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground mb-4">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}