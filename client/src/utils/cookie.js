import cookie from "react-cookies";

class UserCookie {
  static saveUserId = (userId) => cookie.save("userId", userId, { path: "/" });
  static getUserId = () => cookie.load("userId");
}

export default UserCookie;
