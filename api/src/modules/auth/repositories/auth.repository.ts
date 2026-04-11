import { supabaseClient } from '@shared/config/db.config';
import { IAuthRepository } from '../interfaces/IAuthRepository';
import { UserModel, CreateUserData, CandidateProfileData, EmployerProfileData } from '../models/user.model';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<UserModel | null> {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return data as UserModel | null;
  }

  async findUserById(id: string): Promise<UserModel | null> {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return data as UserModel | null;
  }

  async createUser(data: CreateUserData): Promise<UserModel> {
    const { data: user, error } = await supabaseClient
      .from('users')
      .insert({
        email: data.email,
        password_hash: data.password_hash,
        role: data.role
      })
      .select()
      .single();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return user as UserModel;
  }

  async createCandidateProfile(userId: string, data: Partial<CandidateProfileData>): Promise<void> {
    const { error } = await supabaseClient
      .from('candidate_profiles')
      .insert({
        user_id: userId,
        full_name: data.full_name || null,
        phone: data.phone || null,
        location: data.location || null,
        skills: data.skills || [],
        resume_url: data.resume_url || null,
      });

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  async createEmployerProfile(userId: string, data: Partial<EmployerProfileData>): Promise<void> {
    const { error } = await supabaseClient
      .from('employer_profiles')
      .insert({
        user_id: userId,
        company_name: data.company_name!,
        company_domain: data.company_domain!,
        industry: data.industry || null,
        website: data.website || null,
        phone: data.phone || null
      });

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, data: Partial<UserModel>): Promise<UserModel> {
    const { data: user, error } = await supabaseClient
      .from('users')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return user as UserModel;
  }
}
