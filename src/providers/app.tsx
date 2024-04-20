import React from 'react';
import type { PropsWithChildren } from 'react';
import type { AlertColor } from '@mui/material';
import { Alert, Stack, useTheme } from '@mui/material';

export type Notification = {
  message: string;
  severity?: AlertColor;
  timeout?: number;
};

export type AppContextValue = {
  notifications: Notification[];
  addNotification: (
    message: Notification['message'],
    options?: Omit<Notification, 'message'>,
  ) => void;
};

const initialAppContextValue: AppContextValue = {
  notifications: null,
  addNotification: null,
};

export const AppContext = React.createContext(initialAppContextValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const addNotification = React.useCallback(
    (message: Notification['message'], options?: Omit<Notification, 'message'>) => {
      const newNotification = { ...options, message };

      setNotifications(notifications => [...notifications, newNotification]);

      let timeoutId;
      if (options.timeout) {
        timeoutId = setTimeout(() => removeNotification(newNotification), options.timeout);
      }
      return () => {
        timeoutId && clearTimeout(timeoutId);
      };
    },
    [],
  );

  const removeNotification = (notificationForRemoving: Notification) => {
    setNotifications(notifications =>
      notifications.filter(
        notification => notification.message !== notificationForRemoving.message,
      ),
    );
  };

  return (
    <AppContext.Provider
      value={{
        notifications,
        addNotification,
      }}
    >
      {children}

      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: theme.spacing(11),
          right: theme.spacing(2),
        }}
      >
        {notifications.map(notification => (
          <Alert
            key={notification.message}
            onClose={() => removeNotification(notification)}
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
