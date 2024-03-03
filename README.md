# Cypress API Testing for DASH VoD Channel

This repository contains a Cypress test script for API testing of DASH VoD channels. The script makes a POST request to create a DASH VoD channel using the specified parameters and validates the response.

## Prerequisites

Before running the test script, ensure that you have the following:

- [Cypress](https://www.cypress.io/) installed.
- API key for authentication.

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/usmanali18feb/VOD_Cypress_API_Testing.git
```

2. Install cypress:

```bash
npm install cypress --save-dev
```

3. Open the Cypress test runner:

```bash
npx cypress run 
OR
npx cypress open
```

4. Run the `DASH_VoD_Channel_API_Test.spec.js` test script. (with cypress open)

## Tests
The following tests are performed after the API response:

- Check the status code and ensure it is 200.
- Validate that the response is in JSON format.
- Verify the existence of the 'dash' property in the response body.
- Check the 'url' property in the 'dash' property:
  - Ensure it is not null.
  - Confirm that it contains the expected substring.
- Verify the existence of the 'clips' property in the 'dash' property:
  - Ensure it is an array.
  - Confirm it has at least one item.
- Check the properties of the first item in the 'clips' array.

## Notes

- Ensure that the MRSS URL and other parameters are valid for your use case.
- This script assumes a specific API endpoint and structure. Adjust the URL and request body accordingly for your API.

Happy testing! 🚀
