import localStorageHelper from '@/helpers/localStorageHelper';

const USER_STATUS = 'USER_STATUS';
const USER_NAME = 'USER_NAME';

export default class AuthService {
  static isLoggedIn() { // may not reliable if use disabled localstorage (eg. Private mode)
    return !!AuthService.getAuthStatus();
  }

  static getAuthStatus() {
    return localStorageHelper.getItem(USER_STATUS);
  }

  static getLoggedUserName() {
    return localStorageHelper.getItem(USER_NAME);
  }
}
