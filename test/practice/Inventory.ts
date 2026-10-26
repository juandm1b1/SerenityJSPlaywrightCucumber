import {Task} from "@serenity-js/core";
import {Click, Text, PageElement, PageElements, By} from "@serenity-js/web";
import { equals } from '@serenity-js/assertions';

export class ProductCard {
    constructor(private name: string) {}
    
    private card = PageElements.located(By.css('[data-test="inventory-item"]'))
        .where(
            Text.of(PageElement.located(By.css('[data-test="inventory-item-name"]'))),
            equals(this.name)
        )
        .first()
        .describedAs(`product card for ${this.name}`);

    private inventoryItemPrice = PageElement.located(By.css('[data-test="inventory-item-price"]'))
        .of(this.card)
        .describedAs(`price of "${this.name}"`);

    private addToCartButton = PageElement.located(By.role('button', { name: 'Add to cart' }))
        .of(this.card)
        .describedAs(`"Add to cart" button for "${this.name}"`);

    price = () => Text.of(this.inventoryItemPrice);

    addToCart = () =>
        Task.where(`#actor adds "${this.name}" to the cart`,
            Click.on(this.addToCartButton),
        );
}

export class Inventory {
    static productCalled = (name: string) => new ProductCard(name);
}