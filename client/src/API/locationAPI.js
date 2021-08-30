const getLocations= ()=>{
    const lst = [
        {address: "1", lat: 31, lng: 35, id: 1, area: 1, finished: false},
        {address: "2", lat: 32, lng: 35, id: 2, area: 2, finished: false},
        {address: "3", lat: 31, lng: 34, id: 3, area: 3, finished: false},
        {address: "4", lat: 31.5, lng: 34.5, id: 4, area: 3, finished: false}
    ] 
    return lst;
}


const updateLocation=async(location)=>{
    console.log(location)
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    };
    await fetch("/updateAddress",options);


}
const addLocation=async(location)=>{
    console.log(location)
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    };
   var mes="";
    await fetch("/addNewAddress",options).then((response)=>response.json()) .then(response=>{
    if (response.data == "false"){
        mes = response.message;
    }
}   );
   return mes? mes :"";

}
const deleteLocation=async(location)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    };
    await fetch("/deleteAddress",options);


}

const deleteDailyDeliv=async(locations)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(locations)
    };
    await fetch("/deleteDailyDeliv",options);



}
export const locationAPI={
    getLocations,
    updateLocation,
    deleteDailyDeliv,
    addLocation,
    deleteLocation
}