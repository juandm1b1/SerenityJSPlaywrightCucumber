import {Given, When, Then, DataTable} from "@cucumber/cucumber";
import {Actor} from '@serenity-js/core';
import {Ensure, equals} from "@serenity-js/assertions";
import {Navigate} from "@serenity-js/web";

import { Authenticate, Inventory, Checkout } from '../../test';

Given('{actor} has logged in with credentials {string} and {string}', async (actor:Actor, username: string, password: string) => {
    await actor.attemptsTo(
            Navigate.to('/'),
            Authenticate.withCredentials(username, password),
        );
    }
);

When('{pronoun} adds {string} to the cart', async (actor:Actor, itemName: string) => {
    await actor.attemptsTo(
            Inventory.productCalled(itemName).addToCart(),
        );
    }
);

When('{pronoun} completes checkout with:', async (actor, dataTable: DataTable) => {
    const rows = dataTable.rowsHash();
    const info = {
        firstName: rows.firstName,
        lastName: rows.lastName,
        postalCode: rows.postalCode,
    };
    await actor.attemptsTo(
            Checkout.completeWith(info),
        );
    }
);

Then('{pronoun} should see the confirmation {string}', async (actor:Actor, expectedMessage: string) => {
    await actor.attemptsTo(
            Ensure.that(
                Checkout.confirmationHeading(), equals(expectedMessage)),
        );
    }
);