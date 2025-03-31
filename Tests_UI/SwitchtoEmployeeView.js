import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

fixture('EaseCommerce Login Test')
    .page('https://easecommerce.in/app/login');

const getURL = ClientFunction(() => window.location.href);

const usernameInput = Selector('#login-form-username');
const passwordInput = Selector('#login-form-password');
const loginButton = Selector('button').withText('LOGIN');
const adminText = Selector('h6.MuiTypography-subtitle2');
const openSetting = Selector('button[aria-label="Open Settings"]');
const switchToEmployee = Selector('li[role="menuitem"]');
const tasksText = Selector('div.MuiBox-root p.MuiTypography-body1').withText('Tasks')

test('User should be able to switch to employee tab', async t => {
    await t
        .maximizeWindow()
        .typeText(usernameInput, 'demouser@easecommerce.in')
        .typeText(passwordInput, 'cE7iQPP^')
        .click(loginButton)
        .expect(adminText.innerText).contains('admin')
        .click(openSetting)
        .click(switchToEmployee).wait(2000);

    const myUrl = await getURL();

    await t
        .expect(myUrl).contains('/employee')
        .expect(tasksText.innerText).contains('Tasks');
});


