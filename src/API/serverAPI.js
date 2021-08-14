const getLocations=()=>{

    const lst = [
        {address: "1", lat: 31, lng: 35, id: 1, area: 1, finished: false},
        {address: "2", lat: 32, lng: 35, id: 2, area: 2, finished: false},
        {address: "3", lat: 31, lng: 34, id: 3, area: 3, finished: false},
        {address: "4", lat: 31.5, lng: 34.5, id: 4, area: 3, finished: false}
    ]
    return lst;
}


export const serverAPI={
    getLocations
}