export const domain = 'car-maintain.us.auth0.com';
export const auth0Params = {
  authorizationParams: {
    audience: `https://${domain}/api/v2/`,
    scope: 'read:current_user update:current_user_metadata openid profile',
  },
};
