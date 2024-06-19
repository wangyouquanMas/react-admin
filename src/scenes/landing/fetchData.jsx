export const fetchSearchResults = async (query) => {
    const url = new URL("http://127.0.0.1:8080/generate")
    url.searchParams.append('originalQuery', query)
    const response = await fetch(url)
    const data = await response.json()
    console.log("data:", data)
    return data.map((content) => ({
        uid: content.source.uid,
        title: content.source.title,
        frequency: content.source.frequency
    }))
}


export const fetchSemanticSearch = async (query) => {
    const url = new URL("http://127.0.0.1:8080/search")
    url.searchParams.append('query', query)
    const response = await fetch(url)
    const data = await response.json()
    console.log("data:", data)
    return data.map((content) => ({
        uid: content.source.uid,
        title: content.source.title,
        frequency: content.source.frequency
    }))
}


export const fetchProducts = async (query) => {
    const url = new URL("http://127.0.0.1:8080/products")
    url.searchParams.append('query', query)
    const response = await fetch(url)
    const data = await response.json()
    return data.map((content) => ({
        name: content.source.name,
        description: content.source.description
    }))
}


export const fetchPsychologyData = async (query) => {
    const url = new URL("http://127.0.0.1:8080/psychology")
    url.searchParams.append('query', query)
    const response = await fetch(url)
    const data = await response.json()
    return data.map((content) => ({
        name: content.source.name,
        description: content.source.description,
        id: content.source.id,
        psychology_id: content.source.psychology_id,
        frequency: content.source.frequency
    }))
}


export const analyzePainPoints = async (query) => {
    const response = await fetch('http://172.235.13.33:5001/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: query })
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const result = await response.json()
    return result.text
}