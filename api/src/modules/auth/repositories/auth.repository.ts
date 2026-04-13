import { supabaseClient } from '@shared/config/db.config';
import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { UserModel, CreateUserData, CandidateProfileData, EmployerProfileData } from '@modules/auth/models/user.model';
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

  async createEmployerProfile(userId: string, data: Partial<EmployerProfileData>): Promise<{ id: string }> {
    const { data: profile, error } = await supabaseClient
      .from('employer_profiles')
      .insert({
        user_id: userId,
        company_name: data.company_name!,
        company_domain: data.company_domain!,
        industry: data.industry || null,
        website: data.website || null,
        phone: data.phone || null
      })
      .select('id')
      .single();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return profile as { id: string };
  }

  async findPlanByName(planName: string): Promise<{ id: string; job_listing_limit: number } | null> {
    const { data, error } = await supabaseClient
      .from('subscription_plans')
      .select('id, job_listing_limit')
      .eq('name', planName)
      .maybeSingle();

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return data as { id: string; job_listing_limit: number } | null;
  }

  async createEmployerSubscription(employerId: string, planId: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const { error } = await supabaseClient
      .from('employer_subscriptions')
      .insert({
        employer_id: employerId,
        plan_id: planId,
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
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
