import {Navigate, Outlet} from 'react-router-dom';

import {Header} from '@components/header/header';
import {useAppSelector} from '@store/config/hooks';
import {selectAuthorizedStatus} from '@store/slices/auth-slice';

export const ProtectedLayout = () => {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return (
    <>
      <Header />
      <div className="body-wrapper">
        <Outlet />
      </div>
    </>
  );
}
