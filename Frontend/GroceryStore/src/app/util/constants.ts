export const REGEX = {
    email: "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&' * +/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"

}

export const API_URLS = {
    signup: 'api/v1/auth/signup',
    login: 'api/v1/auth/login',
    getproduct: 'api/v1/superadmin/getProduct'

}

export const STORAGE = {
    USER_ROLE: 'userRole',
    TOKEN: 'authToken',
    USER_NAME: 'userName',
    login: 'api/v1/auth/login',
    getproduct: 'api/v1/superadmin/getProduct'

}