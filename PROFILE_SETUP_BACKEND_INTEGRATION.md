# Profile Setup Backend Integration Guide

## Overview
This guide provides instructions for integrating the Profile Setup feature with your backend API.

## Current State
- **Frontend**: Fully implemented with localStorage persistence
- **Backend**: Ready for integration
- **API Routes**: Need to be created to handle profile data

## Required Backend Endpoints

### 1. POST /api/students/profile-setup
**Purpose**: Save complete profile setup data after student completion

**Request Body**:
```json
{
  "userId": "student-001",
  "fullName": "Ahmed Hassan",
  "phone": "+92 300 1234567",
  "location": "Karachi, Pakistan",
  "bio": "Computer Science student passionate about web development",
  "profileImage": "base64_encoded_string_or_null",
  "testScores": {
    "ielts": {
      "hasScore": true,
      "overallBand": 7.5,
      "listeningBand": 7.5,
      "readingBand": 7.0,
      "writingBand": 7.5,
      "speakingBand": 8.0,
      "testDate": "2024-01-15"
    },
    "entryTest": {
      "hasScore": true,
      "testName": "NTS",
      "obtainedMarks": 180,
      "totalMarks": 200,
      "percentage": 90,
      "testDate": "2024-01-10"
    }
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Profile setup completed successfully",
  "data": {
    "userId": "student-001",
    "profileComplete": true,
    "completedAt": "2024-01-20T10:30:00Z"
  }
}
```

**Status Codes**:
- 200: Success
- 400: Validation error
- 401: Unauthorized
- 500: Server error

### 2. GET /api/students/{userId}/profile
**Purpose**: Retrieve student profile data

**Parameters**:
- `userId` (path): Student ID

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "student-001",
    "fullName": "Ahmed Hassan",
    "phone": "+92 300 1234567",
    "location": "Karachi, Pakistan",
    "bio": "Computer Science student passionate about web development",
    "profileImage": "url_or_base64",
    "testScores": { ... },
    "profileComplete": true,
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-01-20T10:30:00Z"
  }
}
```

### 3. PUT /api/students/{userId}/profile
**Purpose**: Update existing profile data

**Request Body**: Same as POST /api/students/profile-setup

**Response**: Same as POST endpoint

**Status Codes**:
- 200: Success
- 400: Validation error
- 401: Unauthorized
- 404: Student not found
- 500: Server error

### 4. GET /api/students/{userId}/test-scores
**Purpose**: Retrieve only test scores for a student

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "student-001",
    "ielts": { ... },
    "entryTest": { ... },
    "lastUpdated": "2024-01-20T10:30:00Z"
  }
}
```

### 5. POST /api/students/{userId}/test-scores/ielts
**Purpose**: Add or update IELTS scores

**Request Body**:
```json
{
  "overallBand": 7.5,
  "listeningBand": 7.5,
  "readingBand": 7.0,
  "writingBand": 7.5,
  "speakingBand": 8.0,
  "testDate": "2024-01-15"
}
```

**Response**:
```json
{
  "success": true,
  "message": "IELTS scores saved successfully",
  "data": { ... }
}
```

### 6. POST /api/students/{userId}/test-scores/entry-test
**Purpose**: Add or update entry test scores

**Request Body**:
```json
{
  "testName": "NTS",
  "obtainedMarks": 180,
  "totalMarks": 200,
  "testDate": "2024-01-10"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Entry test scores saved successfully",
  "data": { ... }
}
```

## Database Schema

### Students Table
```sql
CREATE TABLE students (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  location VARCHAR(255),
  bio TEXT,
  profile_image_url VARCHAR(500),
  profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Test Scores Table - IELTS
```sql
CREATE TABLE ielts_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  overall_band DECIMAL(3,1) NOT NULL,
  listening_band DECIMAL(3,1) NOT NULL,
  reading_band DECIMAL(3,1) NOT NULL,
  writing_band DECIMAL(3,1) NOT NULL,
  speaking_band DECIMAL(3,1) NOT NULL,
  test_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  UNIQUE KEY unique_student_date (student_id, test_date)
);
```

### Test Scores Table - Entry Tests
```sql
CREATE TABLE entry_test_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  test_name VARCHAR(100) NOT NULL,
  obtained_marks INT NOT NULL,
  total_marks INT NOT NULL,
  percentage DECIMAL(5,2),
  test_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
```

## Validation Rules

### Profile Information
- **Full Name**: 
  - Required
  - Min 3 characters
  - Max 100 characters
  - Only letters, spaces, and hyphens

- **Phone**: 
  - Optional
  - 10-15 digits when provided
  - Format: +[country_code] [number]

- **Location**: 
  - Required
  - Min 3 characters
  - Max 255 characters

- **Bio**: 
  - Required
  - Min 20 characters
  - Max 1000 characters

- **Profile Image**: 
  - Optional
  - Max 5MB file size
  - Supported formats: JPG, PNG, WebP

### IELTS Scores
- **Overall Band**: 
  - Required if adding score
  - Range: 0.0 - 9.0
  - Accepts half-bands (e.g., 7.5)

- **Component Bands** (Listening, Reading, Writing, Speaking):
  - Required if adding IELTS score
  - Range: 0.0 - 9.0
  - Accepts half-bands

- **Test Date**: 
  - Required
  - Cannot be in future
  - Format: YYYY-MM-DD

### Entry Test Scores
- **Test Name**: 
  - Required if adding score
  - Must be from predefined list
  - Enum: ['NTS', 'MCAT', 'EAT', 'ECAT', 'GMAT', 'GRE', 'FMDC', 'OTHER']

- **Obtained Marks**: 
  - Required if adding score
  - Must be >= 0
  - Must be <= Total Marks

- **Total Marks**: 
  - Required if adding score
  - Must be > 0

- **Percentage**: 
  - Auto-calculated: (obtained / total) * 100
  - Stored as DECIMAL(5,2)

- **Test Date**: 
  - Required
  - Cannot be in future
  - Format: YYYY-MM-DD

## Implementation Steps

### Step 1: Create Backend Endpoints
1. Implement POST /api/students/profile-setup
2. Implement GET /api/students/{userId}/profile
3. Implement PUT /api/students/{userId}/profile
4. Add proper authentication middleware
5. Add input validation

### Step 2: Frontend Integration
Update `src/pages/ProfileSetup.tsx`:

```typescript
// Replace the handleSubmit function
const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const response = await fetch('/api/students/profile-setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // Get auth token from context
      },
      body: JSON.stringify({
        userId: user?.id,
        fullName: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        profileImage: profileData.profileImage,
        testScores: testScores
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save profile');
    }

    const data = await response.json();
    
    // Update user context
    const updatedUser = { ...user, profileComplete: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Navigate to dashboard
    navigate('/student-dashboard');
  } catch (error) {
    setErrors({ submit: error.message || 'Failed to save profile' });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 3: Load Profile on Dashboard
Update `src/pages/StudentDashboard.tsx`:

```typescript
useEffect(() => {
  const loadProfileData = async () => {
    try {
      const response = await fetch(`/api/students/${user?.id}/profile`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfileSetupData(data.data);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };
  
  if (user?.id) {
    loadProfileData();
  }
}, [user?.id]);
```

## Error Handling

### Common Error Scenarios

1. **Validation Error (400)**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Full name must be at least 3 characters",
    "Phone number must be 10-15 digits"
  ]
}
```

2. **Unauthorized (401)**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Please log in to continue"
}
```

3. **Duplicate Entry (409)**
```json
{
  "success": false,
  "error": "Conflict",
  "message": "IELTS score for this test date already exists"
}
```

## Security Considerations

1. **Authentication**: All endpoints require valid JWT token
2. **Authorization**: Students can only access/modify their own data
3. **Input Sanitization**: Sanitize all text inputs
4. **File Upload**: Validate file types and sizes for profile images
5. **Rate Limiting**: Implement rate limiting on profile update endpoints
6. **HTTPS**: Use HTTPS in production

## Testing

### Unit Tests
- Validate all input formats
- Test edge cases (boundary values)
- Test error scenarios

### Integration Tests
- Test complete profile setup flow
- Test test score calculations
- Test data persistence

### Load Tests
- Test with multiple concurrent users
- Monitor database performance

## Migration Path

If migrating existing data from localStorage:

```python
# Python script to migrate localStorage data to database
import json
import sqlite3

def migrate_profile_data(student_id, profile_data):
    # Save to database
    # 1. Update students table
    # 2. Insert IELTS scores if present
    # 3. Insert entry test scores if present
    pass
```

## Rollout Plan

1. **Phase 1**: Implement backend endpoints (Week 1)
2. **Phase 2**: Update frontend with API calls (Week 2)
3. **Phase 3**: Test with staging data (Week 3)
4. **Phase 4**: Production rollout with monitoring (Week 4)

## Monitoring & Logging

- Log all profile setup submissions
- Monitor API response times
- Track error rates
- Monitor file upload sizes
- Track profile completion rates

## Future Enhancements

1. **Image Optimization**: Compress and optimize profile images
2. **Document Storage**: Store certificate images for test scores
3. **Profile Versioning**: Track profile changes over time
4. **Analytics**: Analyze profile completion patterns
5. **Integration**: Connect with LinkedIn for data import
