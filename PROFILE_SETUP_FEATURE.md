# Student Profile Setup Feature

## Overview
The Profile Setup feature provides a comprehensive LinkedIn-style onboarding experience for new students after registration. This multi-step wizard guides students through setting up their profile with personal information and test scores (IELTS and Entry Tests).

## Features

### 1. **Three-Step Wizard Flow**
   - **Step 1: Profile Information**
   - **Step 2: Test Scores** (Optional)
   - **Step 3: Review & Confirm**

### 2. **Profile Information Section**
Students can provide:
- **Profile Picture**: Upload a profile image (JPG, PNG up to 5MB)
- **Full Name**: Required field with validation (min 3 characters)
- **Phone Number**: Optional field with format validation (10-15 digits)
- **Location/City**: Required field
- **About/Bio**: Required field with minimum 20 characters

### 3. **Test Scores Section**

#### IELTS Score Module
Students can optionally add their IELTS scores with:
- **Test Date**: Date of the IELTS exam
- **Overall Band**: Score from 0-9
- **Component Scores** (each 0-9):
  - Listening
  - Reading
  - Writing
  - Speaking
- **Validation**: All band scores must be between 0-9
- **Visual Feedback**: Badge display showing overall band score

#### Entry Test Score Module
Students can optionally add entry test scores for:
- **Supported Tests**:
  - NTS (National Testing Service)
  - MCAT (Medical Colleges Admission Test)
  - EAT (Engineering Admission Test)
  - ECAT (Engineering Common Admission Test)
  - GMAT (Graduate Management Admission Test)
  - GRE (Graduate Record Examination)
  - FMDC (Liaquat University)
  - Other

- **Score Fields**:
  - Test Date: Date of the test
  - Obtained Marks: Number of marks scored
  - Total Marks: Total possible marks
  - Percentage: Auto-calculated percentage

- **Validation**:
  - Obtained marks cannot exceed total marks
  - Both marks fields are required if adding score
  - Total marks must be greater than 0
  - Percentage auto-calculates and displays

### 4. **Progress Tracking**
- Visual progress bar showing completion status
- Numbered steps with visual indicators:
  - ✓ (Completed steps)
  - Active number (Current step)
  - Number (Upcoming steps)
- Progress line connecting steps

### 5. **Data Persistence**
- Profile setup data is saved to localStorage
- Data is preserved if user navigates away
- User profile status is updated to `profileComplete: true`

### 6. **Error Handling**
- Real-time field validation
- Clear error messages for each field
- Specific validation rules:
  - Required field indicators (*)
  - Character length validation
  - Numeric range validation
  - Cross-field validation (e.g., obtained vs total marks)

## User Flow

```
1. User Registers as Student
   ↓
2. Redirected to /profile-setup
   ↓
3. Step 1: Enter Profile Information
   - Upload profile picture
   - Enter full name, phone, location, bio
   - Validate all fields
   ↓
4. Step 2: Add Test Scores (Optional)
   - Option A: Add IELTS scores
   - Option B: Add Entry Test scores
   - Option C: Skip both for now
   ↓
5. Step 3: Review Profile
   - Review all entered information
   - Make edits by going back
   - Confirm and complete setup
   ↓
6. Redirected to Student Dashboard
   - Profile data loaded and displayed
   - Test scores visible in dashboard
```

## Technical Implementation

### Files Created
- **src/pages/ProfileSetup.tsx**: Main profile setup component with multi-step form

### Files Modified
- **src/context/AuthContext.tsx**: 
  - Added `isNewUser` field to User interface
  - Updated registration to set `profileComplete: false`
  
- **src/components/AuthModal.tsx**: 
  - Updated registration redirect to `/profile-setup` for students
  
- **src/App.tsx**: 
  - Added route for `/profile-setup`
  - Imported ProfileSetup component
  
- **src/pages/StudentDashboard.tsx**: 
  - Added profile setup data loading
  - Added test scores display section
  - Updated profile data with setup information

### Data Structure

#### ProfileSetupData (localStorage)
```typescript
{
  fullName: string
  phone: string
  location: string
  bio: string
  profileImage: string | null
  testScores: {
    ielts: {
      hasScore: boolean
      overallBand: number | null (0-9)
      listeningBand: number | null (0-9)
      readingBand: number | null (0-9)
      writingBand: number | null (0-9)
      speakingBand: number | null (0-9)
      testDate: string
    }
    entryTest: {
      hasScore: boolean
      testName: string
      obtainedMarks: number | null
      totalMarks: number | null
      percentage: number | null (auto-calculated)
      testDate: string
    }
  }
  completedAt: string (ISO timestamp)
}
```

## UI/UX Features

### Visual Design
- Dark theme (slate gray) matching the application design
- Gradient backgrounds and smooth transitions
- Clear visual hierarchy with icons and badges
- Responsive grid layouts

### Interactive Elements
- Toggle switches for IELTS and Entry Test sections
- Tabs for different test types
- Progress indicators
- Real-time percentage calculation
- Animated transitions

### Accessibility
- Clear labels for all form fields
- Error messages in context
- Required field indicators (*)
- Descriptive placeholder text
- Keyboard navigation support

## Usage Instructions

### For Students
1. Register a new account
2. Complete profile information on Step 1
3. Optionally add test scores on Step 2
4. Review information on Step 3
5. Click "Complete Setup" to finish
6. Access dashboard with complete profile

### For Developers
To access the profile setup page directly:
- Navigate to `/profile-setup` (only works when authenticated)
- Data is stored in `localStorage` key: `profileSetup`
- User profile status can be checked via `user.profileComplete`

## Future Enhancements

1. **Backend Integration**
   - Save profile data to database
   - API endpoint for profile updates

2. **Additional Features**
   - Resume upload
   - Work experience/education timeline
   - Skills endorsement
   - Reference management

3. **Validation Enhancements**
   - Phone number format by country
   - Email verification
   - Document upload validation

4. **Analytics**
   - Track profile completion rates
   - Monitor time to complete profile
   - Analyze test score distributions

## Testing Checklist

- [ ] Profile picture upload and display
- [ ] Form validation for all fields
- [ ] IELTS score range validation (0-9)
- [ ] Entry test marks comparison validation
- [ ] Percentage auto-calculation
- [ ] Tab switching between IELTS and Entry Test
- [ ] Skip functionality for test scores
- [ ] Data persistence across page refreshes
- [ ] Navigation between steps
- [ ] Data display on student dashboard
- [ ] Responsive design on mobile devices

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes
- All test score fields are optional - students can skip this step
- Profile picture is optional but recommended
- At least one of IELTS or Entry Test can be added
- Data is validated before allowing progression to next step
