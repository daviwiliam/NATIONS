const NationsCrawler = require('../../crawler/NationsCrawler')
const Nations = require('../model/Nations')

module.exports = class NationController{

    static async getNationData(req, res) {

        const country = req.params.nome

        try {
            const nations = await Nations.findAll()

            console.log(nations)

            if(nations.length === 0){
                NationsCrawler.getNations()
                res.redirect(`/nations/${country}`)
            }
            const nation = await Nations.findOne({ where: { country: country }, raw: true })

            if(!nation){
                res.send({msg: 'country not found'})
            }

            const nationData = await NationsCrawler.getNationData(nation.url)

            const response = NationsCrawler.nationFormat(nationData.data)

            response.bandeira = nationData.img

            res.send(response)

        } catch (err) {
            console.log('err: ' + err)
        }
    }

}