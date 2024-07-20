import { generateCodeVerifier, generateCodeChallenge } from '../../utils/pkce';

const SpotifyAuth = (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Save codeVerifier in session for token exchange
  req.session.codeVerifier = codeVerifier;

  const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=user-read-email%20user-top-read%20playlist-read-private`;

  res.redirect(authorizationUrl);
};

export default SpotifyAuth;