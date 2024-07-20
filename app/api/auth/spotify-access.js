const SpotifyAccess
 = async (req, res) => {
  const accessToken = req.session.accessToken; // Retrieve access token from session

  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json(); // Parse the response as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default SpotifyAccess
;