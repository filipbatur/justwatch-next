## Getting Started

Execute the following commands:

```bash
npm install
npm run dev
```

or

```bash
docker compose --env-file .env up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Anton and Lato, custom Google Fonts.

<br />

## Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- app               # app router
|
+-- components        # shared components used across the entire application
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

<br />

## Prerequisites

- Minimum Node version required: `20.17.0`
- Docker engine installed on your system
- TMDB API key

Create a `.env` file based on the `.env.example`:

```sh
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```
