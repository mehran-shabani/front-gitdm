import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApiTokenCreate, useApiTokenRefreshCreate } from '../api/generated/gitdmApi';
import { axiosClient } from '../api/http/axios-instance';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useApiTokenCreate();
  const refreshMutation = useApiTokenRefreshCreate();

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    (async () => {
      if (token) {
        setupAxiosInterceptor(token);
        try {
          await refreshToken();
          setIsAuthenticated(true);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  // Setup axios interceptor
  const applyAuthHeader = (token: string) => {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Setup response interceptor for token refresh
  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshToken();
            return axiosClient(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({
        data: { email, password, access: '', refresh: '' },
      });

      const { access, refresh } = response.data;
      
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
      
      setupAxiosInterceptor(access);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    delete axiosClient.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await refreshMutation.mutateAsync({
        data: { refresh, access: '' },
      });

      const { access } = response.data;
      
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      setupAxiosInterceptor(access);
    } catch (error) {
      logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}