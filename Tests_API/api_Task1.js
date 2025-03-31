fixture('EaseCommerce Login API Test')

test('Verify login API and extract token', async t => {
    // Define the API URL and credentials
    const loginAPI = 'https://easecommerce.in/api/v2/login';
    const credentials = {
        username: "demouser@easecommerce.in",
        password: "cE7iQPP^"
    };

    // Send a POST request to login
    const response = await t.request({
        url: loginAPI,
        method: 'POST',
        body: credentials,
        headers: { 'Content-Type': 'application/json' }
    });

    // Validate the response status and extract token
    await t.expect(response.status).eql(201, 'Login failed: Status code mismatch');

    const responseBody = response.body;

    await t.expect(responseBody).ok('Response body is empty');
    await t.expect(responseBody.token).ok('Token not found in response');

    // Store the token for future API calls
    const token = responseBody.token;
    console.log('Extracted Token:', token);

});
