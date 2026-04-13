export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Login successful",
    REGISTER_SUCCESS: "Registration successful",
    UNAUTHORIZED: "Invalid credentials or missing token",
    FORBIDDEN: "You do not have permission to perform this action",
    REFRESH_SUCCESS: "Token refreshed successfully"
  },
  JOB: {
    FETCH_SUCCESS: "Jobs retrieved successfully",
    CREATE_SUCCESS: "Job created successfully",
    UPDATE_SUCCESS: "Job updated successfully",
    DELETE_SUCCESS: "Job deleted successfully",
    NOT_FOUND: "Job not found"
  },
  CATEGORY:{
    FETCH_SUCCESS: "Categories fetched successfully",
    NOT_FOUND: "Category not found"
  },
  EMPLOYER: {
    PROFILE_UPDATED: "Employer profile updated successfully",
    NOT_FOUND: "Employer not found",
    JOB_LIMIT_REACHED: "Job limit reached for your plan",
    STAR_RATING_INVALID: "Star rating must be between 1 and 5",
    SUBSCRIPTION_NOT_FOUND: "No active subscription found",
    VERIFICATION_DOCS_REQUIRED: "Please upload both PAN and Incorporation Certificate",
    JOB_CREATED: "Job posted successfully",
    JOB_UPDATED: "Job updated successfully",
    JOB_DELETED: "Job deleted successfully",
    STATUS_UPDATED: "Application status updated",
    DOCUMENT_UPLOADED: "Document uploaded successfully",
    VERIFICATION_SUBMITTED: "Verification request submitted",
    DOCUMENT_TYPE_ERROR: "Only PDF and image files are accepted"
  },


  CANDIDATE: {
    PROFILE_FETCH_SUCCESS: "Profile fetched successfully",
    PROFILE_UPDATE_SUCCESS: "Candidate profile updated successfully",
    APPLICATIONS_FETCH_SUCCESS: "Applications fetched successfully",
    SHORTLISTED_FETCH_SUCCESS: "Shortlisted applications fetched successfully",
    APPLY_SUCCESS: "Application submitted successfully",
    RESUME_GENERATE_SUCCESS: "Resume content generated successfully",
    NOT_FOUND: "Candidate not found",
    ALREADY_APPLIED: "You have already applied for this job"
  },
  ADMIN: {
    ACTION_SUCCESS: "Admin action completed successfully",
    UNAUTHORIZED: "Admin access required",
    EMPLOYER_DELETED: "Employer deleted successfully",
    STATUS_UPDATED: "Status updated successfully",
    CANDIDATE_DELETED: "Candidate deleted successfully",
    USER_BLOCK_UPDATED: "User block status updated successfully",
    INQUIRY_STATUS_UPDATED: "Inquiry status updated successfully",
    PLAN_UPDATED: "Plan updated successfully",
    MESSAGE_SENT: "Message sent successfully",
    STATISTICS_FETCH_SUCCESS: "Statistics fetched successfully",
    EMPLOYERS_FETCH_SUCCESS: "Employers fetched successfully",
    CANDIDATES_FETCH_SUCCESS: "Candidates fetched successfully",
    PLANS_FETCH_SUCCESS: "Subscription plans fetched successfully",
    INQUIRIES_FETCH_SUCCESS: "Inquiries fetched successfully",
    MESSAGES_FETCH_SUCCESS: "Messages fetched successfully",
    TESTIMONIAL_CREATED: 'Testimonial added successfully',
    TESTIMONIAL_UPDATED: 'Testimonial updated successfully',
    TESTIMONIAL_DELETED: 'Testimonial deleted successfully',
  },
  INQUIRY: {
    CREATE_SUCCESS: "Inquiry created successfully",
  },
  SUCCESS: "Operation successful"
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: "Internal Server Error",
  VALIDATION_ERROR: "Validation Error",
  REFRESH_TOKEN_ERROR: "Refresh token is invalid or expired",
  INVALID_CREDENTIALS: "Invalid credentials",
  UNAUTHORIZED: "Unauthorized access",
  UNAUTHORIZED_ACCESS: "Unauthorized access - No token provided",
  TOKEN_BLACKLISTED: "Token is blacklisted",
  TOKEN_EXPIRED: "Token is expired",
  INVALID_TOKEN: "Token is invalid or expired",
  FORBIDDEN: "Forbidden access",
  NOT_ALLOWED: "You are not allowed to access this resource",
  NOT_FOUND: "User not found",
  EMAIL_EXISTS: "User with this email already exists",
  BAD_REQUEST: "Bad Request",
  COMPANY_EMAIL: "Please use your company email address",
  FOLDER_NOT_FOUND: "Folder not found",
  AI_API_KEY_MISSING: "AI API key is missing",
  RESUME_GENERATION_FAILED: "Failed to generate resume content",
};

