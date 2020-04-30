const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=24182d756380f42c2ed472db08b91d0f&query='+latitude+','+longitude+'&units=m'
    request({url,json: true},(error,response)=>{
        const{body}=response
        if(error){
            callback('Unable to connect to the internet',undefined)
        }else if(response.body.error){
            callback('Unable to find location. Try another ccordinates',undefined)
        }else{
            const data=body.current
            callback(undefined,data.weather_descriptions[0]+'. It is currently '+data.temperature+' degrees out. It feels like '+data.feelslike+' dergrees out. Also the humdity is '+data.humidity+' there.')
        }
    })
}

module.exports=forecast