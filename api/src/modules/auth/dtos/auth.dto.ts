export interface AuthUserDTO {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface RegisterInputDTO {
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface RefreshTokenInputDTO {
  refreshToken: string;
}

export interface AuthResponseDTO {
  user: AuthUserDTO;
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}
