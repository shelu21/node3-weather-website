const path=require('path')
const geocode=require('./geocode')
const forecast=require('./forecast')
const express=require('express')
const app=express()
const hbs=require('hbs')
const publicPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title: 'WEATHER APP ',
        name: 'Jasika Sahu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Hello sir/maam, how can we help you out. sorry for the inconvenience caused. ',
        name: 'Jasika'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About us',
        name: 'sahu ji'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Enter a valid location'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        const{latitude, longitude, Location}=data
    forecast(latitude, longitude, (error, dataForcast) => {
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({ 
                    forecast: dataForcast,
                    Location: Location,
                    address: req.query.address
                     })
      })
    })
})




// app.get('/weather',(req,res)=>{
//     geocode(req.query.address,(error,data)=>{
//         if(error){
//             return res.send({
//                 error: error
//             })
//         }else{
//             forecast(data.latitude,data.longitude,(error2,dataForecast)=>{
//                 if(error2){
//                     return res.send({
//                         error: error
//                     })
//                 }
//             })
//         res.send({ 
//         forecast: dataForecast,
//         Location: data.Location,
//         address: req.query.address
//          })
//         }
// })})
app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('errorpage',{
        title: '404 error',
        message: 'Help article not found',
        name: 'Jsaika sahu'
    })
})

app.get('*',(req,res)=>{
    res.render('errorpage',{
        title: '404 error',
        message: 'Page not found',
        name: 'Jsaika sahu'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})