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
        className="absolute left-[4%] top-[28%] w-[28%] h-[42%] bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
        style={{ 
          transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
          transformOrigin: 'center center'
        }}
      >
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-cyan-400/40">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
          <span className="text-cyan-300/90 text-xs ml-2 font-mono">AIRules.tsx</span>
        </div>
        <TypingText 
          lines={codeSnippets} 
          className="text-cyan-300/95 text-[11px] leading-relaxed" 
          delay={3000}
          speed={70}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-500/5 pointer-events-none rounded-lg"></div>
      </motion.div>

      {/* Right monitor - Configuration */}
      <motion.div 
        className="absolute right-[4%] top-[28%] w-[28%] h-[42%] bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 shadow-lg shadow-green-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
        style={{ 
          transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
          transformOrigin: 'center center'
        }}
      >
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-green-400/40">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
          <span className="text-green-300/90 text-xs ml-2 font-mono">.cursorrules</span>
        </div>
        <TypingText 
          lines={codeSnippets2} 
          className="text-green-300/95 text-[11px] leading-relaxed" 
          delay={4500}
          speed={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-500/5 pointer-events-none rounded-lg"></div>
      </motion.div>

      {/* Ambient glow effects for monitors */}
      <motion.div 
        className="absolute left-[4%] top-[28%] w-[28%] h-[42%] bg-cyan-500/10 rounded-lg blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-[4%] top-[28%] w-[28%] h-[42%] bg-green-500/10 rounded-lg blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </>
  );
};