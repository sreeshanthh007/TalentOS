import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setAuth, clearAuth } from '../store/auth.slice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  return {
    ...authState,
    setAuth: (data: Parameters<typeof setAuth>[0]) => dispatch(setAuth(data)),
    clearAuth: () => dispatch(clearAuth())
  };
};
