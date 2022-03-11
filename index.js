const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const appIns=require('applicationinsights')
appIns
.setup()
.setSendLiveMetrics(true)
.start()

const app = express()
app.use(bodyParser.json())

app.get('/api/hello', async (req, res) => {

    res.send('Hello World')
})

app.get('/api/merhaba', (req, res) => {

    res.send('Merhaba Dünya')
})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName','lastName'])
    console.log(body)
    res.send('Hello '+body.firstName+' '+body.lastName)
})

app.get('/api/event', async (req, res) => {
const telemetry=appIns.defaultClient

telemetry.trackEvent({name:"some event",properties:{
    orders:10,
    users:200
}})

telemetry.trackEvent({name:"some metric",value:90})

res.send('some event happened')
})

app.get('/api/fail', async (req, res) => {



    const telemetry = appIns.defaultClient
    
    
    
    telemetry.trackException({
    
    exception: new Error('Önemli bir hata oluştu !!')
    
    })
    
    
    
    res.send('some failure happened')
    
    })

app.listen(8080, () => {
    console.log('app server is running')
})