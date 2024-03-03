/// <reference types="cypress" />

// Cypress API testing script
describe('DASH VoD Channel API Tests', () => {
  it('POST DASH VoD channel', () => {
    // Hardcoded values
    const apiKey = 'ec42c250-44bf-4738-bb09-5406cacf28a7';
    const MRSSUrl = 'https://serversideai.blob.core.windows.net/agsmrss/serverside/serverside_mrss_dash_preroll_midroll.mrss';
    const channelId = '4075be64-6af4-4e9b-a371-b0986204d189';
    const deliveryTypes = 'dash';

    // Make a POST request
    cy.request({
      method: 'POST',
      url: `https://live.serverside.ai/ad-aggregation-service/mrss/channel/${channelId}`,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: {
        url: MRSSUrl,
        deliverytypes: [deliveryTypes],
      },
    }).then((response) => {

      // Status code checks
      if (response.status === 200) {
        cy.log('Status code is 200');
      } else if (response.status === 401) {
        cy.expect.fail(`Status code is 401: unauthorized ${response.status}`);
      } else if (response.status === 400) {
        cy.expect.fail(`Status code is 400: Bad Request ${response.status}`);
      } else if (response.status === 403) {
        cy.log('Status code is 403: Forbidden');
      } else {
        cy.expect.fail(`Unexpected status code: ${response.status}`);
      }

      // Test if the response is in JSON format
      expect(response.headers['content-type']).to.include('application/json; charset=utf-8');

      // Test properties in the response body
      const dash = response.body.dash;
      expect(dash).to.have.property('url');
      expect(dash.url).to.not.be.null;
      expect(dash.url).to.include('https://live.serverside.ai/vod/mpds');

      expect(dash).to.have.property('clips');
      expect(dash.clips).to.be.an('array');
      expect(dash.clips).to.have.length.above(0);

      const firstClip = dash.clips[0];
      //const dash = response.body.dash;

      expect(firstClip).to.have.property('category');
      expect(firstClip).to.have.property('titleId');
      expect(firstClip).to.have.property('title');
      expect(firstClip).to.have.property('duration');

      // Response time check
      expect(response.duration).to.be.below(1500);
    });
  });
});

