import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Cookies = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They help websites remember your preferences and improve your browsing experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  RulesMarket uses cookies to enhance your experience, analyze website traffic, and provide personalized content. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4 ml-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies track your browsing habits to enable us to show advertising that is more likely to be of interest to you.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can control and manage cookies in various ways. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may also use third-party services that set cookies on your device. These include analytics services, payment processors, and social media platforms. These third parties have their own cookie policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this policy periodically.
                </p>
              </section>

              <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  For questions about our use of cookies, please contact us at privacy@rulesmarket.com
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

export default Cookies;