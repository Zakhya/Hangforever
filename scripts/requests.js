const getPuzzle = async (wordCount) => {
    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('unable to get puzzle')
    }
}


const getCurrentCountry = async() => {
    const location = await getLocation()
    const country = await getCountry(location.country)
    return country
}


const getCountry = async (countryCode) => {
    const response = await fetch('https://restcountries.com/v2/all')
    if (response.status === 200) {
        const data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    } else {
        throw new Error('unable to fetch country data')
    }
}

const getLocation = async () => {
    const response = await fetch('https://ipinfo.io/json?token=1383a1bb571d18')
        if (response.status === 200) {
             return response.json()
        } else {
            throw new Error('error fetching IP')
        }
    }
