fixture('API Test - Login & Fetch Warehouse Data');

test('Login and Fetch Warehouse List', async t => {

    const loginUrl = 'https://easecommerce.in/api/v2/login';
    const warehouseUrl = 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default';

    // Send Login Request
    const credentials = {
        username: "demouser@easecommerce.in",
        password: "cE7iQPP^"
    };

    const loginResponse = await t.request({
        url: loginUrl,
        method: 'POST',
        body: credentials,
        headers: { 'Content-Type': 'application/json' }
    });

    // Validate response status and extract token
    await t.expect(loginResponse.status).eql(201, 'Login failed: Status code mismatch');
    const responseBody = loginResponse.body;

    await t.expect(responseBody).ok('Response body is empty');
    await t.expect(responseBody.token).ok('Token not found in response');

    const token = responseBody.token;
    console.log('Extracted Token:', token);

    // Fetch Warehouse List Using Token
    const warehouseResponse = await t.request({
        url: warehouseUrl,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Validate Warehouse List Response
    await t.expect(warehouseResponse.status).eql(200, 'Warehouse API call failed');
    await t.expect(warehouseResponse.body).ok('Warehouse list response is empty');

    console.log('Warehouse List:', JSON.stringify(warehouseResponse.body, null, 2))
});
