import { 
  RegisterCandidateDTO, 
  RegisterEmployerDTO, 
  LoginInputDTO, 
  LoginOutputDTO,
  RefreshTokenInputDTO,  
  TokenResponseDTO 
} from '../dtos/auth.dto';

export interface IAuthService {
  registerCandidate(data: RegisterCandidateDTO): Promise<void>;
  registerEmployer(data: RegisterEmployerDTO): Promise<void>;
  login(data: LoginInputDTO): Promise<LoginOutputDTO>;
  refreshToken(data: RefreshTokenInputDTO): Promise<TokenResponseDTO>;
  logout(accessToken: string, refreshToken: string): Promise<void>;
}
