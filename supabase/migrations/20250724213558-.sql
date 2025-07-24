-- Add more competitive products based on market gaps
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
  'Team License - Universal Rules (5 Developers)',
  'Universal AI rules licensed for 5-developer teams with shared configurations',
  'Professional team license for our Universal AI Rules. Includes shared team configurations, standardized workflows, and collaboration templates. Perfect for small to medium development teams who need consistent AI behavior across all team members.',
  14999,
  'Team License',
  ARRAY['team', 'universal', 'collaboration', 'enterprise', '5-developers'],
  false,
  true,
  'Team License Benefits:

👥 5 Developer Licenses Included
🔄 Shared Team Configurations  
📋 Standardized Workflow Templates
🎯 Consistent AI Behavior Across Team
📞 Priority Team Support
🔄 Automatic Updates for All Users

Perfect for:
- Development teams (5 members)
- Startups scaling their engineering
- Remote teams needing consistency
- Companies adopting AI tools

Save $50+ vs individual licenses while ensuring team alignment.',
  'Team Implementation:
1. Set up shared team repository
2. Deploy consistent rules across all developers
3. Configure team-specific customizations
4. Monitor team productivity improvements
5. Access dedicated team support channel'
),
(
  'AI Testing & QA Automation Rules',
  'Advanced AI rules for automated testing, QA workflows, and bug detection',
  'Specialized AI rules focused on testing automation, quality assurance, and bug detection. Includes test-driven development patterns, automated QA workflows, and comprehensive testing strategies for modern applications.',
  3499,
  'Specialized',
  ARRAY['testing', 'qa', 'automation', 'tdd', 'quality-assurance'],
  false,
  true,
  'AI Testing & QA Rules include:

🧪 Test-Driven Development Patterns
🤖 Automated Test Generation Rules
🔍 Bug Detection and Prevention
📊 QA Workflow Optimization
🎯 Coverage Optimization Strategies

Perfect for:
- QA Engineers
- Test Automation Teams
- DevOps Engineers
- Quality-focused development teams

Ensure your AI generates comprehensive tests and catches bugs before production.',
  'Testing Implementation:
1. Configure AI for TDD workflows
2. Set up automated test generation
3. Implement QA automation patterns
4. Monitor test coverage improvements
5. Integrate with CI/CD pipelines'
),
(
  'API Development & Integration Rules',
  'Professional AI rules for REST APIs, GraphQL, and microservices architecture',
  'Comprehensive AI rules for API development, including REST API best practices, GraphQL schema design, microservices patterns, and API security guidelines. Essential for backend developers and API architects.',
  2999,
  'Specialized',
  ARRAY['api', 'rest', 'graphql', 'microservices', 'backend'],
  false,
  true,
  'API Development Rules cover:

🌐 REST API Best Practices
📊 GraphQL Schema Design
🏗️ Microservices Architecture
🔒 API Security Guidelines
📈 Performance Optimization

Built for:
- Backend developers
- API architects  
- Microservices teams
- Full-stack engineers

Generate production-ready APIs with proper documentation, security, and performance.',
  'API Implementation:
1. Configure AI for API-first development
2. Set up API documentation patterns
3. Implement security best practices
4. Optimize API performance
5. Follow microservices guidelines'
),
(
  'Mobile Development Rules (React Native)',
  'Specialized AI rules for React Native mobile app development',
  'Mobile-first AI rules optimized for React Native development. Includes native platform integration, performance optimization, mobile UX patterns, and app store deployment guidelines.',
  3299,
  'Framework Specific',
  ARRAY['react-native', 'mobile', 'ios', 'android', 'cross-platform'],
  false,
  true,
  'React Native Rules include:

📱 Mobile-First Development Patterns
⚡ Performance Optimization for Mobile
🎨 Native UI Component Guidelines
🔧 Platform-Specific Integration
📦 App Store Deployment Best Practices

Perfect for:
- Mobile app developers
- React Native teams
- Cross-platform development
- Startup mobile teams

Build high-performance mobile apps with AI that understands mobile constraints.',
  'Mobile Development Setup:
1. Configure AI for mobile-first approach
2. Set up React Native best practices
3. Implement platform-specific patterns
4. Optimize for mobile performance
5. Follow app store guidelines'
),
(
  'DevOps & Infrastructure Rules',
  'AI rules for DevOps, CI/CD, Docker, Kubernetes, and cloud infrastructure',
  'Comprehensive AI rules for DevOps engineers covering CI/CD pipelines, containerization, Kubernetes orchestration, cloud infrastructure, and deployment automation. Essential for modern infrastructure management.',
  3799,
  'DevOps',
  ARRAY['devops', 'docker', 'kubernetes', 'ci-cd', 'infrastructure', 'cloud'],
  false,
  true,
  'DevOps Rules include:

🚀 CI/CD Pipeline Optimization
🐳 Docker & Containerization Best Practices
☸️ Kubernetes Orchestration Patterns
☁️ Cloud Infrastructure Guidelines
🔧 Deployment Automation Rules

Built for:
- DevOps engineers
- Platform engineers
- SRE teams
- Infrastructure architects

Automate infrastructure management with AI that understands DevOps best practices.',
  'DevOps Implementation:
1. Configure AI for infrastructure-as-code
2. Set up CI/CD automation patterns
3. Implement container best practices
4. Optimize cloud resource usage
5. Monitor and maintain systems'
);

-- Mark the new bundles as featured to highlight competitive advantage
UPDATE products SET is_featured = true 
WHERE title IN ('Complete AI Developer Bundle', 'AI Startup Accelerator Pack');