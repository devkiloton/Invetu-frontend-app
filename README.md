![Logo invetu](https://github.com/devkiloton/react-vite-app/assets/78966160/069f8845-5c91-4c46-819e-d4a8c1b6f77b)

<p align="center"> 
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/daisyUI-1ad1a5?style=for-the-badge&logo=daisyui&logoColor=white" />
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>
<p align="center">
  <img src="https://spotify-github-profile.vercel.app/api/view?uid=22yoc4ioabem6hfrtwxudllsy&cover_image=true&theme=novatorem&show_offline=true&background_color=121212&interchange=true&bar_color=53b14f&bar_color_cover=false"/>
</p>

## Overview

![Overview](https://github.com/devkiloton/react-vite-app/assets/78966160/8089f440-0a5b-48c2-8710-712c76087b52)

Invetu is an application targetted to brazilian's investors interested to track their investments **FOR FREE**. With Invetu, investors can input a portfolio and get important data to take the best decisions, such as the investment(cryptos, stocks(BR and USA) and fixed incomes(BR)) profitability, dividends received and the ones that will be received, portfolio profitability since the portfolio creation, portfolio rentability in the month compared with IBOV(brazilian S&P500) and CDI(kind of brazilian prime tax).

Users can also export investment charts to .CSV to make analysis on Excel or Google Sheets.

## Important versions

<details><summary>0.0.1-alpha</summary>
  <li>After 3 weekends(and a few days in the week) of development, took the decision to create a landing page and make Invetu available for free.</li>
  <li>Some components are presenting bugs, the application make too many request and the functionalities are very limited. I am aware of these issues and I'll improve the application in the next versions</li>
  <li>The baby is born! 🔥</li>
</details>
<details><summary>0.1.0-alpha</summary>
<li>Now brazilian fixed incomes, USA stocks, and cryptocurrencies can be added</li>
<li>Stocks can display how much dividends were earned with the investment</li>
<li>I have added several login methods to make the app accessible for anyone</li>
<li>To cut off future expenses and scalability issues I have introduced serverless provided by GCP cloud functions</li>
<li>To avoid SEVERAL https requests on app initialization, I have created Redux reducers to handle the data and reuse it to avoid unnecessary data fetching and improve the UX. In this way the CRUD ops can be done locally without waiting for Promises, and the data used to display the investment charts doesn't need to be re-fetched.</li>
<li>Now there's google's one tap login</li>
<li>Implementing a lot of analytics tracking</li>
<li>Redesigning the log out button and removing the form to add investments from dashboard to a dialog that is triggered when you click the button "Adicionar investimento" or "+" on mobile</li>
