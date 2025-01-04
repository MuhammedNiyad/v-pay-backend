const { google } = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

const getUserDetailsFromGoogle = async (email) => {
  try {
    // Set up People API
    const people = google.people({
      version: 'v1',
      auth: oauth2Client,
    });

    // Use the People API to search for the email address
    const response = await people.people.searchContacts({
      query: email,
      readMask: 'emailAddresses,names,photos',
    });

    // Check if the email exists
    if (response.data.results && response.data.results.length > 0) {
      const userDetails = response.data.results[0].person;

      const name = userDetails.names?.[0]?.displayName || 'Unknown';
      const photo = userDetails.photos?.[0]?.url || '';
      const emailAddress = userDetails.emailAddresses?.[0]?.value;

      return { email: emailAddress, name, avatar: photo };
    } else {
      throw new Error('User not found with this email in Google');
    }
  } catch (error) {
    console.error('Google People API error:', error.message);
    throw new Error('Unable to fetch user details from Google');
  }
};

module.exports = { getUserDetailsFromGoogle };
