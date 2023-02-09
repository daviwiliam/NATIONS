const axios = require('axios')
const cheerio = require('cheerio')
const Nations = require('../api/model/Nations')
const route = require('./routes/nationRoute')

module.exports = class NationsCrawler {

    static async getNations() {

        const { data } = await axios.get(route.url)

        const $ = cheerio.load(data)

        $('.tableau_gris_centrer tbody tr td a').each((i, element) => {

            const nations = $(element).prop('href')

            const urlSlice = nations.split('/')[1]

            const continent = nations.split('/')[0]

            let country = urlSlice.split('.')[0]

            if (country.includes('-')) {

                country = country.replace(/-/g, '_')
            }

            const url = `https://www.sport-histoire.fr/pt/Geografia/${continent}/${urlSlice}`

            const nationsData = {
                country: country,
                continent: continent,
                url: url
            }

            try {

                Nations.create(nationsData)
            } catch (err) {
                console.log('err: ' + err)
            }
        })
    }

    static async getNationData(url) {

        const { data } = await axios.get(url)

        const $ = cheerio.load(data)

        const imgsrc = $('.corps div img').prop('src')

        const img = `https://www.sport-histoire.fr/${imgsrc}`
        
        const nation = []

        $('.corps p').each((i, element) => {

            const datas = $(element).last().text()

            if (datas.includes(':')) {

                const info = datas.split(':')

                info[1] = info[1].replace(' ', '')

                nation.push(info)
            }
        })

        const nationData = {
            data: nation,
            img: img
        }

        return nationData

    }

    static nationFormat(nation) {

        const nationData = {}

        for (var i = 0; i < nation.length; i++) {

            if (nation[i][0].includes('Nome')) {
                
                nationData.nome = nation[i][1]
            } else if (nation[i][0].includes('Capital')) {

                nationData.capital = nation[i][1]
            } else if (nation[i][0].includes('Área')) {

                nationData.area = nation[i][1]
            } else if (nation[i][0].includes('População')) {

                nationData.populacao = nation[i][1]
            } else if (nation[i][0].includes('Governo')) {

                nationData.governo = nation[i][1]
            } else if (nation[i][0].includes('Lema')) {

                nationData.lema = nation[i][1]
            } else if (nation[i][0].includes('Hino Nacional')) {

                nationData.hino_nacional = nation[i][1]
            } else if (nation[i][0].includes('Língua oficial')) {

                nationData.lingua_oficial = nation[i][1]
            } else if (nation[i][0].includes('Moeda')) {

                nationData.moeda = nation[i][1]
            } else if (nation[i][0].includes('País vizinho')) {

                nationData.pais_vizinho = nation[i][1]
            } else if (nation[i][0].includes('Países Vizinhos')) {

                nationData.paises_vizinhos = nation[i][1]
            } else if (nation[i][0].includes('Fronteiras marítimas')) {

                nationData.fronteiras_maritimas = nation[i][1]
            }
        }

        return nationData
    }
}

