## Frontend-only example app for ActivityPods

A simple app that uses [Refine](https://refine.dev/core/) with the [ActivityPods packages](https://docs.activitypods.org/app-framework/frontend/introduction/) and the [Ant Design](https://ant.design/) design system. It manages `as:Note` resources on a user's Pod, and displays the logged-in user's `as:Profile`.

## No app backend required

Unlike the typical ActivityPods app (see [Create Your First Social App](https://activitypods.org/docs/guides/create-your-first-social-app/)), this example doesn't need a Moleculer app backend. The app and its access needs are declared in [`app-manifest.json`](./app-manifest.json), and [`@activitypods/app-manifest`](https://github.com/activitypods/activitypods/tree/master/app-framework/app-manifest) generates the documents read by the Pod provider:

- `/app.json`: the app description. This URL is also the Solid-OIDC `client_id`.
- `/access-needs/*.json`: the access needs and their groups.

To add an access need, run `npx app-manifest add`.

The Pod provider only notifies the app's backend if the app description declares an inbox. Ours doesn't, so nothing else is needed. The tradeoff: no real-time notifications, no access to other users' shared data (which requires a signing backend), and no server-side bookkeeping — none of which this example needs.

To deploy the app, set `PUBLIC_URL` to its URL when building, and serve the generated JSON files with the header `Access-Control-Allow-Origin: *` (for example with `serve -s dist --cors`).

## Prerequisites

You need a running Pod provider **on ActivityPods v2.1.0 or later** (this is what introduced Data Registrations, which `@activitypods/refine-providers` relies on): either a public one from https://activitypods.org/data/pod-providers, or a local one — see below.

### Running a local Pod provider

This repo includes a `docker-compose.yml`, adapted from the [app-boilerplate](https://github.com/activitypods/app-boilerplate)'s dev setup, to run just the Pod provider infrastructure.

```bash
docker compose up
```

This starts the ActivityPods backend and frontend, the Fuseki triplestore and Redis. Once it's up:

- Create an account at http://localhost:5000 (the Pod provider's own frontend).
- This example's login page already offers `http://localhost:3000` (see `VITE_POD_PROVIDER_URL` in `.env`) as the Pod provider to sign in with, instead of fetching the public providers list — change or remove it to use a different/public Pod provider.

## Quick start

```bash
yarn install
yarn dev
```

Open the app, pick (or type) your Pod provider's URL, log in, and grant this app access to your notes when prompted. You should then be able to create, list, edit and delete posts.
