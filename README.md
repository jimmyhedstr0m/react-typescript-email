# React Typescript Email Service

Create and serve email templates on the fly with Node Express and React. Heavily inspired by [Grunt Email Workflow](https://github.com/leemunroe/grunt-email-workflow)

Build your email templates with React, TypeScript and Sass. Create mock data and preview the results directly in the browser. No need to mess around with tables any more with React components as simple wrappers.

## Features
* Inlines CSS with [Juice](https://github.com/Automattic/juice) for full email legacy support
* Mailgun integration for sending emails through a simple API
* Mock and preview emails in the browser

## Getting started

### 1. Setup

Clone this repo, cd to the directory, run `npm install` to install the necessary packages.

```sh
git clone https://github.com/userapan/react-typescript-email.git
cd react-typescript-email
npm install
```

#### 2. Create secrets.json

Create a `secrets.json` file in your project root in same format as `secrets.example.json` with your credentials to Mailgun. If the file is missing, the project won't compile.

#### 3. Run the app

Run `npm run start` and navigate to http://localhost:3000 to open the built in email previewer.

#### 4. Create an email template

Included in the project are two example email templates, namely `Branded` and `Transaction` in folder `src/emails/templates`. The template itself is basically a functional React component which uses some pre defined helper components to make the email creation a lot more simple.

To create a new template, basically copy paste one existing template and modify it to your own needs. The stylings for all the emails templates are located under the folder `src/emails/styles/scss`. During the compilation phase, the app will create a css file namned `main.css` which is readonly since the compiled Sass stylings will be placed there. Don't place any custom styling in `main.css` since it will be destroyed each time you make any changes to the Sass files.

After a new template has been made, add it to `src/templates/service.ts` so the API and Previewer will know about its existenz.