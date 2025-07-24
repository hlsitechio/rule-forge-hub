import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const codeSnippets = [
  "const AIRules = () => {",
  "  const [workflow, setWorkflow] = useState('optimized');",
  "  const generateRules = async () => {",
  "    const rules = await fetchPremiumRules();",
  "    return rules.filter(rule => rule.isActive);",
  "  };",
  "",
  "  useEffect(() => {",
  "    generateRules().then(rules => {",
  "      console.log('Rules loaded:', rules.length);",
  "    });",
  "  }, []);",
  "",
  "  return (",
  "    <div className='ai-marketplace'>",
  "      {rules.map(rule => (",
  "        <RuleCard key={rule.id} rule={rule} />",
  "      ))}",
  "    </div>",
  "  );",
  "};"
];

const codeSnippets2 = [
  "// AI Assistant Configuration",
  "export const cursorRules = {",
  "  behavior: 'precise',",
  "  codeQuality: 'enterprise',",
  "  testDriven: true,",
  "  maxFileLength: 300,",
  "",
  "  workflow: {",
  "    implement: 'exactly-as-requested',",
  "    scope: 'minimal-and-focused',",
  "    quality: 'production-ready'",
  "  },",
  "",
  "  standards: {",
  "    typescript: true,",
  "    testing: 'jest',",
  "    linting: 'eslint'",
  "  }",
  "};"
];

const codeSnippets3 = [
  "SELECT p.title, p.price, p.category",
  "FROM products p",
  "WHERE p.is_active = true",
  "  AND p.is_featured = true",
  "ORDER BY p.downloads_count DESC,",
  "         p.created_at DESC",
  "LIMIT 10;",
  "",
  "-- Update download count",
  "UPDATE products",
  "SET downloads_count = downloads_count + 1,",
  "    updated_at = NOW()",
  "WHERE id = $1",
  "RETURNING *;"
];

interface TypingTextProps {
  lines: string[];
  className?: string;
  delay?: number;
  speed?: number;
}

const TypingText = ({ lines, className = '', delay = 0, speed = 50 }: TypingTextProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex];
        if (currentCharIndex < currentLine.length) {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Move to next line
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
          setDisplayedLines(prev => [...prev, '']);
        }
      } else {
        // Reset animation after a pause
        setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
        }, 3000);
      }
    }, delay + speed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, lines, delay, speed]);

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      {displayedLines.map((line, index) => (
        <div key={index} className="whitespace-pre">
          {line}
          {index === currentLineIndex && currentCharIndex < lines[currentLineIndex]?.length && (
            <motion.span
              className="bg-accent/80 text-accent-foreground w-2 h-4 inline-block ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const CodingAnimation = () => {
  return (
    <>
      {/* Left monitor - React/TypeScript code */}
      <motion.div 
        className="absolute left-[8%] top-[25%] w-[25%] h-[40%] bg-gray-900/20 backdrop-blur-sm rounded-lg p-3 border border-accent/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-accent/20">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-accent/60 text-xs ml-2">AIRules.tsx</span>
        </div>
        <TypingText 
          lines={codeSnippets} 
          className="text-accent/80 text-[10px]" 
          delay={3000}
          speed={80}
        />
      </motion.div>

      {/* Center monitor - Configuration */}
      <motion.div 
        className="absolute left-[37%] top-[20%] w-[26%] h-[45%] bg-gray-900/20 backdrop-blur-sm rounded-lg p-3 border border-accent/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-accent/20">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-accent/60 text-xs ml-2">.cursorrules</span>
        </div>
        <TypingText 
          lines={codeSnippets2} 
          className="text-green-400/80 text-[10px]" 
          delay={4000}
          speed={60}
        />
      </motion.div>

      {/* Right monitor - Database queries */}
      <motion.div 
        className="absolute right-[8%] top-[25%] w-[25%] h-[40%] bg-gray-900/20 backdrop-blur-sm rounded-lg p-3 border border-accent/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-accent/20">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-accent/60 text-xs ml-2">queries.sql</span>
        </div>
        <TypingText 
          lines={codeSnippets3} 
          className="text-blue-400/80 text-[10px]" 
          delay={5000}
          speed={70}
        />
      </motion.div>
    </>
  );
};