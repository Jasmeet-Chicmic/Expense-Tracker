import { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

interface NotificationWrapperProps {
  children: ReactNode;
}
export function NotificationWrapper({ children }: NotificationWrapperProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default NotificationWrapper;
