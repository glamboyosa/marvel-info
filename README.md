# Info Coding Challenge

## Requirements

A [Marvel Developer Account](https://developer.marvel.com/docs)

## Getting Started

On the [my developer account page](https://developer.marvel.com/account#), click "add a new referrer" and in the input field enter `*`. This will allow API requests to be made from any URL. Ensure to click "update" for your changes to reflect.

Next, copy the value of your public key and replace it with the `NEXT_PUBLIC_MARVEL_API_KEY` value in the `.env.local` file.

## Run the app

To run the app, first install dependencies via:

```bash
npm install
#or
yarn
```

Then run:

```bash
npm run dev
#or
yarn dev
```

This will start a server on `http://localhost:3000`

## Optional - Code Formatting

To format your code with prettier run:

```bash
npm run prettier
#or
yarn prettier
```
