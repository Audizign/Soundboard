const { GoogleAdsApi } = require('google-ads-api');
const env = require('dotenv');

// Set up Google Ads API client
const client = new GoogleAdsApi({
  client_id: env.CLIENT_ID,
  client_secret: env.CLIENT_SECRET,
  developer_token: env.DEVELOPER_TOKEN,
  refresh_token: env.REFRESH_TOKEN,
  login_customer_id: env.LOGIN_CUSTOMER_ID
});

// Create a new ad group
const adGroup = client.adGroup({
  name: env.AD_GROUP_NAME,
  campaignId: env.CAMPAIGN_ID
});

// Create a new ad
const ad = adGroup.ad({
  headline: env.AD_HEADLINE,
  description: env.AD_DESCRIPTION,
  finalUrls: [ env.URL ],
  path1: 'path1',
  path2: 'path2'
});

// Display the ad on the page
const adHtml = ad.displayUrl + ' ' + ad.headline;
module.exports = { adHtml };