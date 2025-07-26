-- Update existing products to correct categories
UPDATE products SET category = 'Cursor Rules' WHERE id IN (
  '6a983bac-b082-48cc-87bb-e25232e501c4'  -- Cursor AI Pro Rules
);

UPDATE products SET category = 'System Prompts' WHERE id IN (
  '583ddf9c-6511-473a-ba9e-1cd3a3213336',  -- Claude AI Development Instructions
  'f388829a-729e-4ed6-b09e-e77213d81e4a',  -- V0 Vercel Development Templates
  '4bb2969b-1fad-4764-81ac-60c577a13733'   -- Windsurf AI Cascade Rules
);

UPDATE products SET category = 'Agent Instructions' WHERE id IN (
  'fb51da56-8c73-46ce-8735-cb6bfaa5469f'   -- Lovable.dev Agent Instructions
);

UPDATE products SET category = 'Workflow Automation' WHERE id IN (
  '91e399aa-28a0-44b8-b697-d4a9c5b8f82c'   -- Debug Recipe Collection
);

UPDATE products SET category = 'Development Tools' WHERE id IN (
  '71f5bcaf-fcd4-4061-953d-90ee99425ba6',  -- AI Coding Assistant Universal Rules
  '084a0cc8-b215-4e00-8f65-cc1dbf838834',  -- Framework-Specific React Blueprint
  'acd1f753-3081-41ff-9ec7-46d703f0dca6',  -- Enterprise AI Code Review Rules
  '3d26e126-055e-49fc-8d18-ba17354539be'   -- Enterprise Security Kit
);

UPDATE products SET category = 'Documentation' WHERE id IN (
  'd8a44176-106d-49a8-8a5d-befd051b930e',  -- AI Startup Accelerator Pack
  'b33987f3-1677-4dea-8f31-8121b180c6b2'   -- Complete AI Developer Bundle
);

-- Insert additional products to reach target counts
-- Cursor Rules (need 23 more to reach 24)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('Cursor React Development Rules', 'Specialized Cursor rules for React development with TypeScript and modern patterns', 'React-focused Cursor IDE configuration', 1200, 'Cursor Rules', ARRAY['cursor', 'react', 'typescript', 'hooks'], false, true),
('Cursor Python Data Science Rules', 'Cursor configuration for Python data science and machine learning workflows', 'Python ML development rules for Cursor', 1500, 'Cursor Rules', ARRAY['cursor', 'python', 'datascience', 'ml'], false, true),
('Cursor Full-Stack JavaScript Rules', 'Complete Cursor setup for Node.js and frontend JavaScript development', 'Full-stack JS development configuration', 1800, 'Cursor Rules', ARRAY['cursor', 'javascript', 'nodejs', 'fullstack'], false, true),
('Cursor Vue.js Development Rules', 'Optimized Cursor rules for Vue.js 3 and Composition API development', 'Vue.js focused Cursor configuration', 1200, 'Cursor Rules', ARRAY['cursor', 'vuejs', 'composition-api', 'vue3'], false, true),
('Cursor Angular Enterprise Rules', 'Enterprise-grade Cursor configuration for Angular applications', 'Angular development rules for Cursor', 2000, 'Cursor Rules', ARRAY['cursor', 'angular', 'enterprise', 'typescript'], false, true),
('Cursor Mobile Development Rules', 'Cursor rules for React Native and mobile development workflows', 'Mobile development configuration', 1600, 'Cursor Rules', ARRAY['cursor', 'mobile', 'react-native', 'ios-android'], false, true),
('Cursor DevOps Integration Rules', 'Cursor configuration for DevOps workflows and CI/CD pipelines', 'DevOps-focused Cursor setup', 1400, 'Cursor Rules', ARRAY['cursor', 'devops', 'cicd', 'automation'], false, true),
('Cursor Database Development Rules', 'Specialized Cursor rules for database design and SQL development', 'Database development configuration', 1300, 'Cursor Rules', ARRAY['cursor', 'database', 'sql', 'orm'], false, true),
('Cursor API Development Rules', 'Cursor configuration optimized for REST and GraphQL API development', 'API development rules for Cursor', 1500, 'Cursor Rules', ARRAY['cursor', 'api', 'rest', 'graphql'], false, true),
('Cursor Microservices Rules', 'Cursor rules for microservices architecture and distributed systems', 'Microservices development configuration', 1700, 'Cursor Rules', ARRAY['cursor', 'microservices', 'distributed', 'architecture'], false, true),
('Cursor Testing Automation Rules', 'Comprehensive Cursor setup for automated testing workflows', 'Testing automation configuration', 1400, 'Cursor Rules', ARRAY['cursor', 'testing', 'automation', 'qa'], false, true),
('Cursor Game Development Rules', 'Cursor configuration for game development with Unity and Unreal', 'Game development rules for Cursor', 1800, 'Cursor Rules', ARRAY['cursor', 'gamedev', 'unity', 'unreal'], false, true),
('Cursor Blockchain Development Rules', 'Specialized Cursor rules for blockchain and smart contract development', 'Blockchain development configuration', 2200, 'Cursor Rules', ARRAY['cursor', 'blockchain', 'smartcontracts', 'web3'], false, true),
('Cursor Machine Learning Rules', 'Cursor configuration for ML model development and training', 'ML development rules for Cursor', 1900, 'Cursor Rules', ARRAY['cursor', 'ml', 'tensorflow', 'pytorch'], false, true),
('Cursor Security Audit Rules', 'Security-focused Cursor configuration for vulnerability assessment', 'Security audit configuration', 1600, 'Cursor Rules', ARRAY['cursor', 'security', 'audit', 'vulnerability'], false, true),
('Cursor Performance Optimization Rules', 'Cursor rules focused on application performance and optimization', 'Performance optimization configuration', 1500, 'Cursor Rules', ARRAY['cursor', 'performance', 'optimization', 'profiling'], false, true),
('Cursor Cloud Development Rules', 'Cursor configuration for AWS, Azure, and GCP cloud development', 'Cloud development rules for Cursor', 1700, 'Cursor Rules', ARRAY['cursor', 'cloud', 'aws', 'azure', 'gcp'], false, true),
('Cursor E-commerce Development Rules', 'Specialized Cursor rules for e-commerce platform development', 'E-commerce development configuration', 1800, 'Cursor Rules', ARRAY['cursor', 'ecommerce', 'payment', 'shopify'], false, true),
('Cursor Content Management Rules', 'Cursor configuration for CMS and content-driven applications', 'CMS development rules for Cursor', 1400, 'Cursor Rules', ARRAY['cursor', 'cms', 'content', 'headless'], false, true),
('Cursor IoT Development Rules', 'Cursor rules for Internet of Things and embedded systems development', 'IoT development configuration', 1900, 'Cursor Rules', ARRAY['cursor', 'iot', 'embedded', 'sensors'], false, true),
('Cursor Accessibility Rules', 'Cursor configuration focused on web accessibility and inclusive design', 'Accessibility development configuration', 1300, 'Cursor Rules', ARRAY['cursor', 'accessibility', 'a11y', 'inclusive'], false, true),
('Cursor SEO Optimization Rules', 'Cursor rules for SEO-optimized web development and content creation', 'SEO optimization configuration', 1200, 'Cursor Rules', ARRAY['cursor', 'seo', 'optimization', 'content'], false, true),
('Cursor Progressive Web App Rules', 'Cursor configuration for PWA development and offline capabilities', 'PWA development rules for Cursor', 1600, 'Cursor Rules', ARRAY['cursor', 'pwa', 'offline', 'serviceworker'], false, true);

-- System Prompts (need 15 more to reach 18)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('GPT-4 Code Review Prompts', 'Professional system prompts for AI-powered code review and analysis', 'AI code review system prompts', 800, 'System Prompts', ARRAY['gpt4', 'code-review', 'analysis', 'quality'], false, true),
('AI Content Creation Prompts', 'System prompts for generating high-quality marketing and technical content', 'Content creation system prompts', 600, 'System Prompts', ARRAY['content', 'marketing', 'copywriting', 'technical'], false, true),
('AI Database Design Prompts', 'Specialized prompts for database schema design and optimization', 'Database design system prompts', 900, 'System Prompts', ARRAY['database', 'schema', 'optimization', 'sql'], false, true),
('AI Security Analysis Prompts', 'System prompts for cybersecurity analysis and threat detection', 'Security analysis system prompts', 1200, 'System Prompts', ARRAY['security', 'cybersecurity', 'threat', 'analysis'], false, true),
('AI Business Strategy Prompts', 'Strategic business analysis and planning system prompts', 'Business strategy system prompts', 1000, 'System Prompts', ARRAY['business', 'strategy', 'planning', 'analysis'], false, true),
('AI Technical Documentation Prompts', 'System prompts for generating comprehensive technical documentation', 'Technical documentation prompts', 700, 'System Prompts', ARRAY['documentation', 'technical', 'api', 'guides'], false, true),
('AI Data Analysis Prompts', 'Prompts for data science and analytics workflows', 'Data analysis system prompts', 1100, 'System Prompts', ARRAY['data', 'analytics', 'insights', 'reporting'], false, true),
('AI Project Management Prompts', 'System prompts for project planning and management tasks', 'Project management system prompts', 800, 'System Prompts', ARRAY['project', 'management', 'planning', 'agile'], false, true),
('AI UI/UX Design Prompts', 'Design-focused system prompts for user interface and experience', 'UI/UX design system prompts', 900, 'System Prompts', ARRAY['design', 'ui', 'ux', 'wireframes'], false, true),
('AI Marketing Automation Prompts', 'System prompts for marketing campaign and automation strategies', 'Marketing automation prompts', 1000, 'System Prompts', ARRAY['marketing', 'automation', 'campaigns', 'conversion'], false, true),
('AI Financial Analysis Prompts', 'Prompts for financial modeling and business analysis', 'Financial analysis system prompts', 1300, 'System Prompts', ARRAY['finance', 'modeling', 'analysis', 'forecasting'], false, true),
('AI Customer Support Prompts', 'System prompts for customer service and support automation', 'Customer support system prompts', 700, 'System Prompts', ARRAY['support', 'customer', 'service', 'automation'], false, true),
('AI Legal Document Prompts', 'Specialized prompts for legal document analysis and drafting', 'Legal document system prompts', 1500, 'System Prompts', ARRAY['legal', 'contracts', 'compliance', 'analysis'], false, true),
('AI Research Assistant Prompts', 'Academic and market research system prompts', 'Research assistant system prompts', 800, 'System Prompts', ARRAY['research', 'academic', 'market', 'insights'], false, true),
('AI Quality Assurance Prompts', 'System prompts for QA testing and quality control processes', 'QA testing system prompts', 900, 'System Prompts', ARRAY['qa', 'testing', 'quality', 'automation'], false, true);

-- Agent Instructions (need 14 more to reach 15)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('GitHub Copilot Agent Instructions', 'Specialized instructions for optimizing GitHub Copilot performance', 'GitHub Copilot optimization instructions', 500, 'Agent Instructions', ARRAY['github', 'copilot', 'optimization', 'coding'], false, true),
('ChatGPT Development Agent Instructions', 'Instructions for using ChatGPT as a development assistant', 'ChatGPT development instructions', 400, 'Agent Instructions', ARRAY['chatgpt', 'development', 'assistant', 'coding'], false, true),
('Claude Code Review Agent Instructions', 'Specialized Claude instructions for code review workflows', 'Claude code review instructions', 600, 'Agent Instructions', ARRAY['claude', 'code-review', 'quality', 'analysis'], false, true),
('AI Testing Assistant Instructions', 'Agent instructions for automated testing and QA workflows', 'AI testing assistant instructions', 550, 'Agent Instructions', ARRAY['testing', 'qa', 'automation', 'assistant'], false, true),
('AI Documentation Agent Instructions', 'Instructions for AI agents focused on documentation generation', 'Documentation generation instructions', 450, 'Agent Instructions', ARRAY['documentation', 'generation', 'technical', 'api'], false, true),
('AI Debugging Assistant Instructions', 'Specialized instructions for AI-powered debugging workflows', 'AI debugging assistant instructions', 700, 'Agent Instructions', ARRAY['debugging', 'troubleshooting', 'assistant', 'analysis'], false, true),
('AI Refactoring Agent Instructions', 'Instructions for code refactoring and optimization agents', 'Code refactoring agent instructions', 650, 'Agent Instructions', ARRAY['refactoring', 'optimization', 'clean-code', 'patterns'], false, true),
('AI Security Audit Instructions', 'Agent instructions for security auditing and vulnerability assessment', 'Security audit agent instructions', 800, 'Agent Instructions', ARRAY['security', 'audit', 'vulnerability', 'assessment'], false, true),
('AI Performance Analysis Instructions', 'Instructions for performance monitoring and optimization agents', 'Performance analysis instructions', 600, 'Agent Instructions', ARRAY['performance', 'monitoring', 'optimization', 'profiling'], false, true),
('AI Database Optimization Instructions', 'Specialized instructions for database optimization agents', 'Database optimization instructions', 750, 'Agent Instructions', ARRAY['database', 'optimization', 'performance', 'sql'], false, true),
('AI API Design Instructions', 'Agent instructions for REST and GraphQL API design', 'API design agent instructions', 550, 'Agent Instructions', ARRAY['api', 'design', 'rest', 'graphql'], false, true),
('AI DevOps Assistant Instructions', 'Instructions for DevOps automation and CI/CD agents', 'DevOps assistant instructions', 700, 'Agent Instructions', ARRAY['devops', 'cicd', 'automation', 'deployment'], false, true),
('AI Code Migration Instructions', 'Specialized instructions for code migration and modernization', 'Code migration agent instructions', 850, 'Agent Instructions', ARRAY['migration', 'modernization', 'legacy', 'upgrade'], false, true),
('AI Architecture Review Instructions', 'Instructions for software architecture analysis agents', 'Architecture review instructions', 900, 'Agent Instructions', ARRAY['architecture', 'review', 'patterns', 'design'], false, true);

-- Workflow Automation (need 11 more to reach 12)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('CI/CD Pipeline Automation', 'Complete automation templates for continuous integration and deployment', 'CI/CD automation templates', 1200, 'Workflow Automation', ARRAY['cicd', 'automation', 'deployment', 'pipeline'], false, true),
('Code Quality Automation Workflows', 'Automated workflows for code quality checking and enforcement', 'Code quality automation workflows', 800, 'Workflow Automation', ARRAY['quality', 'automation', 'linting', 'testing'], false, true),
('Database Migration Automation', 'Automated database migration and versioning workflows', 'Database migration automation', 1000, 'Workflow Automation', ARRAY['database', 'migration', 'versioning', 'automation'], false, true),
('Security Scanning Automation', 'Automated security scanning and vulnerability assessment workflows', 'Security scanning automation', 1100, 'Workflow Automation', ARRAY['security', 'scanning', 'vulnerability', 'automation'], false, true),
('Performance Testing Automation', 'Automated performance testing and monitoring workflows', 'Performance testing automation', 900, 'Workflow Automation', ARRAY['performance', 'testing', 'monitoring', 'automation'], false, true),
('Documentation Generation Automation', 'Automated API and code documentation generation workflows', 'Documentation automation workflows', 700, 'Workflow Automation', ARRAY['documentation', 'generation', 'api', 'automation'], false, true),
('Environment Provisioning Automation', 'Automated development and production environment setup', 'Environment automation workflows', 1300, 'Workflow Automation', ARRAY['environment', 'provisioning', 'infrastructure', 'automation'], false, true),
('Backup and Recovery Automation', 'Automated backup and disaster recovery workflows', 'Backup automation workflows', 1000, 'Workflow Automation', ARRAY['backup', 'recovery', 'disaster', 'automation'], false, true),
('Monitoring and Alerting Automation', 'Automated monitoring and alerting system workflows', 'Monitoring automation workflows', 850, 'Workflow Automation', ARRAY['monitoring', 'alerting', 'notifications', 'automation'], false, true),
('Release Management Automation', 'Automated release planning and deployment workflows', 'Release automation workflows', 1100, 'Workflow Automation', ARRAY['release', 'deployment', 'planning', 'automation'], false, true),
('Cross-Platform Build Automation', 'Automated multi-platform build and distribution workflows', 'Build automation workflows', 950, 'Workflow Automation', ARRAY['build', 'cross-platform', 'distribution', 'automation'], false, true);

-- Development Tools (need 17 more to reach 21)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('VS Code Extensions Bundle', 'Curated collection of VS Code extensions for productivity', 'VS Code productivity extensions', 300, 'Development Tools', ARRAY['vscode', 'extensions', 'productivity', 'ide'], false, true),
('Git Workflow Tools', 'Advanced Git workflows and automation tools for team collaboration', 'Git workflow automation tools', 450, 'Development Tools', ARRAY['git', 'workflow', 'collaboration', 'version-control'], false, true),
('API Testing Toolkit', 'Comprehensive API testing and documentation tools', 'API testing and documentation toolkit', 600, 'Development Tools', ARRAY['api', 'testing', 'documentation', 'postman'], false, true),
('Database Design Tools', 'Visual database design and modeling tools collection', 'Database design and modeling tools', 550, 'Development Tools', ARRAY['database', 'design', 'modeling', 'erd'], false, true),
('Mobile Development Toolkit', 'Cross-platform mobile development tools and utilities', 'Mobile development toolkit', 800, 'Development Tools', ARRAY['mobile', 'cross-platform', 'react-native', 'flutter'], false, true),
('Performance Monitoring Tools', 'Application performance monitoring and optimization tools', 'Performance monitoring toolkit', 700, 'Development Tools', ARRAY['performance', 'monitoring', 'optimization', 'profiling'], false, true),
('Security Analysis Tools', 'Static and dynamic security analysis tools for applications', 'Security analysis toolkit', 900, 'Development Tools', ARRAY['security', 'analysis', 'static', 'dynamic'], false, true),
('Frontend Build Tools', 'Modern frontend build and optimization tool configurations', 'Frontend build optimization tools', 400, 'Development Tools', ARRAY['frontend', 'build', 'webpack', 'vite'], false, true),
('Backend Development Toolkit', 'Server-side development tools and framework utilities', 'Backend development toolkit', 750, 'Development Tools', ARRAY['backend', 'server', 'api', 'framework'], false, true),
('Cloud Development Tools', 'Cloud-native development and deployment tools', 'Cloud development toolkit', 850, 'Development Tools', ARRAY['cloud', 'development', 'aws', 'docker'], false, true),
('Testing Automation Tools', 'Comprehensive testing automation and CI/CD tools', 'Testing automation toolkit', 650, 'Development Tools', ARRAY['testing', 'automation', 'ci', 'jest'], false, true),
('Code Quality Tools', 'Code analysis, linting, and quality enforcement tools', 'Code quality toolkit', 500, 'Development Tools', ARRAY['quality', 'linting', 'analysis', 'eslint'], false, true),
('DevOps Utilities Collection', 'Essential DevOps tools and automation utilities', 'DevOps utilities toolkit', 950, 'Development Tools', ARRAY['devops', 'utilities', 'automation', 'kubernetes'], false, true),
('Documentation Tools Suite', 'Technical documentation generation and management tools', 'Documentation tools suite', 400, 'Development Tools', ARRAY['documentation', 'generation', 'markdown', 'api-docs'], false, true),
('Debugging Tools Collection', 'Advanced debugging and profiling tools for applications', 'Debugging tools collection', 600, 'Development Tools', ARRAY['debugging', 'profiling', 'analysis', 'chrome-devtools'], false, true),
('Package Management Tools', 'Dependency management and package optimization tools', 'Package management toolkit', 350, 'Development Tools', ARRAY['package', 'dependency', 'npm', 'yarn'], false, true),
('Environment Management Tools', 'Development environment setup and management tools', 'Environment management toolkit', 500, 'Development Tools', ARRAY['environment', 'setup', 'docker', 'vagrant'], false, true);

-- Documentation (need 7 more to reach 9)
INSERT INTO products (title, description, short_description, price, category, tags, is_featured, is_active) VALUES
('API Documentation Templates', 'Professional API documentation templates and examples', 'API documentation templates', 300, 'Documentation', ARRAY['api', 'documentation', 'templates', 'swagger'], false, true),
('Technical Writing Guidelines', 'Comprehensive technical writing standards and best practices', 'Technical writing guidelines', 250, 'Documentation', ARRAY['technical', 'writing', 'guidelines', 'standards'], false, true),
('Software Architecture Documentation', 'Templates for documenting software architecture and design', 'Architecture documentation templates', 400, 'Documentation', ARRAY['architecture', 'documentation', 'design', 'diagrams'], false, true),
('User Manual Templates', 'Professional user manual and help documentation templates', 'User manual templates', 200, 'Documentation', ARRAY['user', 'manual', 'help', 'guides'], false, true),
('Code Documentation Standards', 'Best practices for inline code documentation and comments', 'Code documentation standards', 180, 'Documentation', ARRAY['code', 'documentation', 'comments', 'standards'], false, true),
('Project Documentation Toolkit', 'Complete project documentation templates and workflows', 'Project documentation toolkit', 350, 'Documentation', ARRAY['project', 'documentation', 'workflow', 'templates'], false, true),
('Compliance Documentation Package', 'Documentation templates for regulatory and compliance requirements', 'Compliance documentation package', 500, 'Documentation', ARRAY['compliance', 'regulatory', 'documentation', 'audit'], false, true);