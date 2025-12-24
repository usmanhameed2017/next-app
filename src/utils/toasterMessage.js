import { toast, Zoom, Icons } from 'react-toastify';

// Success
export const showSuccess = (msg, duration = 2000) => {
    toast.success(msg, {
        position: 'bottom-left',
        autoClose: duration,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        theme: 'colored',
        icon: Icons.success,
        transition: Zoom,
    });
};

// Error
export const showError = (msg, duration = 2000) => {
    toast.error(msg, {
        position: 'bottom-left',
        autoClose: duration,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        theme: 'colored',
        icon: Icons.warning,
        transition: Zoom,
    });
};