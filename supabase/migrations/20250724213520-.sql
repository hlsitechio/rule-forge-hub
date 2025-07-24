-- Add bundle products based on competitive analysis
INSERT INTO products (
  title, 
  short_description, 
  description, 
  price, 
  category, 
  tags, 
  is_featured, 
  is_active,
  preview_content,
  implementation_guide
) VALUES 
(
  'Complete AI Developer Bundle', 
  'Everything you need: Universal Rules + Framework Specific + Enterprise Quality',
  'The ultimate AI development package combining our most popular rule sets. Includes Universal Rules (works with all AI assistants), React/Next.js specialization, Python/Django backend rules, and Enterprise code review standards. Save $150+ compared to individual purchases. Perfect for professional development teams.',
  9999,
  'Bundle',
  ARRAY['bundle', 'universal', 'react', 'python', 'enterprise', 'complete'],
  true,
  true,
  'Complete AI Developer Bundle includes:

✅ Universal AI Rules ($39.99 value)
✅ React/Next.js Rules ($27.99 value)  
✅ Python/Django Rules ($27.99 value)
✅ Enterprise Code Review Rules ($49.99 value)
✅ Cursor Pro Rules ($29.99 value)
✅ Windsurf Ultimate Config ($34.99 value)

💰 Total Value: $209.94
🎯 Bundle Price: $99.99
💸 You Save: $109.95 (52% OFF)

Perfect for:
- Full-stack development teams
- Professional software engineers
- Companies adopting AI coding tools
- Teams needing consistent AI behavior

Instant access to all rule sets with video tutorials and implementation guides.',
  'Bundle Implementation Guide:

1. **Quick Setup (5 minutes)**:
   - Download all rule sets
   - Follow platform-specific setup guides
   - Configure AI assistants with provided templates

2. **Team Deployment**:
   - Share rule sets via version control
   - Standardize AI behavior across team
   - Implement quality checkpoints

3. **Advanced Configuration**:
   - Customize rules for your tech stack
   - Integrate with CI/CD pipelines  
   - Set up monitoring and metrics

4. **Ongoing Optimization**:
   - Regular rule updates included
   - Performance monitoring guidelines
   - Team training resources

All products include lifetime updates and premium support.'
),
(
  'AI Startup Accelerator Pack',
  'Essential AI rules for rapid MVP development and scaling',
  'Fast-track your startup development with AI rules optimized for speed and quality. Includes Universal Rules, React/Next.js specialization, and proven startup development patterns. Based on successful startup methodologies.',
  4999,
  'Bundle', 
  ARRAY['startup', 'mvp', 'react', 'rapid-development', 'bundle'],
  true,
  true,
  'AI Startup Accelerator includes:

🚀 Universal AI Rules - Foundation for all tools
⚛️ React/Next.js Rules - Frontend optimization  
🏗️ Startup Development Patterns
📈 MVP Development Templates
🔧 Rapid Prototyping Rules

Perfect for:
- Early-stage startups
- Solo developers
- Rapid prototyping
- MVP development

Get to market faster with AI that understands startup constraints and speed requirements.',
  'Startup Implementation:
1. Set up Universal Rules across your AI tools
2. Configure React/Next.js for frontend development
3. Use MVP templates for rapid feature development
4. Follow startup-specific coding patterns
5. Scale with provided growth guidelines'
),
(
  'Enterprise Security Suite',
  'Maximum security AI rules for enterprise and regulated industries',
  'Enterprise-grade AI rules ensuring security compliance, code review standards, and regulatory requirements. Includes security-first development patterns, compliance checklists, and enterprise workflow optimization.',
  7999,
  'Bundle',
  ARRAY['enterprise', 'security', 'compliance', 'code-review', 'bundle'],
  false,
  true,
  'Enterprise Security Suite includes:

🔒 Enterprise Code Review Rules ($49.99 value)
🛡️ Security-First Development Patterns  
📋 Compliance Checklists (SOC2, GDPR, HIPAA)
🔍 Advanced Security Scanning Rules
👥 Team Security Training Templates

Built for:
- Financial services
- Healthcare organizations  
- Government contractors
- Large enterprises
- Regulated industries

Ensure your AI generates compliant, secure, audit-ready code.',
  'Enterprise Security Implementation:
1. Deploy security rules across development teams
2. Integrate compliance checks into CI/CD
3. Train teams on security patterns
4. Monitor and audit AI-generated code
5. Maintain compliance documentation'
);

-- Update existing product pricing to be more competitive
UPDATE products SET 
  price = 3999,
  description = 'Framework-agnostic AI rules that work across all major coding assistants (Cursor, Windsurf, Continue, Cline, etc.). Comprehensive system prompts covering clean code principles, security best practices, and development workflows. Your one-stop solution for consistent AI behavior across tools. MOST POPULAR - Over 1000+ developers trust these rules.',
  short_description = 'Universal AI rules compatible with all major coding assistants - MOST POPULAR'
WHERE title = 'AI Coding Assistant Universal Rules';

UPDATE products SET 
  price = 2799,
  description = 'Specialized AI rules for React and Next.js development. Includes modern React patterns, Next.js optimization techniques, component architecture best practices, and performance guidelines. Perfect for frontend teams building scalable React applications with AI assistance. Includes TypeScript templates and testing strategies.',
  short_description = 'Specialized AI rules for modern React and Next.js development with TypeScript'
WHERE title = 'React/Next.js AI Development Rules';

UPDATE products SET 
  price = 4999,
  description = 'Professional code review and quality assurance rules for AI assistants. Ensures enterprise-grade code quality, security compliance, and maintainability standards. Perfect for teams that need AI to produce production-ready, review-ready code consistently. Used by Fortune 500 companies.',
  short_description = 'Enterprise-grade AI rules for code review and quality assurance - Fortune 500 trusted'
WHERE title = 'Enterprise AI Code Review Rules';

UPDATE products SET 
  price = 2999,
  description = 'Professional-grade .cursorrules configuration that enforces Test-Driven Development, clean code practices, and precise AI behavior control. Based on industry best practices from senior developers, this template prevents feature creep, ensures code quality, and maintains strict development workflows. Perfect for teams that need reliable, consistent AI assistance. BEST SELLER for Cursor users.',
  short_description = 'Professional .cursorrules template with TDD enforcement - BEST SELLER'
WHERE title = 'Cursor AI Pro Rules - TDD & Clean Code';

UPDATE products SET 
  price = 3499,
  description = 'Complete .windsurfrules setup optimized for Python backend and Next.js frontend development. This enterprise-grade configuration includes advanced workflow management, code quality enforcement, and project-specific optimizations. Eliminates common AI-generated code issues and ensures consistent, production-ready output. Includes full-stack integration patterns.',
  short_description = 'Enterprise .windsurfrules for Python/Next.js with advanced workflow management - PREMIUM'
WHERE title = 'Windsurf AI Ultimate Configuration';