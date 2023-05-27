import { useEffect, useState } from "react";

const useFetch = (url, requestOptions) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, { ...requestOptions, signal: abortCont.signal })
        .then(res => {
            if(!res.ok){
                throw new Error('Failed to fetch')
            }
            return res.json()
        })
        .then(data => {
            setData(data)
        })
        .catch(e => {
            console.log(e);
        })
        return () => abortCont.abort()
    })

    return data
}

export default useFetch