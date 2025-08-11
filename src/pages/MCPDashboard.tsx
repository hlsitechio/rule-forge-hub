import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MCPDashboard } from '@/components/mcp/MCPDashboard';
import { AuthProvider } from '@/components/auth/AuthProvider';

const MCPDashboardPage = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <MCPDashboard />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MCPDashboardPage;
