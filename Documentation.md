# This is the Backend code of the Cryptocurrencies Data scrapper chrome extension

## How it works

1. This scrapping tool gathers data from [https://coinmarketcap.com/] once in a day.
2. It takes data of top 100 cryptocurrencies and stores it in a mongodb database.
3. It receives 2 inputs from frontend, first is a list of cryptocurrencies, second is a list of date ranges.
4. Once it receives request from frontend it sends average prices, maximum prices, average market caps and maximum market caps of all cryptocurrencies for all date ranges.
5. Watch this [video](https://www.loom.com/share/5b87f937f1ae4578a364729b4a26edc2?sid=b159135b-8bea-42e6-a56b-909f3f1f7586) for demo and code walkthrough.

## Technologies used

1. Node js
2. MongoDb
3. React js.
4. Puppeteer Node js library for web scrapping.

## Design decisions

1. This web scrapper stores data for each day separately so that we can get a better of how a particular cryptocurrency is performing.
2. I have added multiple date ranges data fetching in one api call so that it becomes easier to compare performance in different time frames.
3. We can fetch data of multiple cryptocurrencies to compare their market caps and prices.