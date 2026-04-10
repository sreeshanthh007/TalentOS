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
  EMPLOYER: {
    PROFILE_UPDATE_SUCCESS: "Employer profile updated successfully",
    NOT_FOUND: "Employer not found"
  },
  CANDIDATE: {
    PROFILE_UPDATE_SUCCESS: "Candidate profile updated successfully",
    NOT_FOUND: "Candidate not found"
  },
  ADMIN: {
    ACTION_SUCCESS: "Admin action completed successfully",
    UNAUTHORIZED: "Admin access required"
  }
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
  NOT_FOUND: "User not found",
  EMAIL_EXISTS: "User with this email already exists",
  BAD_REQUEST: "Bad Request",
  COMPANY_EMAIL: "Please use your company email address",
};
