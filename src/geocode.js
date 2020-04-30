const request= require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGltbXkyMSIsImEiOiJjazllMGhjdXowNnh6M3BsbWRzNXFna25zIn0.MkZVUnlYc1yt9-RPjFLZmw&limit=1'
    request({url,json:true},(error,response)=>{
        const {body}=response
        if(error)
        {callback('Unable to connect to the internet',undefined)}
        else if(response.body.features.length===0)
        {callback('Unable to find location, Try another location', undefined)}
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode