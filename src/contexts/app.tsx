import React from 'react';
import {
  AlertColor,
  Alert,
  Stack,
  SnackbarCloseReason,
  useTheme,
} from '@material-ui/core';

export type Notification = {
  message: string
  severity?: AlertColor
}

export type AppContextState = {
  notifications: Notification[]
  addNotification: (
    message: Notification['message'],
    options?: Omit<Notification, 'message'>
  ) => void
}

const initialAppContextState: AppContextState = {
  notifications: null,
  addNotification: null
};

export const AppContext = React.createContext(initialAppContextState);

export const AppContextProvider = ({ children }) => {
  const theme = useTheme();

  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const addNotification = React.useCallback(
    (message: Notification['message'], options?: Omit<Notification, 'message'>) => {
    setNotifications((notifications) =>
      [...notifications, { ...options, message }]
    );
  }, []);

  const removeNotification = (reason: SnackbarCloseReason, notificationForRemoving: Notification) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotifications((notifications) =>
      notifications.filter(notification =>
        notification.message !== notificationForRemoving.message
      ));
  };

  return (
    <AppContext.Provider value={{
      notifications,
      addNotification
    }}>
      {children}

      <Stack spacing={2} sx={{
        position: 'fixed',
        top: theme.spacing(11),
        right: theme.spacing(2)
      }}>
        {notifications.map(notification => (
          <Alert
            key={notification.message}
            onClose={() => removeNotification(null, notification)}
            severity={notification.severity || 'success'}
            elevation={6}
            variant={'filled'}
          >
            {notification.message}
          </Alert>
        ))}
      </Stack>
    </AppContext.Provider>
  );
};
