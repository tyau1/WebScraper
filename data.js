const puppeteer = require('puppeteer')


void (async () => {
  try {
    // create a new browser instance
    const browser = await puppeteer.launch()

    // create a page inside the browser
    const page = await browser.newPage()

    // navigate to a website
    await page.goto('https://scrapethissite.com/pages/forms/')
    // grab team data
    const teams = await page.evaluate(() => {
      // a helper function for some slight code reuse
      // grab the TD, the text and remove trailing whitespace
      const grabFromRow = (row, classname) => row
        .querySelector(`td.${classname}`)
        .innerText
        .trim()

    // our selectors
    const TEAM_ROW_SELECTOR = 'tr.team'

    // we';; store our data in an array of objects
    const data = []

    // get all team rows
    const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)

    // loop over each team row, creating objects
    for (const tr of teamRows) {
      data.push({
        name: grabFromRow(tr, 'name'),
        year: grabFromRow(tr, 'year'),
        wins: grabFromRow(tr, 'wins'),
        losses: grabFromRow(tr, 'losses')
      })
    }

    // send the data back into the teams variable
    return data
    })

    // log the data for testing purposes
    console.log(JSON.stringify(teams, null, 2))

    await browser.close()
  } catch (error) {
    // if something goes wrong
    // display the error message in console
    console.log(error)
  }

})()