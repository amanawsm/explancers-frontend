export const notificationOptions = {
    title: "Title",
    message: "Message",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    },
    pauseOnHover: true
}

// Update production URL to your server URL
export const SERVER_BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3002" : "http://localhost:3000";

export const USERS_API = '/users';
export const AVATAR_API = '/avatar';