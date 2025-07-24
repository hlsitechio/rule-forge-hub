import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Terms = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using RulesMarket ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  RulesMarket is a digital marketplace that provides AI development rules, templates, and configurations to enhance coding workflows. Our platform connects developers with high-quality, expertly crafted development tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Digital Products and Licensing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All digital products purchased through RulesMarket are licensed for personal or commercial use as specified in the individual product descriptions. You may not redistribute, resell, or claim ownership of the intellectual property contained within these products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment and Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Payments are processed securely through our payment providers. Due to the digital nature of our products, refunds are generally not available unless there are technical issues preventing access to purchased content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction when using the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  RulesMarket shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the service after any such changes shall constitute your consent to such changes.
                </p>
              </section>

              <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  For questions about these Terms of Service, please contact us at legal@rulesmarket.com
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Terms;