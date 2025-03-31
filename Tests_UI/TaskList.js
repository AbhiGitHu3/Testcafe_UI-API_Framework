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
const selectSuperCategory = Selector('input[placeholder="Select Super Category"]');
const selectSubCategory = Selector('input[placeholder="Select Sub Category"]');
const selectPortals = Selector('input[placeholder="Select Portals"]');
const selectProducts = Selector('input[placeholder="Select Products"]');
const selectTaskName = Selector('input[placeholder="Select Task Name"]');
const selectAssignee = Selector('input[placeholder="Select Assignee"]');
const selectReviewers = Selector('input[placeholder="Select Reviewers"]');
const selectPriority = Selector('input[placeholder="Select Priority"]');
const calenderClick = Selector('button[aria-label="Choose date"]')
const todayDate = Selector('button.MuiPickersDay-today');
const descriptionWriteBox = Selector('div[class$="ql-container ql-snow"]>div>p')


test('User should not be able to submit without filling form and should be able to fill after filling the required fields', async t => {        //task 2.3 and 2.4
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
        .expect(openSetting.visible).ok()
        .click(selectSuperCategory)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectSubCategory.visible).ok()
        .click(selectSubCategory)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectPortals.visible).ok()
        .click(selectPortals)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectProducts.visible).ok()
        .click(selectProducts)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectTaskName.visible).ok()
        .click(selectTaskName)
        .typeText(selectTaskName, 'Testing')
        .expect(selectAssignee.visible).ok()
        .click(selectAssignee)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectReviewers.visible).ok()
        .click(selectReviewers)
        .pressKey('down')
        .pressKey('enter')
        .expect(selectPriority.visible).ok()
        .click(selectPriority)
        .pressKey('down')
        .pressKey('enter')
        .expect(calenderClick.visible).ok()
        .click(calenderClick).wait(2000)
        .expect(todayDate.visible).ok()
        .click(todayDate)
        .click(submitButton).wait(2000)  // Submit button is disabled as description(*required field) is not filled
        .expect(submitButton.hasAttribute('disabled')).ok()
        .typeText(descriptionWriteBox, 'Write description here')
        .expect(submitButton.visible).ok()
        .click(submitButton).wait(2000);  // Submit button is enabled as description(*required field) is filled

});
