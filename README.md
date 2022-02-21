<br>

<h1 align="center">
  <img style="width:20%" src="https://user-images.githubusercontent.com/11615615/148018980-32ba3be8-02ba-4641-beaa-02f8c83e7a0f.png" alt="Expo Ticket App preview" width="500" />
 </h1>

<h3 align="center" style="margin-bottom:15px">Unofficial chrome extension to track your Betaseries shows.</h3>

<div align="center">

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_betashowtracker&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_Acti)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_betashowtracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_Acti)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_betashowtracker&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_Acti)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_betashowtracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_Acti)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

</div>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#development">Development</a> •
  <a href="#tiers">Tiers</a> •
  <a href="#contributors">Contributors</a>
</p>

---

## About

Watching TV Shows on Betaseries is a great way to stay up to date with what's going on. However, it's not always easy to keep track of your shows. This extension is designed to help you keep track of your shows directly from your browser.

## Features

-   add shows to your watchlist (support bulk addings)
-   mark shows as watched
-   keep track of your shows

![image](https://user-images.githubusercontent.com/11615615/148100563-6647bd24-c171-4faf-ab64-330ef6f59cef.png)

## Development

Download the projet, then run the following commands:

```shell
yarn install
```

Dont forget to add your [Betaseries api key](https://www.betaseries.com/en/api/) into the `.env` file on `VITE_API_KEY` then type:

```shell
yarn dev
```

Then fo to [localhost:3000](http://localhost:3000). to see the extension in action, show inspect panel and resize window to 780px which is what the user will see. Add your features then run vite by typing:

```
make build
```

And put it in your browser following these [instructions](https://developer.chrome.com/docs/extensions/mv3/getstarted/).

## Tiers

-   **UX Components**: <a href="https://illright.github.io/attractions/">Attractions</a>
-   **Language**: JS/Typescript/Svelte
-   **Framework**: None
-   **Date calculation**: <a href="https://day.js.org/">Dayjs</a>
-   **Code bundler**: <a href="https://vitejs.dev/">Vite</a>
-   **Progress Bar**: <a href="https://www.npmjs.com/package/@okrad/svelte-progressbar">Svelte Progress Bar</a>
-   **Toasts**: <a href="https://www.npmjs.com/package/@zerodevx/svelte-toast">Svelte Toasts</a>
-   **Icons**: <a href="https://www.npmjs.com/package/svelte-feather-icons">Svelte Feather Icons</a>

---

## Contributors

<a href="https://github.com/AlexisAnzieu"><img src="https://avatars.githubusercontent.com/u/11615615"  height="auto" width="100" style="border-radius:50%" title="Alexis Anzieu"/></a>
<a href="https://github.com/mathieuthomas"><img src="https://avatars.githubusercontent.com/u/35575847"  height="auto" width="100" style="border-radius:50%" title="Mathieu THOMAS"/></a>
<a href="https://github.com/betaseries"><img src="https://avatars.githubusercontent.com/u/16645960"  height="auto" width="100" style="border-radius:50%"  title="Team Betaseries"/></a>
