import { type CandidateUser, type ProfileCompletionResult } from '@/shared/types'

export function calculateProfileCompletion(user: CandidateUser): ProfileCompletionResult {
  const checks = [
    { field: 'Full Name', done: !!user.full_name },
    { field: 'Location', done: !!user.location },
    { field: 'Skills', done: user.skills && user.skills.length > 0 },
    { field: 'Resume', done: !!user.resume_url },
    { field: 'Education', done: user.education && user.education.length > 0 },
    { field: 'Experience', done: user.experience && user.experience.length > 0 },
  ]
  
  const done = checks.filter(c => c.done).length
  const percentage = Math.round((done / checks.length) * 100)
  const missing = checks.filter(c => !c.done).map(c => c.field)
  
  return { percentage, missing }
}
