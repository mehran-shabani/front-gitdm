import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loading } from './ui/Loading';

import type { PropsWithChildren } from 'react';

interface ProtectedRouteProps extends PropsWithChildren {}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

// react-client/src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';

 export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

-  if (!isAuthenticated) {
-    return <Navigate to="/login" replace />;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

   if (isLoading) {
     // ...loading state UI...
   }

   return <>{children}</>;
 }

  return <>{children}</>;
}