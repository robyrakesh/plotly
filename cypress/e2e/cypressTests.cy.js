/// <reference types="cypress" />
// In your support/commands.js or support/index.js file


describe('Plotly Assessment', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Verify users are able to visit the website and able to scroll down to "Loved by OSS"', () => {
    cy.get('.max-w-\\[960px\\] > .mb-\\[16px\\]').should('have.text', '\nLoved by OSS,\n      trusted by Enterprise');
    cy.contains('Weekly downloads').parent().within(() => {
      cy.get('.font-bold ')
        .should('be.visible')
        .invoke('text')
        .then((downloads) => {
          cy.log(`Weekly Download: ${downloads}`)
        })
    })
  })

  it('Verify user is able to click on company and about us', () => {
    cy.get('.nav-bar > .relative > :nth-child(4)').trigger('mouseover')
    cy.contains('About Cypress ').click({force: true})
    cy.url().should('be.equal', 'https://www.cypress.io/about-us')
    cy.contains('About us').should('be.visible')
  })

  it.only('User is able to click on “Install” and then on “npm install cypress” and make sure the copied text is “npm install cypress --save-dev”', () => {
    cy.get('astro-island > .border').click({force:true});
    cy.get('[data-cy="modal-install-copy"]').click({force: true});
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('npm install cypress --save-dev');
      });
    });
  })

  it('User is able to click on “Product” and then “visual review”', () => {
    cy.get('#dropdownProduct').trigger('mouseover')
    cy.get(':nth-child(5) > .grid > :nth-child(2) > .group > .font-secondary').click({force: true});
    cy.url().should('include', '#visual_reviews');
    cy.xpath('//*[@id="visual_reviews"]/div/div/p')
      .should('be.visible')
  })

  it('User is able to click on “Product”, then “Smart Orchestration”, then scroll down to “Test Analytics” and see that the green circle is around “Test Analytics”', () => {
    cy.get('[data-cy="dropdown-product"]').trigger('mouseover')
    cy.contains('Smart Orchestration').click({force: true})
    cy.xpath('/html/body/astro-island/header/astro-slot/astro-island/nav/div[2]/div[2]/a[3]')
      .should('not.have.class', 'whitespace-nowrap rounded-full border px-[12px] py-[4px] text-[16px] leading-[24px] transition-colors border-jade-200 bg-white text-teal-600')
    cy.xpath('//*[@id="test_analytics"]/div/div/p').scrollIntoView()
    cy.xpath('/html/body/astro-island/header/astro-slot/astro-island/nav/div[2]/div[2]/a[3]')
      .should('have.class', 'whitespace-nowrap rounded-full border px-[12px] py-[4px] text-[16px] leading-[24px] transition-colors border-jade-200 bg-white text-teal-600')
  })

})
