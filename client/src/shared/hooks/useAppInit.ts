import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchMe } from '@/store/thunks/auth.thunks';
import { type UserRole } from '@/shared/types';

export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const sessionStr = localStorage.getItem('talentos_session');
    if (!sessionStr) {
      setIsInitializing(false);
      return;
    }

    try {
      const { role } = JSON.parse(sessionStr) as { role: UserRole };
      if (role) {
        dispatch(fetchMe(role)).finally(() => setIsInitializing(false));
      } else {
        setIsInitializing(false);
      }
    } catch {
      setIsInitializing(false);
    }
  }, [dispatch]);

  return { isInitializing };
};
