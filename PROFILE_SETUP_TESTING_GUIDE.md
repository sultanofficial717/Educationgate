# How to Test the Profile Setup Feature

## Quick Start

### Step 1: Register a New Student Account
1. Open http://localhost:8080 in your browser
2. Click on any "Sign Up" or "Register" button
3. Select "Student" as user type
4. Fill in the registration form with:
   - Email: any email address (e.g., `student@example.com`)
   - Password: any password
   - First Name: e.g., "Ahmed"
   - Last Name: e.g., "Hassan"
5. Click "Register"

### Step 2: Complete Profile Setup
You will be automatically redirected to the Profile Setup page.

#### Step 1: Profile Information
1. **Upload Profile Picture** (Optional)
   - Click on the camera icon to upload a profile image
   - Supported formats: JPG, PNG (max 5MB)

2. **Full Name** (Required)
   - Should already be pre-filled with your registered name
   - You can edit it if needed
   - Must be at least 3 characters

3. **Phone Number** (Optional)
   - Enter a phone number in format: +92 300 1234567
   - Must be 10-15 digits

4. **Location** (Required)
   - Enter your city/country (e.g., "Karachi, Pakistan")

5. **About You (Bio)** (Required)
   - Write a brief bio about yourself
   - Minimum 20 characters
   - Maximum 500 characters
   - Example: "Computer Science student interested in web development and AI"

6. Click **"Next"** button

#### Step 2: Test Scores (Optional)
You have three options:

**Option A: Add IELTS Score**
1. Toggle the "Do you have an IELTS score?" switch
2. Select test date
3. Enter Overall Band Score (0-9)
4. Enter band scores for:
   - Listening (0-9)
   - Reading (0-9)
   - Writing (0-9)
   - Speaking (0-9)
5. Scores will be validated in real-time

**Option B: Add Entry Test Score**
1. Toggle the "Do you have an Entry Test Score?" switch
2. Select test name from dropdown:
   - NTS
   - MCAT
   - EAT
   - ECAT
   - GMAT
   - GRE
   - FMDC
   - Other
3. Select test date
4. Enter Obtained Marks (e.g., 180)
5. Enter Total Marks (e.g., 200)
6. Percentage will auto-calculate

**Option C: Skip Test Scores**
- Click **"Skip for Now"** to skip both test scores
- You can add them later from the dashboard

6. Click **"Next"** button to proceed to review

#### Step 3: Review Your Profile
1. Review all the information you entered
2. If you need to make changes:
   - Click **"Previous"** to go back to earlier steps
3. Once satisfied, click **"Complete Setup"**

### Step 3: Access Your Dashboard
- You will be redirected to the Student Dashboard
- Your profile information will be displayed
- If you added test scores, they will be visible in a dedicated "Your Test Scores" section

## Test Scenarios

### Valid Input Examples

**Profile Information:**
```
Full Name: Ahmed Hassan
Phone: +92 300 1234567
Location: Karachi, Pakistan
Bio: I am a Computer Science student with interests in web development, 
     artificial intelligence, and blockchain technology. Currently learning 
     React, Node.js, and Python for building scalable applications.
```

**IELTS Scores:**
```
Test Date: 2024-01-15
Overall Band: 7.5
Listening: 7.5
Reading: 7.0
Writing: 7.5
Speaking: 8.0
```

**Entry Test Scores:**
```
Test: NTS
Test Date: 2024-01-10
Obtained Marks: 180
Total Marks: 200
Percentage: 90% (auto-calculated)
```

### Invalid Input Examples

These will show error messages:

1. **Full Name too short**
   - Input: "AB"
   - Error: "Full name must be at least 3 characters"

2. **Invalid phone format**
   - Input: "123" (only 3 digits)
   - Error: "Phone number must be 10-15 digits"

3. **Bio too short**
   - Input: "I like coding"
   - Error: "Bio must be at least 20 characters"

4. **IELTS band out of range**
   - Input: "10" or "-1"
   - Error: "Band score must be between 0 and 9"

5. **Entry test marks invalid**
   - Obtained: 250, Total: 200
   - Error: "Obtained marks cannot exceed total marks"

## Viewing Profile on Dashboard

After completing setup:
1. You'll be on the Student Dashboard
2. Click on the "Overview" tab (default)
3. Scroll down to see "Your Test Scores" section
4. Test scores will display in colored cards:
   - Blue for IELTS scores
   - Purple for Entry Test scores

## Tips

1. **Profile Picture**: Upload a clear, professional photo for best results
2. **Bio**: Write something that represents your skills and interests
3. **Test Dates**: Use actual test dates if you have taken these exams
4. **Flexibility**: You can skip test scores and add them later
5. **Data Persistence**: Your data is saved automatically when you click "Complete Setup"

## Troubleshooting

### Profile Setup Page Not Loading
- Ensure you're logged in as a student
- Clear browser cache and reload
- Check browser console for any errors

### Data Not Saving
- Ensure all required fields are filled
- Check that validation errors are resolved
- Try completing setup again

### Test Scores Not Showing on Dashboard
- Refresh the page
- Ensure you clicked "Complete Setup" 
- Check browser's localStorage in developer tools

## Technical Notes for Developers

### Access Profile Data
```javascript
// In browser console
const profileSetup = JSON.parse(localStorage.getItem('profileSetup'));
console.log(profileSetup);
```

### Reset Profile Setup
```javascript
// In browser console
localStorage.removeItem('profileSetup');
localStorage.setItem('user', JSON.stringify({
  ...JSON.parse(localStorage.getItem('user')),
  profileComplete: false
}));
```

### Required Validations
- Full Name: min 3 chars
- Bio: min 20 chars, max 500 chars
- Phone: 10-15 digits (if provided)
- IELTS: band scores 0-9
- Entry Test: obtained ≤ total marks

## Support

For issues or questions:
1. Check the [PROFILE_SETUP_FEATURE.md](PROFILE_SETUP_FEATURE.md) documentation
2. Review test scenarios in this guide
3. Check browser console for errors
4. Verify all required fields are filled correctly
