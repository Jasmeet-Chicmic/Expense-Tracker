import { useSnackbar } from 'notistack';
import { firstLetterUpperCase } from '../Helpers/utility';

export default function useNotifications() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNotification = (
    errorMessage: string,
    type: 'default' | 'error' | 'success' | 'warning' | 'info'
  ) => {
    enqueueSnackbar(firstLetterUpperCase(errorMessage ?? ''), {
      variant: type,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      onClose: () => {
        closeSnackbar();
      },
    });
  };
  const notifySuccess = (errorMessage: string) =>
    handleNotification(errorMessage, 'success');

  const notifyError = (errorMessage: string) =>
    handleNotification(errorMessage, 'error');

  return { notifySuccess, notifyError };
}
