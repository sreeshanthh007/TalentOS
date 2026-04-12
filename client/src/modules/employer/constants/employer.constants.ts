export const VERIFICATION_DOCS_CONFIG = {
  ACCEPTED_TYPES: [
    'application/pdf',
    'image/jpeg', 
    'image/jpg',
    'image/png',
    'image/webp'
  ],
  ACCEPTED_EXTENSIONS: '.pdf,.jpg,.jpeg,.png,.webp',
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_LABEL: '5MB'
} as const;
