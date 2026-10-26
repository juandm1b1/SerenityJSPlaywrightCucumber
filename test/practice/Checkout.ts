import {Task} from "@serenity-js/core";
import {Click, Enter, Text, PageElement, By} from "@serenity-js/web";

export class Cart {    

    private static cartLink = PageElement
    .located(By.css('[data-test="shopping-cart-link"]'))
    .describedAs('shopping cart button');

    private static checkoutButton = PageElement
        .located(By.role('button', { name: 'Checkout' }))
        .describedAs('checkout button');

    static open = () =>
        Task.where(`#actor opens the shopping cart`,
            Click.on(Cart.cartLink),
        );
    
    static checkout = () =>
        Task.where(`#actor proceeds to checkout`,
            Cart.open(),
            Click.on(Cart.checkoutButton),
        );
}

export class Checkout {
    
    private static firstNameField = PageElement
    .located(By.role('textbox', { name: 'First Name' }))
    .describedAs('first name');

    private static lastNameField = PageElement
        .located(By.role('textbox', { name: 'Last Name' }))
        .describedAs('last name');

    private static postalCodeField = PageElement
        .located(By.css('[data-test="postalCode"]'))
        .describedAs('postal code');

    private static continueButton = PageElement
        .located(By.role('button', { name: 'Continue' }))
        .describedAs('continue button');

    private static finishButton = PageElement
        .located(By.role('button', { name: 'Finish' }))
        .describedAs('finish button');

    private static confirmationHeader = PageElement
        .located(By.role('heading', { name: /Thank you for your order!/i }))
        .describedAs('confirmation heading');

    static completeWith = (info: { firstName: string, lastName: string, postalCode: string }) =>
        Task.where(`#actor completes checkout`,
            Cart.checkout(),
            Enter.theValue(info.firstName).into(Checkout.firstNameField),
            Enter.theValue(info.lastName).into(Checkout.lastNameField),
            Enter.theValue(info.postalCode).into(Checkout.postalCodeField),
            Click.on(Checkout.continueButton),
            Click.on(Checkout.finishButton),
        );

    static confirmationHeading = () => Text.of(Checkout.confirmationHeader);
}