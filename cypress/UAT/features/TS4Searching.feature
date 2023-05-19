Feature: To validate LifestyleStores Searching UIUX and Functionality

  # TSc 04:
  Scenario: Searching for a particular product
    Given open the browsers and Navigate to the Home Page
    When Verifying for the Search bar in the Navbar
    And Search on the search bar for Marvel Comics
    And Verifying for the Men button in the Shop for filter list
    Then Validating for the Men button in the Shop for filter list
