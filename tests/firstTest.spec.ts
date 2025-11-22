import {expect, test} from '@playwright/test'

test.describe('test suite 1', () =>{
    test.beforeEach(async({page}) => {
        await page.goto('http://localhost:4200')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Locator syntax rules', async ({page}) => {
        page.locator('input').nth(0)
    })

    test('location child elements', async ({page})=> {
        await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    })

    test('locating parent elements', async ({page}) => {
        await page.locator('nb-card')
        .filter({has: page.locator('nb-checkbox')})
        .filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: "Email"}).click()

        await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
    })

    test('extracting values', async ({page}) => {
        const buttonText = await page.locator('nb-card').filter({hasText: "Basic form"})
            .locator('button').textContent()
        expect(buttonText).toEqual('Submit')
    })

    test('locator assertions', async ({page}) => {
        const buttonText = await page.locator('nb-card').filter({hasText: "Basic form"})
            .locator('button')
        await expect(buttonText).toHaveText('Submit')
    })
})