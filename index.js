const puppeteer = require('puppeteer')

// this wrapper means immediately execute this code
void (async () => {

  try {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
  }
})