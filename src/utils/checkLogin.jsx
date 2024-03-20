export default function checkLogin() {
  try {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      return { token: tokenString, isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  } catch (error) {
    return { isLoggedIn: false };
  }
}
