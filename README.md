
# 📦 Shipment Service Selector 📦

This project's goal is to implement an app flow that lets users create shipments and pick the best rate from a list of different providers.

## ⚒️ Tools & Libraries 📚

 - React
 - NextJS
 - TypeScript
 - Redux
 - Redux Toolkit (+ RTK Query)
 - Mantine
 - TailwindCSS
 - Jest
 - React Testing Library
 - MSW
 - Prettier
 - ESLint
 - Lint-staged
 - husky
 
 ## ⚙️ Setup

 - Clone the repository `git clone git@github.com:rmzNadir/shipment-service-selector.git`
 - Create a `.env.local` file and add the following variables to it:
    - `NEXT_PUBLIC_API_URL=https://api-demo.skydropx.com/v1/` 
    - `NEXT_PUBLIC_API_KEY` - this must be a valid API for the [Skydropx API](https://docs.skydropx.com/#skydropx-changelog)
 - Run `yarn` in the root directory to install the dependencies
 - And finally, run `yarn dev` to start the project in development mode 🥳
    - Additionally, you can also start the project in production mode by building it with `yarn build` and starting it after with `yarn start`



## 🧪 Running Tests

To run tests, run the following command

```bash
  yarn test
```

Additionally you can also check the global coverage by running the test command with the `--coverage` flag 

```bash
  yarn test --coverage
```

<details>
  <summary>Spoiler</summary>

   It's over ~~9000~~ 80% 😁
</details>

## 🚀 Deployment

There's two deployment environments for this project

#### Production
   
   Which is the main environment, it is based of the master branch and every new commit made to this branch will trigger a new build.

#### Preview(s)

   Everytime a PR is created it will also create a new deployment with the changes for that specific branch, additionally, any new commits will also trigger a new preview build.

## 🔗 Links
- [Demo](https://shipment-service-selector.vercel.app/)

##  ✨ Credits

- [NextJS Boilerplate used for this project](https://github.com/ixartz/Next-js-Boilerplate)
