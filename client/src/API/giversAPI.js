const getGivers=async ()=>{
    var lst2 = new Array();
    const lst=[
        {id:1, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:2, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:3, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:4, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:5, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:6, name:"rgte",phone:23, email:"sdfgsdfg", area:1},
        {id:7, name:"rgte",phone:23, email:"sdfgsdfg", area:1}

    ]
    await fetch("/users.json").then((response)=>response.json()) .then(response=>{
       lst2.push(response);
    });
    return lst2;
    // return lst;
}
const getDaylyGivers= async ()=>{
    var lst2 = new Array();
    const lst=[
        {_id:1, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:12, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:13, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:14, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:15, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:16, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},

    ]
    const lst3=[
        {_id:1, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:12, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:13, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:14, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:15, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:16, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},

    ]
    await fetch("/usersDayly.json").then((response)=>response.json()) .then(response=>{
        lst2.push(response);
     });
     return lst2;
     
}

const updateGiverWithArea=async(giver)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(giver)
    };
    await fetch("/updateGiverWithArea",options);


}
const updateGiver=async(giver)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(giver)
    };
    await fetch("/updetUser",options);

}
const addGiver= async (giver)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(giver)
    };
    var mes="";
    await fetch("/addNewUser",options).then((response)=>response.json()) .then(response=>{
        if (response.data == "false"){
            mes = response.message;          
        }
    });
    return mes? mes:"work!"

}
const deleteGiver=async(giver)=>{
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(giver)
    };
    await fetch("/deleteUser",options);

}

export const giversAPI={
    getGivers,
    getDaylyGivers,
    updateGiver,
    updateGiverWithArea,
    addGiver,
    deleteGiver
}