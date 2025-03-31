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
const tasksText = Selector('div.MuiBox-root p.MuiTypography-body1').withText('Tasks');
const addTaskButton = Selector('button[class$="css-84c6ri"]');
const submitButton = Selector('button[type="Submit"]');

test('User should not be able to submit without filling form', async t => {     //task 2, negative
    await t   
        .maximizeWindow()
        .typeText(usernameInput, 'demouser@easecommerce.in')
        .typeText(passwordInput, 'cE7iQPP^')
        .expect(loginButton.visible).ok()
        .click(loginButton)
        .expect(adminText.innerText).contains('admin')
        .expect(openSetting.visible).ok()
        .click(openSetting)
        .expect(switchToEmployee.visible).ok()
        .click(switchToEmployee).wait(2000);

    const myUrl = await getURL();

    await t
        .expect(myUrl).contains('/employee')
        .expect(tasksText.innerText).contains('Tasks')
        .expect(addTaskButton.visible).ok()
        .click(addTaskButton)
        .click(submitButton).wait(2000)
        .expect(submitButton.hasAttribute('disabled')).ok();
});
