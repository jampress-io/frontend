# JamPress Frontend

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## What is included?

### Pages and Posts from your WordPress CMS
Add your CMS url as an environment variable in a `.env` file as `BASE_URL` and your content will be pulled from there during build. For example `BASE_URL=https://cms.jampress.io`.

### Components for the ACF Flexible Content panels in the CMS Repository
VueJS components built to accommodate the structure in the Advanced Custom Fields Flexible Content layout and panels in the [CMS](https://github.com/jampress-io/cms) repository.

### Tailwind support
Tailwind support allowing you to input tailwind classes in WordPress that will be automatically applied to your components.


For detailed explanation on how things work in NuxtJS, check out [Nuxt.js docs](https://nuxtjs.org).
