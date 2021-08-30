


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
    updateLocation,
    deleteDailyDeliv,
    addLocation,
    deleteLocation
}