import {Masked, Task} from '@serenity-js/core';
import {Click, Enter, PageElement, By} from '@serenity-js/web';

export class Authenticate {
    
    private static usernameField = PageElement
        .located(By.role('textbox', { name: 'Username' }))
        .describedAs('username field');

    private static passwordField = PageElement
        .located(By.role('textbox', { name: 'Password' }))
        .describedAs('password field');

    private static loginButton = PageElement
        .located(By.role('button', { name: 'Login' }))
        .describedAs('login button');

    static withCredentials = (username: string, password: string) =>
        Task.where(`#actor logs in as ${ username }`,
            Enter.theValue(username).into(Authenticate.usernameField),
            Enter.theValue(Masked.valueOf(password)).into(Authenticate.passwordField),
            Click.on(Authenticate.loginButton),
        );
}