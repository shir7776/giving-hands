const getGivers=()=>{

    const lst=[
        {_id:1, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:12, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:13, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:14, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:15, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},
        {_id:16, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1},

    ]
    //  fetch("/blogs.json")
    //     .then((res) => res.json())
    //     .then((data1) =>{setPosts(data1);
    //                     setFlag(true);}
        
    //     );
    return lst;
}
const getDaylyGivers=()=>{

    const lst=[
        {_id:1, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:12, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:13, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:14, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:15, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},
        {_id:16, name:"rgte",phone_number:23, email:"sdfgsdfg", area:1,address:"vxf",age:"4",salary:"ghcg",type:"dfgsd",status:"dsfgsdfg",workToday:""},

    ]
    //  fetch("/blogs.json")
    //     .then((res) => res.json())
    //     .then((data1) =>{setPosts(data1);
    //                     setFlag(true);}

    //     );
    return lst;
}

const updateGiverWithArea=(giver)=>{

}
const updateGiver=(giver)=>{

}
const addGiver=(giver)=>{

}
const deleteGiver=(giver)=>{

}

export const giversAPI={
    getGivers,
    getDaylyGivers,
    updateGiver,
    updateGiverWithArea,
    addGiver,
    deleteGiver
}