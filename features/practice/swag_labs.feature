Feature: Swag Labs

    Background:
    Given Martin has logged in with credentials "standard_user" and "secret_sauce"
    
    @swag    
    Scenario: Standard user completes checkout
        When he adds "Sauce Labs Backpack" to the cart
        And he completes checkout with:
            | firstName  | Martin   |
            | lastName   | Martinez |
            | postalCode | 66666    |
        Then he should see the confirmation "Thank you for your order!"