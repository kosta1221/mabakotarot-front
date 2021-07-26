# Ma Bakotarot - Front End
Ma Bakotarot is a project for comparing news headlines from Israel's leading news sites! The scraper is a nodejs lambda container function runnig on a cron schedule 24/7 collecting headlines from news sites using puppeteer. The front-end is hosted on S3 and was built using React, typescript, redux, redux-toolkit and redux-saga.

# The Features - Home Page

Get a full view of Israel's top news sites side to side:

- ✅ Fully customize viewed sites and date!
- ✅ See unique headlines only or every headline (analyzed by image-diff percentage and headline text)!
- ✅ See the most recent unique headlines from each site in the top scrolling component!

  ![Homepage-Demo](./readme-files/homepage-demo.gif)
