import { UserModel, CreateUserData, CandidateProfileData, EmployerProfileData } from '../models/user.model';

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<UserModel | null>;
  findUserById(id: string): Promise<UserModel | null>;
  createUser(data: CreateUserData): Promise<UserModel>;
  createCandidateProfile(userId: string, data: Partial<CandidateProfileData>): Promise<void>;
  createEmployerProfile(userId: string, data: Partial<EmployerProfileData>): Promise<void>;
  updateUser(id: string, data: Partial<UserModel>): Promise<UserModel>;
}
