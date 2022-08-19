<p align="center">
  <img src="https://raw.githubusercontent.com/Franckapik/Fadmin/main/public/logo.png" />
</p>

# F.admin

## Admin dashboard for Medias (NextJS CMS)

### F.admin is a Bootstrap Admin Template. It provides you with a ready to use code to manage medias.

# Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/Franckapik/Fadmin/main/public/screenshot.png" />
</p>

# Getting started

In order to run F.admin on your local machine all what you need to do is to have the prerequisites stated below installed on your machine and follow the installation steps down below.

## Prerequisites

- Node.js
- NPM
- PostgreSQL
- Clerk auth
- Git

## 1. Installing & Local Development

Start by typing the following commands in your terminal in order to get F.admin full package on your machine and starting a local development server with live reload feature.

```js
 git clone https://github.com/Franckapik/Fadmin.git fadmin
 cd fadmin
 npm install
```

## 2. Install Postgresql database

First install a local psql database on your machine.
By example, using Pgadmin 4, create new database named "myproject"

Next, fill env variable from.env DATABASE_URL= with your new database url.

Then, you can automatically add prototypes tables on your database with prisma push.

```
npx prisma db push
```

## 3. Sign-in a Clerk account to use authentification services

[Sign a free account here](https://clerk.dev/)

## 4. Sign-in a Cloudinary to host images/video for medias

[Sign a free account here](https://cloudinary.com/)

## 5. Set environnement variables

Duplicate the file .env.example to a new file named .env and complete env variables according to your new database, clerk api key and the name/domain of your website.

```
DATABASE_URL=
MAIL_PASSWORD =
CLOUDINARY_USERNAME=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLERK_FRONTEND_API=
DOMAIN =
NEXTAUTH_URL=
```

## 6. Start your new admin dashboard in developpment mode.

```
npm run dev
```

## 7. Build your project after development to use it on your production server

Build command Used to generate the final result of compiling src files into build folder. This can be achieved by running the following command:

```
npm run build
```

# Modify PSQL database

Pull the schema from an existing database, updating the Prisma schema

```
prisma db pull
```

Push the Prisma schema state to the database

```
prisma db push
```

# Dependencies

- React
- Nextjs
- Bootstrap
- Prisma
- Moment
- Fontawesome
- Nodemailer
- Quill
- Cloudinary
- Dnd-kit

# License

F.admin is licensed under The MIT License (MIT). Which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the final products. But you always need to state that Colorlib is the original author of this template.
