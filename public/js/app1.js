const weatherForm=document.querySelector('form')
const search= document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#msg-2')
weatherForm.addEventListener('submit',(e)=>{
    const location=search.value
    e.preventDefault()
    msgOne.textContent='Loading...'
            msgTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            msgOne.textContent='Error: '+data.error
            msgTwo.textContent=''
        }
        else{
            msgOne.textContent='Location: '+data.Location
            msgTwo.textContent='Forecast: '+data.forecast
        }
    })
})
})