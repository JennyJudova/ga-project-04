# # Software Engineering Immersive: Project 4\*

This is the 4th project during the General Assembly Software Engineering Immersive course (Week 11). This was a solo project .

---

## Invoicer

The project Invoicer is a CRUD application that allows users to create, view, edit and delete invoices.

### Brief

In 8 days I had to:

- *Build a full-stack application*by making your own backend and your own front-end
- *Use Django API*to serve your data from a Postgres database
- *Consume your API with a separate front-end*built with React
- *Be a complete product*which most likely means multiple relationships and CRUD functionality for at least a couple of models
- *Implement thoughtful user stories/wireframes*that are significant enough to help you know which features are core MVP and which you can cut
- *Have a visually impressive design*to kick your portfolio up a notch and have something to wow future clients & employers.*ALLOW*time for this.
- *Be deployed online*so it’s publicly accessible.

### Choosing the project.

As I am interested in fintech and financial responsibility I wanted to create a project within the fintech space that would not require payment taking. After a brainstorming session, I decided on an invoicing solution.

### Technologies Used:

- JavaScript
- React
- HTML
- CSS
- Sass
- Node.js
- Express
- Axios
- Yarn
- PostgreSQL
- Python
- Django
- SQL

### Backend Models

The database comprises of 4 models:

- User
- User’s client to whom they are sending the invoice
- The job done
- The invoice

---

### Getting started

Use the clone button to download the source code. In the terminal enter the following commands:

`<!— To install all the packages listed in the package.json: —>`
`$ yarn`
`<!— Run the app in your localhost: —>`
`$ yarn start`
`<!— Check the console for any issues and if there are check the package.json for any dependancies missing —>`

---

### User Experience

To use the app you need to login and register.

Once registered you are taken to your profile where you are prompted to complete your registration and add more details about yourself and/or your business that are needed for an invoice.

Your profile also shows you invoices you created, by clicking on the invoice tiles you are taken to the invoice show page where you can update the invoices or delete them.

To create a new invoice you have to click on ‘Create New Invoice’ where you can add a client, and add the jobs that you want to be paid for.

The invoice generates the total you should be paid automatically based on the amount you charge per hour and hours worked. It also adds VAT if you need to charge VAT.

---

### Future features or change

- Allowing users to email invoices from the platform
- allowing users to download the invoice pdf
- An address book of existing user’s clients (so that you do not need to create the client every time you create a new invoice)
