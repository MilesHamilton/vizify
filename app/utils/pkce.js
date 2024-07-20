import crypto from 'crypto';

export const generateCodeVerifier = () => {
  const codeVerifier = crypto.randomBytes(32).toString('hex');
  return codeVerifier;
};

export const generateCodeChallenge = (codeVerifier) => {
  return crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};