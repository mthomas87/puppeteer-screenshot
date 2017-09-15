#!/usr/bin/env node

const puppeteer = require('puppeteer')

const newPage = async (url) => {
    let browser = await puppeteer.launch({
        executablePath: 'google-chrome-unstable',
        args: [
            // can't run chrome as root without this flag
            '--no-sandbox',
            // this is the size screenshot we want
            '--window-size=1920,1280',
            // server won't have gpu, so set it to disabled
            '--disable-gpu'
        ]
    })
    let page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle'})
    return {page, browser}
}

const run = async (seconds) => {
    let {page, browser} = await newPage('https://giphy.com/')
    
    let running = true
    setTimeout(() => running = false, seconds * 1000)
    
    let frameNum = 0
    while(running){
        console.log('frameNum', frameNum)
        await page.screenshot({
            path: './tmp/' + frameNum + '.png',
            clip: {
                x:0, y:0,
                width: 1920, height: 1280
            }
        })
        frameNum ++
    }
    process.exit()
}

run(10)
