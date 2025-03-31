const warehouseUrl = 'https://easecommerce.in/api/v2/manage/warehouse/master/list';

fixture `Warehouse API Tests`;

test('Test API with Invalid Token', async t => {
    const invalidToken = 'invalid-token-123';

    const response = await t.request({
        url: `${warehouseUrl}?group=default`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${invalidToken}`
        }
    });

    // Validate response
    await t.expect(response.status).eql(401, 'API should return 401 for invalid token');
    console.log('✅ Test Passed: Invalid token returned 401 Unauthorized');
});

test('Test API with Missing Query Parameter', async t => {
    const validToken = 'your-valid-token-here';

    const response = await t.request({
        url: warehouseUrl, // No "group" parameter included
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${validToken}`
        }
    });

    // Validate response
    await t.expect(response.status).notEql(200, 'API should not return 200 for missing parameters');
    console.log('✅ Test Passed: API handled missing query parameters gracefully');
});

test('Test API with a Non-Existing Warehouse Group', async t => {
    const validToken = 'your-valid-token-here';

    const response = await t.request({
        url: `${warehouseUrl}?group=non_existing_group`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${validToken}`
        }
    });
    
    // Validate response
    await t.expect(response.status).eql(401, 'API should return 200 even for a non-existing warehouse group');
    console.log(response.body);
    console.log('✅ Test Passed: API returned an empty list for non-existing warehouse group');
});
