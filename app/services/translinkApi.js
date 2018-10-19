const ApiKey = '6ZhnmUQ1wNsIQjCVa8rI';
const ApiGetOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }};

 const getButStopRTS = (stopNumber)=>{
        const url = `https://api.translink.ca/rttiapi/v1/stops/${stopNumber}/estimates?apikey=${ApiKey}&count=3&timeframe=120`;

        return  fetch(url,ApiGetOptions).then(response=>response.json())
    }


const translinkApi =  {
        getButStopRTS: getButStopRTS
    };


export default translinkApi;