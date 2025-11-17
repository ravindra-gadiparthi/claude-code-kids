# 🧪 Comprehensive Test Cases - Kids Learning Platform

## Test Coverage Overview

| Test Type | Priority | Current Coverage | Target Coverage |
|-----------|----------|------------------|-----------------|
| Unit Tests | P0 | 0% | 80%+ |
| Integration Tests | P1 | 0% | 70%+ |
| E2E Tests | P1 | 0% | 100% critical paths |
| Accessibility Tests | P0 | 0% | WCAG 2.1 AA |
| Performance Tests | P2 | 0% | 100% |
| Security Tests | P0 | 0% | OWASP Top 10 |

---

## 1. Unit Tests

### 1.1 Progress Context Tests

**File**: `app/context/ProgressContext.tsx`

#### Test: Progress Initialization
```typescript
describe('ProgressContext', () => {
  test('should initialize with null progress', () => {
    // GIVEN: Fresh context
    // WHEN: Context is rendered
    // THEN: progress should be null
  });

  test('should load progress from localStorage on mount', () => {
    // GIVEN: Progress data exists in localStorage
    // WHEN: Context initializes
    // THEN: Should load and set progress from localStorage
  });

  test('should handle corrupt localStorage data gracefully', () => {
    // GIVEN: Invalid JSON in localStorage
    // WHEN: Context tries to load
    // THEN: Should not crash, should default to null
  });
});
```

#### Test: Add Points
```typescript
describe('addPoints', () => {
  test('should add points to existing total', () => {
    // GIVEN: User with 50 points
    // WHEN: addPoints(30) is called
    // THEN: Total should be 80
  });

  test('should handle negative points', () => {
    // GIVEN: User with 100 points
    // WHEN: addPoints(-20) is called
    // THEN: Should either reject or handle gracefully
  });

  test('should update localStorage after adding points', () => {
    // GIVEN: Active user
    // WHEN: Points are added
    // THEN: localStorage should be updated
  });
});
```

#### Test: Streak Management
```typescript
describe('updateStreak', () => {
  test('should increment streak for consecutive days', () => {
    // GIVEN: User played yesterday (streak: 5)
    // WHEN: updateStreak() called today
    // THEN: Streak should be 6
  });

  test('should reset streak if gap > 1 day', () => {
    // GIVEN: User played 3 days ago (streak: 10)
    // WHEN: updateStreak() called today
    // THEN: Streak should reset to 1
  });

  test('should not change streak if already played today', () => {
    // GIVEN: User already played today (streak: 3)
    // WHEN: updateStreak() called again
    // THEN: Streak should remain 3
  });
});
```

#### Test: Badge Management
```typescript
describe('addBadge', () => {
  test('should add new badge to empty list', () => {
    // GIVEN: User with no badges
    // WHEN: addBadge('first-star') called
    // THEN: badges should contain 'first-star'
  });

  test('should not duplicate badges', () => {
    // GIVEN: User already has 'first-star'
    // WHEN: addBadge('first-star') called again
    // THEN: badges should still have only one 'first-star'
  });
});
```

---

### 1.2 Challenge Data Tests

**File**: `app/data/challenges.ts`

#### Test: Data Integrity
```typescript
describe('Challenges Data', () => {
  test('should have unique IDs for all challenges', () => {
    // GIVEN: All challenges
    // WHEN: Checking IDs
    // THEN: No duplicate IDs should exist
  });

  test('should have valid correctAnswer in options', () => {
    // GIVEN: All challenges
    // WHEN: Checking correctAnswer
    // THEN: correctAnswer must be in options array
  });

  test('should have appropriate points for difficulty', () => {
    // GIVEN: All challenges
    // WHEN: Checking points vs difficulty
    // THEN: Higher difficulty should have more points
  });
});
```

#### Test: getChallengesBySubjectAndAge
```typescript
describe('getChallengesBySubjectAndAge', () => {
  test('should return only math challenges for math subject', () => {
    // GIVEN: Subject is 'math', age is '3-5'
    // WHEN: getChallengesBySubjectAndAge('math', '3-5')
    // THEN: All returned challenges should have subject: 'math'
  });

  test('should return only age-appropriate challenges', () => {
    // GIVEN: Age group is '6-8'
    // WHEN: getChallengesBySubjectAndAge('reading', '6-8')
    // THEN: All challenges should have ageGroup: '6-8'
  });

  test('should return empty array for invalid subject', () => {
    // GIVEN: Invalid subject 'invalid'
    // WHEN: getChallengesBySubjectAndAge('invalid', '3-5')
    // THEN: Should return []
  });

  test('should have balanced content across age groups', () => {
    // GIVEN: All subjects
    // WHEN: Counting challenges per age group
    // THEN: Each age group should have similar counts (±20%)
  });
});
```

---

### 1.3 Sound Utility Tests

**File**: `app/utils/sounds.ts`

#### Test: Sound Functions
```typescript
describe('Sound Effects', () => {
  test('playSuccessSound should not crash', () => {
    // GIVEN: AudioContext available
    // WHEN: playSuccessSound() called
    // THEN: Should execute without errors
  });

  test('should handle AudioContext not available', () => {
    // GIVEN: AudioContext is undefined (old browser)
    // WHEN: playSuccessSound() called
    // THEN: Should not crash, should log message
  });

  test('getRandomEncouragement should return valid message', () => {
    // GIVEN: encouragingMessages array
    // WHEN: getRandomEncouragement() called
    // THEN: Should return one of the messages
  });

  test('getRandomEncouragement should return different messages', () => {
    // GIVEN: Function called 100 times
    // WHEN: Collecting results
    // THEN: Should have variety (at least 50% unique)
  });
});
```

---

## 2. Component Tests

### 2.1 WelcomeScreen Component

**File**: `app/components/WelcomeScreen.tsx`

#### Test: Rendering
```typescript
describe('WelcomeScreen', () => {
  test('should render welcome message', () => {
    // GIVEN: Component rendered
    // WHEN: Checking DOM
    // THEN: Should display "Kids Learning Adventure!"
  });

  test('should render all age group buttons', () => {
    // GIVEN: Component rendered
    // WHEN: Checking buttons
    // THEN: Should have buttons for 3-5, 6-8, 9-10
  });
});
```

#### Test: User Interactions
```typescript
describe('WelcomeScreen Interactions', () => {
  test('should update name input', () => {
    // GIVEN: Name input field
    // WHEN: User types "Alice"
    // THEN: Input value should be "Alice"
  });

  test('should select age group on click', () => {
    // GIVEN: Age group buttons
    // WHEN: User clicks "6-8"
    // THEN: Button should be highlighted
  });

  test('should enable start button when name and age selected', () => {
    // GIVEN: Name entered and age selected
    // WHEN: Checking start button
    // THEN: Button should be enabled
  });

  test('should disable start button when name is empty', () => {
    // GIVEN: Age selected but no name
    // WHEN: Checking start button
    // THEN: Button should be disabled
  });

  test('should call setProgress with correct data on start', () => {
    // GIVEN: Name "Bob" and age "3-5" selected
    // WHEN: Start button clicked
    // THEN: setProgress called with {name: "Bob", ageGroup: "3-5", ...}
  });
});
```

#### Test: Input Validation
```typescript
describe('WelcomeScreen Validation', () => {
  test('should limit name length to 20 characters', () => {
    // GIVEN: Name input
    // WHEN: User tries to type 25 characters
    // THEN: Should only accept first 20
  });

  test('should sanitize special characters in name', () => {
    // GIVEN: Name input
    // WHEN: User types "<script>alert('xss')</script>"
    // THEN: Should sanitize or reject
  });

  test('should trim whitespace from name', () => {
    // GIVEN: Name input "  Alice  "
    // WHEN: Start clicked
    // THEN: Should save as "Alice"
  });
});
```

---

### 2.2 Dashboard Component

**File**: `app/components/Dashboard.tsx`

#### Test: Progress Display
```typescript
describe('Dashboard', () => {
  test('should display user name', () => {
    // GIVEN: User "Alice" logged in
    // WHEN: Dashboard rendered
    // THEN: Should show "Welcome back, Alice!"
  });

  test('should display correct point total', () => {
    // GIVEN: User has 150 points
    // WHEN: Dashboard rendered
    // THEN: Should display "150" in points card
  });

  test('should display stars count', () => {
    // GIVEN: User has 12 stars
    // WHEN: Dashboard rendered
    // THEN: Should display "12" in stars card
  });

  test('should display current streak', () => {
    // GIVEN: User has 7-day streak
    // WHEN: Dashboard rendered
    // THEN: Should display "7" in streak card
  });
});
```

---

### 2.3 SubjectSelector Component

**File**: `app/components/SubjectSelector.tsx`

#### Test: Subject Cards
```typescript
describe('SubjectSelector', () => {
  test('should render all 4 subject cards', () => {
    // GIVEN: Component rendered
    // WHEN: Checking DOM
    // THEN: Should have Math, Reading, Science, Art cards
  });

  test('should call onSelectSubject when card clicked', () => {
    // GIVEN: onSelectSubject mock function
    // WHEN: Math card clicked
    // THEN: onSelectSubject('math') should be called
  });

  test('should display achievement badges', () => {
    // GIVEN: Component rendered
    // WHEN: Checking achievements section
    // THEN: Should display badge icons
  });
});
```

---

### 2.4 ChallengeScreen Component

**File**: `app/components/ChallengeScreen.tsx`

#### Test: Challenge Display
```typescript
describe('ChallengeScreen', () => {
  test('should display challenge question', () => {
    // GIVEN: Math challenge for ages 3-5
    // WHEN: Component rendered
    // THEN: Should display challenge question text
  });

  test('should display all answer options', () => {
    // GIVEN: Challenge with 4 options
    // WHEN: Component rendered
    // THEN: Should render 4 option buttons
  });

  test('should display progress (1/5)', () => {
    // GIVEN: First challenge of 5
    // WHEN: Component rendered
    // THEN: Should show "1 / 5"
  });
});
```

#### Test: Answer Selection
```typescript
describe('ChallengeScreen - Answer Logic', () => {
  test('should highlight selected answer', () => {
    // GIVEN: Challenge displayed
    // WHEN: User clicks option "3"
    // THEN: Option "3" button should be highlighted
  });

  test('should show correct feedback for right answer', () => {
    // GIVEN: Challenge with correctAnswer "3"
    // WHEN: User selects "3"
    // THEN: Should show "Awesome! You got it!" and green background
  });

  test('should show encouraging feedback for wrong answer', () => {
    // GIVEN: Challenge with correctAnswer "3"
    // WHEN: User selects "2"
    // THEN: Should show "Good try!" and display correct answer
  });

  test('should disable options after answer selected', () => {
    // GIVEN: Answer selected
    // WHEN: Checking option buttons
    // THEN: All buttons should be disabled
  });

  test('should play success sound for correct answer', () => {
    // GIVEN: playSuccessSound mock
    // WHEN: Correct answer selected
    // THEN: playSuccessSound should be called
  });

  test('should add points for correct answer', () => {
    // GIVEN: Challenge worth 10 points
    // WHEN: Correct answer selected
    // THEN: addPoints(10) should be called
  });

  test('should not add points for wrong answer', () => {
    // GIVEN: Challenge worth 10 points
    // WHEN: Wrong answer selected
    // THEN: addPoints should not be called
  });
});
```

#### Test: Navigation
```typescript
describe('ChallengeScreen - Navigation', () => {
  test('should show Next button after answer', () => {
    // GIVEN: Answer selected (correct or wrong)
    // WHEN: Result displayed
    // THEN: "Next Challenge!" button should appear
  });

  test('should move to next challenge on Next click', () => {
    // GIVEN: On challenge 1 of 5
    // WHEN: Next button clicked
    // THEN: Should display challenge 2
  });

  test('should show completion screen after last challenge', () => {
    // GIVEN: On last challenge (5/5)
    // WHEN: Next button clicked
    // THEN: Should show "Great Job!" completion screen
  });

  test('should navigate back to subjects on Back click', () => {
    // GIVEN: onBack mock function
    // WHEN: Back button clicked
    // THEN: onBack() should be called
  });
});
```

#### Test: Progress Bar
```typescript
describe('ChallengeScreen - Progress Bar', () => {
  test('should show 0% at start', () => {
    // GIVEN: On first challenge (not answered)
    // WHEN: Checking progress bar
    // THEN: Width should be "0%"
  });

  test('should show 20% after 1 of 5 challenges', () => {
    // GIVEN: Completed 1 of 5 challenges
    // WHEN: Checking progress bar
    // THEN: Width should be "20%"
  });

  test('should show 100% after all challenges', () => {
    // GIVEN: Completed 5 of 5 challenges
    // WHEN: Checking progress bar
    // THEN: Width should be "100%"
  });
});
```

---

## 3. Integration Tests

### 3.1 Complete User Flow

#### Test: New User Journey
```typescript
describe('New User Complete Flow', () => {
  test('should complete full journey from welcome to challenge completion', async () => {
    // GIVEN: Fresh app (no localStorage)

    // WHEN: User opens app
    // THEN: Should see WelcomeScreen

    // WHEN: User enters name "Alice" and selects age "3-5"
    // THEN: Start button should be enabled

    // WHEN: User clicks Start
    // THEN: Should see Dashboard with "Alice" and 0 points

    // WHEN: User clicks "Math Adventure"
    // THEN: Should see first math challenge for ages 3-5

    // WHEN: User selects correct answer
    // THEN: Should see success message and points increase

    // WHEN: User clicks Next
    // THEN: Should see second challenge

    // WHEN: User completes all 5 challenges
    // THEN: Should see completion screen

    // WHEN: User clicks "Back to Subjects"
    // THEN: Should see Dashboard with updated points
  });
});
```

#### Test: Returning User Journey
```typescript
describe('Returning User Flow', () => {
  test('should load saved progress and continue', async () => {
    // GIVEN: localStorage has progress (Alice, 50 points, 3-day streak)

    // WHEN: User opens app
    // THEN: Should skip WelcomeScreen, go to Dashboard

    // WHEN: Checking Dashboard
    // THEN: Should show "Alice", 50 points, 3-day streak

    // WHEN: User starts challenge
    // THEN: Should continue adding to existing points
  });
});
```

### 3.2 Cross-Component State Management

#### Test: Progress Persistence
```typescript
describe('Progress Persistence', () => {
  test('should persist progress across page refreshes', async () => {
    // GIVEN: User "Bob" with 100 points
    // WHEN: Page is refreshed
    // THEN: Progress should be restored from localStorage
  });

  test('should handle localStorage quota exceeded', async () => {
    // GIVEN: localStorage is full
    // WHEN: Trying to save progress
    // THEN: Should show error message, degrade gracefully
  });

  test('should handle localStorage disabled/blocked', async () => {
    // GIVEN: localStorage is blocked (private browsing)
    // WHEN: App starts
    // THEN: Should work with in-memory storage, warn user
  });
});
```

---

## 4. End-to-End (E2E) Tests

### 4.1 Critical User Paths

#### Test: First Time User - Math Challenge
```typescript
describe('E2E: First Time User - Math', () => {
  test('should complete full math challenge flow', async () => {
    await page.goto('http://localhost:3000');

    // Welcome screen
    await page.fill('input[placeholder*="name"]', 'TestUser');
    await page.click('text=6-8 years');
    await page.click('text=Start Learning!');

    // Dashboard
    await expect(page.locator('text=Welcome back, TestUser')).toBeVisible();
    await page.click('text=Math Adventure');

    // Challenge
    await expect(page.locator('text=/\\d+ \\/ \\d+/')).toBeVisible();

    // Answer question
    const options = page.locator('button').filter({ hasText: /^\d+$/ });
    await options.first().click();

    // Check feedback
    await expect(page.locator('text=/Awesome|Good try/')).toBeVisible();

    // Next challenge
    await page.click('text=Next Challenge!');

    // Complete remaining
    // ... continue for all challenges
  });
});
```

#### Test: Multi-Subject Completion
```typescript
describe('E2E: Multi-Subject Session', () => {
  test('should complete challenges across all 4 subjects', async () => {
    // Test completing 1 challenge from each subject
    // Verify points accumulate correctly
    // Verify stars increase
    // Verify challenge completion tracking
  });
});
```

### 4.2 Browser Compatibility

```typescript
describe('E2E: Cross-Browser', () => {
  test.each(['chromium', 'firefox', 'webkit'])
    ('should work in %s', async (browserType) => {
      // Test core functionality in each browser
    });
});
```

### 4.3 Responsive Design

```typescript
describe('E2E: Responsive', () => {
  test('should work on mobile viewport (375x667)', async () => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Test touch interactions
    // Verify layouts adapt
  });

  test('should work on tablet viewport (768x1024)', async () => {
    await page.setViewportSize({ width: 768, height: 1024 });
    // Test tablet experience
  });

  test('should work on desktop viewport (1920x1080)', async () => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    // Test desktop experience
  });
});
```

---

## 5. Accessibility Tests

### 5.1 Keyboard Navigation

```typescript
describe('Accessibility: Keyboard Nav', () => {
  test('should navigate welcome screen with keyboard only', async () => {
    // GIVEN: Welcome screen displayed
    // WHEN: Using Tab key
    // THEN: Should focus on name input, age buttons, start button in order
  });

  test('should select answers with keyboard', async () => {
    // GIVEN: Challenge displayed
    // WHEN: Using Tab and Enter keys
    // THEN: Should be able to select answer without mouse
  });

  test('should navigate subjects with keyboard', async () => {
    // GIVEN: Dashboard displayed
    // WHEN: Using Tab and Enter
    // THEN: Should be able to select subject
  });
});
```

### 5.2 Screen Reader Support

```typescript
describe('Accessibility: Screen Reader', () => {
  test('should have proper ARIA labels', async () => {
    // GIVEN: Any screen
    // WHEN: Checking ARIA attributes
    // THEN: Interactive elements should have aria-label or aria-labelledby
  });

  test('should announce challenge questions', async () => {
    // GIVEN: Challenge screen
    // WHEN: Screen reader active
    // THEN: Question should be readable
  });

  test('should announce feedback messages', async () => {
    // GIVEN: Answer selected
    // WHEN: Screen reader active
    // THEN: Success/encouragement message should be announced
  });
});
```

### 5.3 WCAG Compliance

```typescript
describe('Accessibility: WCAG 2.1 AA', () => {
  test('should have sufficient color contrast', async () => {
    // Test all text/background combinations
    // Minimum contrast ratio: 4.5:1 for normal text
  });

  test('should not rely solely on color', async () => {
    // Correct/incorrect should have icons + color
  });

  test('should have resizable text', async () => {
    // Text should remain readable at 200% zoom
  });

  test('should pass axe accessibility audit', async () => {
    const results = await injectAxe(page);
    expect(results.violations).toHaveLength(0);
  });
});
```

---

## 6. Performance Tests

### 6.1 Load Time

```typescript
describe('Performance: Load Time', () => {
  test('should load initial page in < 2 seconds', async () => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test('should have First Contentful Paint < 1.5s', async () => {
    const metrics = await page.metrics();
    expect(metrics.FirstContentfulPaint).toBeLessThan(1500);
  });
});
```

### 6.2 Bundle Size

```typescript
describe('Performance: Bundle Size', () => {
  test('should have main bundle < 100 KB', async () => {
    // Check main-*.js size
    // Target: < 100 KB gzipped
  });

  test('should lazy load challenge data', async () => {
    // Only load challenges for selected subject/age
  });
});
```

### 6.3 Memory Leaks

```typescript
describe('Performance: Memory', () => {
  test('should not leak memory over 100 challenges', async () => {
    const initialMemory = await getMemoryUsage();

    // Complete 100 challenges
    for (let i = 0; i < 100; i++) {
      // ... complete challenge
    }

    const finalMemory = await getMemoryUsage();
    const increase = finalMemory - initialMemory;

    // Memory should not increase more than 10 MB
    expect(increase).toBeLessThan(10 * 1024 * 1024);
  });
});
```

---

## 7. Security Tests

### 7.1 XSS Prevention

```typescript
describe('Security: XSS', () => {
  test('should sanitize name input', async () => {
    // GIVEN: Name input
    // WHEN: User enters "<script>alert('xss')</script>"
    // THEN: Should not execute script
  });

  test('should escape user data in DOM', async () => {
    // GIVEN: User name with HTML tags
    // WHEN: Rendered in dashboard
    // THEN: Should display as text, not render HTML
  });
});
```

### 7.2 Data Security

```typescript
describe('Security: Data Protection', () => {
  test('should not expose sensitive data in console', async () => {
    // Check no sensitive data logged to console
  });

  test('should validate localStorage data integrity', async () => {
    // GIVEN: Modified localStorage (tampering attempt)
    // WHEN: App loads
    // THEN: Should detect invalid data, reset gracefully
  });
});
```

---

## 8. Edge Cases & Error Handling

### 8.1 Network Issues

```typescript
describe('Edge Cases: Network', () => {
  test('should work offline (after initial load)', async () => {
    // GIVEN: App loaded
    // WHEN: Network disconnected
    // THEN: Should continue working (no external dependencies)
  });

  test('should handle slow network gracefully', async () => {
    // GIVEN: Throttled network (3G)
    // WHEN: Loading app
    // THEN: Should show loading state, complete within 5s
  });
});
```

### 8.2 Browser Edge Cases

```typescript
describe('Edge Cases: Browser', () => {
  test('should handle disabled JavaScript gracefully', async () => {
    // GIVEN: JS disabled
    // WHEN: App accessed
    // THEN: Should show helpful message (noscript tag)
  });

  test('should handle old browser (no ES6)', async () => {
    // Test with polyfills or show browser update message
  });

  test('should handle localStorage disabled', async () => {
    // GIVEN: Private browsing (localStorage unavailable)
    // WHEN: Using app
    // THEN: Should work with in-memory storage, warn about no persistence
  });
});
```

### 8.3 Data Edge Cases

```typescript
describe('Edge Cases: Data', () => {
  test('should handle missing challenge data', async () => {
    // GIVEN: Challenge file corrupted/missing
    // WHEN: Loading challenges
    // THEN: Should show error message, not crash
  });

  test('should handle challenge with no options', async () => {
    // GIVEN: Malformed challenge (options: [])
    // WHEN: Rendering challenge
    // THEN: Should skip or show error, not crash
  });

  test('should handle very long names', async () => {
    // GIVEN: Name with 50+ characters (if limit not enforced)
    // WHEN: Displaying name
    // THEN: Should truncate or wrap gracefully
  });
});
```

---

## 9. Regression Tests

### 9.1 Bug Reproduction Tests

```typescript
describe('Regression: Fixed Bugs', () => {
  test('BUG-001: Streak resets incorrectly on midnight', async () => {
    // GIVEN: User plays at 11:59 PM
    // WHEN: Clock strikes midnight
    // THEN: Streak should NOT reset until next day
  });

  test('BUG-002: Points overflow after 10000', async () => {
    // GIVEN: User has 9999 points
    // WHEN: Earning 10 more points
    // THEN: Should display 10009, not overflow
  });

  test('BUG-003: Sound plays multiple times', async () => {
    // GIVEN: Rapid clicking on answer
    // WHEN: Sound should play
    // THEN: Should play once, not multiple times
  });
});
```

---

## 10. Test Implementation Plan

### Phase 1: Unit Tests (Week 1)
- [ ] ProgressContext tests (15 tests)
- [ ] Challenge data tests (10 tests)
- [ ] Sound utility tests (6 tests)
- **Target**: 60% code coverage

### Phase 2: Component Tests (Week 2)
- [ ] WelcomeScreen tests (12 tests)
- [ ] Dashboard tests (8 tests)
- [ ] SubjectSelector tests (5 tests)
- [ ] ChallengeScreen tests (25 tests)
- **Target**: 75% code coverage

### Phase 3: Integration Tests (Week 3)
- [ ] User flow tests (5 tests)
- [ ] State persistence tests (4 tests)
- **Target**: All critical paths covered

### Phase 4: E2E Tests (Week 4)
- [ ] Critical user paths (3 tests)
- [ ] Cross-browser tests (3 tests)
- [ ] Responsive tests (3 tests)
- **Target**: 100% critical path coverage

### Phase 5: Accessibility & Performance (Week 5)
- [ ] Keyboard navigation (5 tests)
- [ ] Screen reader (4 tests)
- [ ] WCAG compliance (5 tests)
- [ ] Performance benchmarks (6 tests)
- **Target**: WCAG 2.1 AA compliance

### Phase 6: Security & Edge Cases (Week 6)
- [ ] XSS prevention (3 tests)
- [ ] Data security (2 tests)
- [ ] Network edge cases (3 tests)
- [ ] Browser edge cases (4 tests)
- [ ] Data edge cases (4 tests)
- **Target**: OWASP Top 10 covered

---

## 11. Test Infrastructure Setup

### Required Dependencies

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/user-event": "^14.5.1",
    "@playwright/test": "^1.40.0",
    "@axe-core/playwright": "^4.8.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@types/jest": "^29.5.8"
  }
}
```

### Configuration Files

**jest.config.js**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

**playwright.config.ts**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

## 12. CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npx playwright install
      - run: npm run test:e2e
      - run: npm run test:accessibility

  coverage:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

---

## 13. Success Metrics

### Test Quality Metrics
- **Code Coverage**: ≥ 80%
- **Test Pass Rate**: ≥ 98%
- **Test Execution Time**: < 5 minutes
- **Flaky Test Rate**: < 2%

### Quality Gates (Before Merge)
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Critical E2E paths pass
- [ ] No accessibility violations
- [ ] Code coverage ≥ 80%
- [ ] No security vulnerabilities (high/critical)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-17
**Total Test Cases**: 150+
**Estimated Setup Time**: 40 hours
**Estimated Maintenance**: 4 hours/week
