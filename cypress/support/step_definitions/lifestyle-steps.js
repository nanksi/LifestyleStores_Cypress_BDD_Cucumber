///<reference types="Cypress"/>
///<reference types="@cypress/xpath"/>
import { before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('open the browsers and Navigate to the Home Page', ()=>{
  cy.viewport(1280, 800)//adjusting screen size
  cy.visit("https://www.lifestylestores.com/in/en") //visit to Lifestyle Stores Hompage
  cy.wait(5000)
})
When('Verifying for the Search bar in the Navbar',()=>{
  cy.get('#js-site-search-input').should('exist') //verifying search bar
})
And('Search on the search bar for {word} {word}',(firstSearch, secondSearch)=>{
  const searcWord = firstSearch+" "+secondSearch
  cy.get('#js-site-search-input').type(searcWord) //Type "Marvel Comics" in Search bar on Navbar
  cy.get('#js-site-search-input').type('{enter}') //After typing press enter key
  cy.wait(4000)
  cy.url().should('contain', firstSearch) //verifying url after search
  cy.get('.MuiTypography-h2').should('contain', searcWord)//verifying top heading of page which should include Marvel Comics
})

And('Verifying for the Men button in the Shop for filter list',()=>{
  cy.get('a[href$="Amen"]').should('have.text', 'Men')//Men filter at top
})

Then('Validating for the Men button in the Shop for filter list',()=>{
  cy.get('a[href$="Amen"]').click()//Click on Men filter
  cy.url().should('contain','Amen')//check url if its filtering by Men
})

When('Verifying for the Products list',()=>{
  cy.get('#js-site-search-input').type("Marvel Comics{enter}")//searching Marvel Comics
  cy.wait(5000)
  cy.get('a[href$="Amen"]').click()//filtering Men
  cy.wait(5000)
  cy.get('.product').each(($el,index,$list)=>{
    if(index === $list.length - 1){
      cy.xpath('//div[contains(text(),"products out of")]').should('contain',$list.length)//cheking if visible products are equal to below out of all products
    }
  })
})

And('Validating for the Product in the Products list',()=>{
  cy.get('#product-1').find('div+div').find('a').invoke('text').then((text)=>{
    Cypress.env('product1',text)//making product1 variable global
  })
  cy.get('#product-1').find('div+div').find('a').invoke('removeAttr','target').click()//removing attr to open in same page
  cy.get('h1').invoke('text').then((text)=>{
    const firstProductName= Cypress.env('product1')
    expect(text).to.equal(firstProductName)//validating if its sending to correct product by getting it heading verified
  })
})

Then('Verifying for the Product details in the Single product page',()=>{
  cy.get('#details-price').find('div:first-child+div').invoke('text').then((t)=>{
    cy.wrap(t).should('exist')//verifying price of product
    cy.log(t)//console price of product
  })
  cy.get('#details-size').should('exist')//verifying sizes of product
  cy.get('#details-size > div > div:last-child').find('button').each(($el)=>{
    cy.log($el.text())//console sizes of product
  })
  cy.get('#details-overview').scrollIntoView().should('exist')//verifying overview of product
  cy.get('#details-overview  ul').find('li').each(($el)=>{
    cy.log($el.text())//console overviews of product
  })
})

When('Verifying for the Add to Favourites button in the Single product page',()=>{
  cy.get('#js-site-search-input').type("Marvel Comics{enter}")//searching Marvel Comics
  cy.wait(5000)
  cy.get('a[href$="Amen"]').click()//filtering Men
  cy.wait(5000)
  cy.get('#product-1').find('div+div').find('a').invoke('removeAttr','target').click()//removing attr of 1st product to open in same page
  cy.wait(5000)
  cy.contains('Favourites').scrollIntoView().should('have.text', 'Add to Favourites')//verifying Add to Favourites button before clicking
})

And('Validating for the Add to Favourites button in the Single product page',()=>{
  cy.contains('Favourites').click()//click on Add to Favourites button
  cy.get('#mobileNumber').type('9325491615')//signing process required for Adding to Favourites
  cy.get('#signup-form-submit').click()
  cy.wait(15000)
  cy.contains('Favourites').scrollIntoView().should('have.text', 'Added to Favourites')//verifying Add to Favourites button after clicking
})

And('Verifying for the Favourites icon on the product',()=>{
  cy.go('back')//going back to product page
  cy.wait(5000)
  cy.get('#product-2 .favButtonOnProduct').as('product2favbtn')//giving aliases to favourites button icon of 2nd product
  cy.get('@product2favbtn').should('exist')//verifying favourites button icon of 2nd product before clicking
})

And('Validating for the Favourites icon on the product',()=>{
  cy.get('@product2favbtn').click()//clicking favourites button icon of 2nd product
  cy.get('#product-4 .favButtonOnProduct').click()//clicking favourites button icon of 4nd product
  cy.get('@product2favbtn').should('not.exist')//verifying favourites button icon of 2nd product after clicking - class atrr get removed after adding to favourites
})

And('Verifying for the Favourites icon on the Navbar',()=>{
  cy.get('*[href$="wishlist"]').should('exist')//Verifying for the Favourites icon on the Navbar
})

And('Validating for the Favourites icon on the Navbar',()=>{
  cy.get('*[href$="wishlist"]').click()//Clicking Favourites icon on the Navbar
  cy.wait(5000)
  cy.url().should('contain','wishlist')//Checking if url is of Favourite page
})

And('Verifying for the Favourites page',()=>{
  cy.get('.wishlist__item__details__name').should('have.length',3)//cheking how many products is listed in favourites
  cy.get('.wishlist__item__details__name').each(($el,index,$list)=>{
    cy.log($el.text())//consle the name of products
  })
})

And('Verifying for the Size options on the Favourites page',()=>{
  cy.get('.jcf-select-sizes').eq(0).should('exist')//Verifying if Size option present in products list of favourites page
})

And('Validating for the Size options on the Favourites page',()=>{
  cy.get('.jcf-select-sizes').eq(0).click({ force: true })//Click on size selector
  cy.get('span[data-index="5"]').click({ force: true })//selecting XXL
  cy.get('.jcf-select-sizes').eq(0).should('have.text','XXL')//checking if XXL selected
})

And('Verifying for the Remove button on the Favourites page',()=>{
  cy.get('.wishlist__item__options__remove').eq(0).should('exist')//verifying remove button
})

And('Validating for the Remove button on the Favourites page',()=>{
  cy.get('.wishlist__item__options__remove').eq(0).click({ force: true })//clicking remove button
  cy.get('.wishlist__item__details__name:visible').should('have.length',2)//checking product list after removing product
})

And('Verifying for the Remove All button on the Favourites page',()=>{
  cy.get('.delete-opener').should('exist')//cheking Remove All button
})

And('Validating for the Remove All button on the Favourites page',()=>{
  cy.get('.delete-opener').scrollIntoView().click({ force: true })//clicking Remove All button
  cy.get('.delete-popup-frame>.title').should('have.text','Are you sure?')//checking confirmatiion message
})

And('Verifying for the Nevermind button on the Remove All confirmation box',()=>{
  cy.wait(2000)
  cy.get('.closer').should('exist')//checking Nevermind button
})

And('Validating for the Nevermind button on the Remove All confirmation box',()=>{
  cy.get('.closer').click({ force: true })//clicking Nevermind button
  cy.get('.wishlist__item__details__name:visible').should('have.length',2)//checking product list after clicking Nevermind button
})

And('Verifying for the Remove All button on the Remove All confirmation box',()=>{
  cy.get('.delete-opener').click({ force: true })//clicking Remove All button
  cy.wait(2000)
  cy.get('.btn-delete').should('exist')//checking Remove All button inside confirmation box
})

Then('Validating for the Remove All button on the Remove All confirmation box',()=>{
  cy.get('.btn-delete').click({ force: true })//clicking Remove All button inside confirmation box
  cy.wait(2000)
  cy.get('.empty-block > h2').should('have.text','Hmmm. No favourites as yet.')//checking message for empty page
})
