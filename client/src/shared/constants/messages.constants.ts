export const MESSAGES = {
  UPLOAD: {
    RESUME_SUCCESS: 'Resume uploaded successfully',
    RESUME_ERROR: 'Failed to upload resume. Please try again.',
    RESUME_SIZE_ERROR: 'File size must be less than 10MB',
    RESUME_TYPE_ERROR: 'Only PDF files are accepted',
    RESUME_REQUIRED: 'Please upload your resume before submitting',
    UPLOADING: 'Uploading resume...',
    SIGNATURE_ERROR: 'Failed to get upload credentials. Please try again.',
  },
  CANDIDATE: {
    PROFILE_UPDATED: 'Profile updated successfully',
    PROFILE_UPDATE_ERROR: 'Failed to update profile',
    APPLICATION_SUCCESS: 'Successfully applied for this job!',
    APPLICATION_ERROR: 'Failed to apply for job',
    ALREADY_APPLIED: 'You have already applied for this job',
    RESUME_GENERATED: 'Resume content generated successfully',
    RESUME_GENERATE_ERROR: 'Failed to generate resume content',
    RESUME_SAVED: 'Resume saved successfully',
    EDUCATION_ADDED: 'Education entry added',
    EXPERIENCE_ADDED: 'Experience entry added',
    CONFIRM_DELETE: 'Are you sure you want to remove this entry?',
  }
} as const;
