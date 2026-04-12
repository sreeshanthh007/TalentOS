import { EmployerSubscriptionModel, SubscriptionPlanModel } from '../models/employer.model'

export interface EmployerStats {
  active_jobs: number
  total_applications: number
  shortlisted_candidates: number
  hired_candidates: number
}

export interface EmployerSubscription extends EmployerSubscriptionModel {
  plan: SubscriptionPlanModel
}

