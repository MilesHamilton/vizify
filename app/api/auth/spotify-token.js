const SpotifyToken = async (req, res) => {
    const { code } = req.query;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const codeVerifier = req.session.codeVerifier; // Retrieve the codeVerifier from session or secure storage
  
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });
  
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });
  
      const data = await response.json(); 
      const { access_token, refresh_token } = data;
      // Save tokens in session or secure storage
      req.session.accessToken = access_token;
      req.session.refreshToken = refresh_token;
  
      res.redirect('/'); 
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export default SpotifyToken;
  