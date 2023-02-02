/*global cy*/
/*eslint no-undef: "error"*/
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('html').should('not.contain', 'root logged in')
  })
  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('root logged in')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('blog.cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })
    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'tester1', url:'test.tv', likes:'200' })
        cy.createBlog({ title: 'second blog', author: 'tester2', url:'test.tv', likes:'10' })
        cy.createBlog({ title: 'third blog', author: 'tester3', url:'test.tv',likes:'1000' })
        cy.createBlog({ title: 'fourth blog', author: 'tester4', url:'test.tv',likes:'12' })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog')
          .contains('Show more')
          .click()

        cy.contains('second blog')
          .contains('like')
          .click()

        cy.contains('second blog')
          .contains('11')
      })
      it('blog can be deleted',function (){
        cy.contains('third blog')
          .contains('Show more')
          .click()

        cy.contains('third blog')
          .contains('Remove')
          .click()

        cy.should('not.contain', 'third blog')
      })
      it('remove button cannot be viewed by other users',function (){
        cy.contains('logout').click()
        const user = {
          name: 'admin',
          username: 'admin',
          password: 'admin'
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.visit('')
        cy.login({ username: 'admin', password: 'admin' })
        cy.contains('first blog')
          .contains('Show more')
          .click()
        cy.contains('first blog').should('not.contain', 'Remove')
      })
      it('the blogs are presented in the order of likes from high to low', function () {
        cy.get('.blog').eq(0).should('contain', 'third blog')
        cy.get('.blog').eq(1).should('contain', 'first blog')
        cy.get('.blog').eq(2).should('contain', 'fourth blog')
        cy.get('.blog').eq(3).should('contain', 'second blog')
      })
    })
  })
})