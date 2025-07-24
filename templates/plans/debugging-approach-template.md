# Debugging Approach Template

## Template Purpose
Systematic approach to debugging issues in web applications using available tools and methodologies.

## Debugging Workflow

### 1. Issue Identification
```markdown
## Problem Statement
- What is the expected behavior?
- What is the actual behavior?
- When did this issue start occurring?
- Is it reproducible? Under what conditions?

## Environment Details
- Browser: [BROWSER_INFO]
- Device: [DEVICE_INFO]
- User State: [AUTHENTICATED/GUEST]
- Network: [ONLINE/OFFLINE]
```

### 2. Initial Assessment
```markdown
## Quick Checks
- [ ] Check console for JavaScript errors
- [ ] Verify network requests are successful
- [ ] Confirm required data is loading
- [ ] Test in different browsers
- [ ] Clear cache and cookies
- [ ] Check responsive design

## Error Classification
- [ ] Frontend/JavaScript error
- [ ] Backend/API error
- [ ] Database/Query error
- [ ] Network/Connection error
- [ ] User interface/UX issue
- [ ] Performance issue
```

### 3. Data Gathering Phase
```markdown
## Console Logs Analysis
- Error messages: [ERROR_DETAILS]
- Warning messages: [WARNING_DETAILS]
- Network failures: [NETWORK_ISSUES]
- State inconsistencies: [STATE_ISSUES]

## Network Requests Review
- Failed requests: [FAILED_REQUESTS]
- Slow requests: [SLOW_REQUESTS]
- Authentication issues: [AUTH_ISSUES]
- CORS problems: [CORS_ISSUES]

## Database Investigation
- Query performance: [QUERY_ANALYSIS]
- Data integrity: [DATA_VALIDATION]
- Permission issues: [RLS_POLICY_CHECK]
- Missing data: [DATA_AVAILABILITY]
```

### 4. Root Cause Analysis
```markdown
## Hypothesis Formation
1. **Primary Hypothesis**: [MOST_LIKELY_CAUSE]
   - Evidence: [SUPPORTING_EVIDENCE]
   - Test: [VALIDATION_METHOD]

2. **Secondary Hypothesis**: [ALTERNATIVE_CAUSE]
   - Evidence: [SUPPORTING_EVIDENCE]
   - Test: [VALIDATION_METHOD]

## Investigation Steps
- [ ] Reproduce issue consistently
- [ ] Isolate variables one by one
- [ ] Test in minimal environment
- [ ] Check recent code changes
- [ ] Review related system logs
```

### 5. Solution Implementation
```markdown
## Fix Strategy
- **Immediate Fix**: [QUICK_SOLUTION]
- **Long-term Fix**: [PERMANENT_SOLUTION]
- **Prevention**: [PREVENTION_MEASURES]

## Implementation Steps
1. [IMPLEMENTATION_STEP_1]
2. [IMPLEMENTATION_STEP_2]
3. [IMPLEMENTATION_STEP_3]

## Testing Plan
- [ ] Unit tests for fix
- [ ] Integration tests
- [ ] Manual testing scenarios
- [ ] Performance impact assessment
- [ ] Cross-browser testing
```

### 6. Verification and Monitoring
```markdown
## Verification Checklist
- [ ] Issue no longer reproduces
- [ ] Related functionality still works
- [ ] Performance not degraded
- [ ] No new errors introduced
- [ ] User experience improved

## Monitoring Setup
- Error tracking: [MONITORING_TOOL]
- Performance metrics: [PERFORMANCE_TRACKING]
- User feedback: [FEEDBACK_MECHANISM]
- Log monitoring: [LOG_ANALYSIS]
```

## Common Debugging Scenarios

### React Component Issues
```markdown
## Investigation Steps
1. Check component props and state
2. Verify useEffect dependencies
3. Test component isolation
4. Review lifecycle methods
5. Check for memory leaks

## Common Causes
- Missing dependencies in useEffect
- Stale closures in event handlers
- Improper state updates
- Key prop issues in lists
- Prop drilling problems
```

### API Integration Issues
```markdown
## Investigation Steps
1. Test API endpoints directly
2. Check request/response formats
3. Verify authentication tokens
4. Review CORS configuration
5. Test network connectivity

## Common Causes
- Incorrect endpoint URLs
- Missing or invalid headers
- Authentication token expiry
- CORS policy restrictions
- Network connectivity issues
```

### Database Query Issues
```markdown
## Investigation Steps
1. Test queries in Supabase dashboard
2. Check RLS policies
3. Verify data types and constraints
4. Review query performance
5. Test with different user roles

## Common Causes
- RLS policy blocking access
- Incorrect foreign key relationships
- Missing indexes causing slow queries
- Data type mismatches
- Insufficient user permissions
```

## Tools and Resources

### Browser DevTools
```markdown
- Console: Error logs and debugging
- Network: Request/response analysis
- Elements: DOM inspection and styling
- Performance: Runtime performance analysis
- Application: Storage and service workers
```

### Code Analysis
```markdown
- ESLint: Code quality issues
- TypeScript: Type checking errors
- React DevTools: Component debugging
- Redux DevTools: State management
```

### External Tools
```markdown
- Supabase Dashboard: Database queries
- Network monitoring: Request analysis
- Error tracking: Production error logs
- Performance monitoring: Core web vitals
```

## Documentation Template
```markdown
## Issue Report
**Date**: [DATE]
**Reporter**: [REPORTER_NAME]
**Severity**: [HIGH/MEDIUM/LOW]

### Problem Description
[DETAILED_DESCRIPTION]

### Steps to Reproduce
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

### Root Cause
[ROOT_CAUSE_ANALYSIS]

### Solution Implemented
[SOLUTION_DESCRIPTION]

### Prevention Measures
[PREVENTION_STEPS]
```