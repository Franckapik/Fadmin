[logo]: logo.png "Logo Title Text 2"

F.admin - Admin dashboard for Medias (NextJS CMS)

F.admin is a Bootstrap Admin Template. It provides you with a ready to use code to manage medias.

Preview

Screenshot

image

Getting started

In order to run F;admin on your local machine all what you need to do is to have the prerequisites stated below installed on your machine and follow the installation steps down below.

Prerequisites
Node.js
NPM
PostgreSQL
Clerk auth
Git

Installing & Local Development
Start by typing the following commands in your terminal in order to get Adminator full package on your machine and starting a local development server with live reload feature.

> git clone https://github.com/Franckapik/Fadmin.git fadmin
> cd fadmin
> npm install

Environnement variable
1- Install Postgresql database
_ npm install psql
_ npx prisma db push => adding schema to database according to schema.prisma

2- Sign-in a Cleck free account

You have to duplicate the file .env.example to a new file named .env and complete env variables.

> npm run dev

Files/Folders Structure
Here is a brief explanation of the template folder structure and some of its main files usage:

Deployment
In deployment process, you have two commands:

Build command Used to generate the final result of compiling src files into build folder. This can be achieved by running the following command:

> npm run build

Built With
Babel
Webpack
Eslint
Bootstrap
Moment
Fontawesome

License
Adminator is licensed under The MIT License (MIT). Which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the final products. But you always need to state that Colorlib is the original author of this template.

Setup a new Prisma project
$ prisma init

Generate artifacts (e.g. Prisma Client)
$ prisma generate

Browse your data
$ prisma studio

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ prisma migrate dev

Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

Push the Prisma schema state to the database
$ prisma db push

After modifying tables in pgadmin, i should :

- prisma db pull
- prisma generate
