import axios from "axios"
import * as cheerio from 'cheerio';
import express from "express"
import fs from "fs";

const PORT = process.env.PORT || 5000
const app = express()

const URL = 'https://www.fish4.co.uk/jobs/manchester/?utm_source=tm-men&utm_medium=referral&utm_campaign=navlink&_ga=2.104254281.850044259.1715040367-1934241414.1715040366'
const mainUrl = 'https://www.fish4.co.uk'
axios(URL)
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('li.lister__item--display-logo-in-listing', htmlData).each((index, element) => {
            const title = $(element).find('h3').text()
            // const titleURL = $(element).find('a').attr('href').trim()
            const titleURL = mainUrl + $(element).find('a').attr('href').trim()
            articles.push({
                title,
                titleURL
            })
        })
        fs.writeFileSync('./txt-output.txt', JSON.stringify(articles))
        console.log("File written");


    }).catch(err => console.error(err))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
