export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
