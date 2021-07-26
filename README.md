# Ma Bakotarot - Front End

Ma Bakotarot is a project for comparing news headlines from Israel's leading news sites! The scraper is a nodejs lambda container function runnig on a cron schedule 24/7 collecting headlines from news sites using puppeteer. The front-end is hosted on S3 and was built using React, typescript, redux, redux-toolkit and redux-saga.

# Home Page - The Features

Get a full view of Israel's top news sites side to side:

- ✅ Fully customize viewed sites and date!
- ✅ See unique headlines only or every headline (analyzed by image-diff percentage and headline text)!
- ✅ See the most recent unique headlines from each site in the top scrolling component!

  ![Homepage-Demo](./readme-files/homepage-demo.gif)

# Headlines Page - The Features

Filter headlines through searching them by text or choosing a date range and sites:

- ✅ Presenting headlines in an infinite scroll manner.
- ✅ Toggle between unique only/all headlines at any time and everything will update accordingly!

  ![Homepage-Demo](./readme-files/Filter-demo.gif)

# Comparison Page - The Features

Save the headlines that you find and compare them:

- ✅ Add any number of comparisons and name them as you wish!
- ✅ Persistent over reloads!

  ![Homepage-Demo](./readme-files/search-and-comparison-demo.gif)
