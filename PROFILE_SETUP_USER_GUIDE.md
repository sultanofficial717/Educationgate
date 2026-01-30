# Profile Setup Feature - User Guide

## 🎯 What Was Built

A complete LinkedIn-like profile setup experience for students, including:
- Comprehensive 5-step wizard for profile creation
- Post-registration "Setup Now or Later" dialog
- Edit profile capability from Student Dashboard
- Full support for demo users (student@edu360.com)
- Green and lime color scheme matching the application

---

## 📱 User Flows

### Flow 1: New Student Registration with Profile Setup

```
1. User clicks "Sign Up" 
   ↓
2. Enters email, password, first/last name
   ↓
3. Clicks "Create Account" (selects Student role)
   ↓
4. Registration successful → Dialog appears
   ┌─────────────────────────┐
   │ Complete Your Profile?  │
   │                         │
   │ [Later] [Setup Now]     │
   └─────────────────────────┘
   ↓
   Chooses "Setup Now"
   ↓
5. Profile Setup Wizard Opens (Step 1/5: Basic Info)
   - Enter full name, headline, location, bio
   - Upload profile picture
   - Add phone and website (optional)
   ↓
6. Step 2/5: Experience & Education
   - Add work experience entries
   - Add education entries
   - Each with start/end dates, descriptions
   ↓
7. Step 3/5: Skills & Certifications
   - Add skills as tags (React, JavaScript, etc.)
   - Add certifications with issuers
   ↓
8. Step 4/5: Test Scores
   - Add IELTS scores (optional)
   - Add Entry Test scores: NTS, MCAT, EAT, etc. (optional)
   ↓
9. Step 5/5: Review
   - View all entered information
   - Confirm and save
   ↓
10. Redirected to Student Dashboard
    Profile complete ✓
```

### Flow 2: Skip Setup, Setup Later

```
1-3. Same as above
   ↓
4. Dialog appears
   ↓
   Chooses "Later"
   ↓
5. Redirected to Student Dashboard
   User can click "Edit Profile" button anytime
   ↓
6. Profile Setup wizard opens in edit mode
```

### Flow 3: Edit Existing Profile

```
1. User logged in to Student Dashboard
   ↓
2. Scrolls to Profile section
   ↓
3. Clicks "Edit Profile" button
   ↓
4. Profile Setup wizard opens (Edit Mode)
   - All existing data pre-populated
   - Header shows "Edit Your Profile"
   ↓
5. Make changes to any section
   ↓
6. Review updated information
   ↓
7. Click "Complete Profile" to save
   ↓
8. Return to Student Dashboard
```

---

## 🧪 How to Test with Demo User

### Option A: Register New Account
```
1. On homepage, click "Sign Up"
2. Fill in:
   - First Name: Test
   - Last Name: User
   - Email: test.user@email.com
   - Password: TestPass123
3. Select "Student" role
4. Click "Create Account"
5. Click "Setup Now" in dialog
6. Complete the wizard or click "Skip" to go to dashboard later
```

### Option B: Use Demo Credentials
```
1. On homepage, click "Sign In"
2. Look for "Demo Credentials" info box
   - Email: student@edu360.com
   - Password: student123
3. Click the info box to auto-fill credentials
4. Click "Sign In"
5. In Student Dashboard, click "Edit Profile"
6. Set up or update profile
```

---

## 🎨 Visual Structure

### Profile Setup Wizard - Step Indicators
```
┌──────────────────────────────────────────────────────────────┐
│ ① Basic Info  ──→  ② Experience  ──→  ③ Skills  ──→  ④ Tests  ──→  ⑤ Review │
│  GREEN            GREEN            GREEN           GREEN         COMPLETE     │
│ ██████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 40%           │
└──────────────────────────────────────────────────────────────┘
```

### Color Usage (Green & Lime Theme)
- **Step indicators**: Green when complete, Lime when current, Gray when pending
- **Buttons**: Primary = Green, Accent = Lime, Hover effects with gradients
- **Cards**: White background with subtle green/lime borders
- **Icons**: Used for visual categorization (User, Briefcase, GraduationCap, Code, Award)

### Form Sections
```
BASIC INFO SECTION
├─ Profile Picture (Upload image)
├─ Full Name (Required, min 3 chars)
├─ Professional Headline (Required)
├─ Location (Required)
├─ Bio/About (Optional)
├─ Phone (Optional, 10-15 digits)
└─ Website (Optional)

EXPERIENCE & EDUCATION
├─ EXPERIENCE TAB
│  └─ [+ Add Experience]
│     ├─ Company name
│     ├─ Position/Title
│     ├─ Start Date
│     ├─ End Date
│     ├─ Currently Working (toggle)
│     ├─ Description (optional)
│     └─ [Delete] button
│
└─ EDUCATION TAB
   └─ [+ Add Education]
      ├─ School/University
      ├─ Degree (B.S., M.A., etc.)
      ├─ Field of Study
      ├─ Start Date
      ├─ End Date
      ├─ Grade/GPA (optional)
      └─ [Delete] button

SKILLS & CERTIFICATIONS
├─ SKILLS SECTION
│  ├─ Input field: "React, JavaScript, Python"
│  ├─ [Add] button
│  └─ Tags: [React ×] [JavaScript ×] [Python ×]
│
└─ CERTIFICATIONS SECTION
   └─ [+ Add Certification]
      ├─ Certification Name
      ├─ Issuing Organization
      ├─ Issue Date
      ├─ Expiry Date (optional)
      └─ [Delete] button

TEST SCORES
├─ IELTS TAB
│  ├─ Toggle: "Do you have an IELTS score?"
│  ├─ Test Date
│  ├─ Overall Band (0-9)
│  ├─ Listening (0-9)
│  ├─ Reading (0-9)
│  ├─ Writing (0-9)
│  └─ Speaking (0-9)
│
└─ ENTRY TEST TAB
   ├─ Toggle: "Do you have an Entry Test score?"
   ├─ Test Name (Select: NTS, MCAT, EAT, ECAT, GMAT, GRE, FMDC, Other)
   ├─ Test Date
   ├─ Obtained Marks
   ├─ Total Marks
   └─ Percentage (auto-calculated)

REVIEW SECTION
├─ Basic Information (Name, Headline, Location, Bio, Picture)
├─ Experience (if any)
├─ Education (if any)
├─ Skills (if any)
├─ Certifications (if any)
└─ [Complete Profile] button
```

---

## 💾 Data Storage

### localStorage Keys
```
profileSetup: {
  fullName: "Ahmad Hassan",
  headline: "Computer Science Student",
  bio: "Passionate about web development...",
  phone: "+92 300 1234567",
  location: "Karachi, Pakistan",
  website: "www.example.com",
  profileImage: "data:image/png;base64,...",
  skills: ["React", "JavaScript", "Python"],
  experiences: [
    {
      id: "1234567890",
      company: "TechCorp",
      position: "Intern",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      currentlyWorking: false,
      description: "Built React components..."
    }
  ],
  education: [ ... ],
  certifications: [ ... ],
  testScores: {
    ielts: {
      hasScore: true,
      overallBand: 7.5,
      listeningBand: 7.0,
      readingBand: 7.5,
      writingBand: 7.0,
      speakingBand: 8.0,
      testDate: "2024-01-15"
    },
    entryTest: {
      hasScore: true,
      testName: "NTS",
      obtainedMarks: 180,
      totalMarks: 200,
      percentage: 90,
      testDate: "2024-02-10"
    }
  }
}

user: {
  id: "...",
  name: "Ahmad Hassan",
  email: "student@example.com",
  userType: "student",
  profileComplete: true  // ← Updated after setup
}
```

---

## 🔄 Navigation Paths

| Action | URL | Notes |
|--------|-----|-------|
| New Registration | `/` → AuthModal | Shows setup dialog on success |
| Setup Now | `/profile-setup` | Step 1 of wizard |
| Setup Later | `/student-dashboard` | Can click "Edit Profile" anytime |
| Edit from Dashboard | `/student-dashboard` → "Edit Profile" → `/profile-setup` | Loads existing data |
| After Completion | `/student-dashboard` | Profile saved to localStorage |

---

## ⚙️ Validation Rules

### Basic Info Step
- **Full Name**: Required, minimum 3 characters
- **Headline**: Required, any text
- **Location**: Required, any text
- **Phone**: Optional, but if provided must be 10-15 digits
- **Bio**: Optional
- **Website**: Optional

### Test Scores Step
- **IELTS** (if enabled):
  - All bands must be 0-9
  - All components required if IELTS is selected
  
- **Entry Test** (if enabled):
  - Test name required (dropdown)
  - Obtained marks ≥ 0
  - Total marks > 0
  - Obtained marks ≤ Total marks

---

## 🚀 Features Summary

✅ **Complete Profile Setup**
- 5-step wizard with progress tracking
- All LinkedIn-like sections
- Real-time validation

✅ **Smart Dialog**
- Post-registration setup timing choice
- "Setup Now" or "Later" options

✅ **Edit Capability**
- Edit profile from Student Dashboard
- All sections editable
- Data persists to localStorage

✅ **Demo User Support**
- Full feature access for demo accounts
- Can register and edit freely

✅ **Design**
- Matches app's green (#1a7d4a) + lime color scheme
- Responsive layout
- Professional appearance

✅ **User Experience**
- Clear error messages
- Auto-calculated fields (percentage)
- Skip options for optional sections
- Back/Next/Skip navigation
- Review before submit

---

## 📝 Common Scenarios

### Scenario 1: Complete Setup Immediately After Registration
```
Register → Setup Dialog → Click "Setup Now" → Complete 5-step wizard → 
Dashboard → Profile complete
```

### Scenario 2: Skip Setup, Complete Later
```
Register → Setup Dialog → Click "Later" → Dashboard → 
Click "Edit Profile" → Complete wizard → Dashboard → Profile complete
```

### Scenario 3: Edit Profile Multiple Times
```
Dashboard → Edit Profile → Update sections → Review → Save → 
Dashboard → Can edit again anytime
```

### Scenario 4: Demo User Experience
```
Sign In (student@edu360.com) → Dashboard → Edit Profile → 
Setup or update sections → Save → Keep editing as needed
```

---

## 🎓 Educational Use

This implementation demonstrates:
- React hooks (useState, useEffect)
- Form handling and validation
- Multi-step wizards
- localStorage persistence
- Component composition
- Conditional rendering
- TailwindCSS styling
- TypeScript interfaces
- Context API usage
- React Router navigation
- UI/UX best practices

---

## ✨ What Makes It Professional

1. **Comprehensive**: Covers all aspects of a professional profile
2. **Flexible**: Can skip sections, edit anytime
3. **Validated**: Real-time error checking
4. **Visual**: Progress tracking, clear indicators
5. **Accessible**: Responsive design, clear labels
6. **Persistent**: Data saved across sessions
7. **Demo-Ready**: Works with demo credentials
8. **Theme-Compliant**: Uses app's color scheme
