export const fetchDaily = async (city) => {
  try{
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d6c2f9bbc1b6409ea6872659210911&q=${city}&aqi=no`)
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.error.message)
    }
    return data
  } catch (err) {
    throw new Error(err.message)
  }
 }

export const fetchWeekly = async (city) => {
  try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d6c2f9bbc1b6409ea6872659210911&q=${city}&days=8&aqi=no&alerts=no`)
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.error.message)
    }
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const fetchSearch = async (query) => {
  return await fetch(`http://api.weatherapi.com/v1/search.json?key=d6c2f9bbc1b6409ea6872659210911&q=${query}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.error)
    })
}


