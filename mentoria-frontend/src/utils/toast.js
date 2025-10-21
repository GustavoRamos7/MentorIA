import { toast } from 'react-toastify';

export const showToast = {
  success: (msg) => {
    toast.dismiss();
    toast.success(msg);
  },
  error: (msg) => {
    toast.dismiss();
    toast.error(msg);
  },
  info: (msg) => {
    toast.dismiss();
    toast.info(msg);
  },
  warn: (msg) => {
    toast.dismiss();
    toast.warn(msg);
  }
};
