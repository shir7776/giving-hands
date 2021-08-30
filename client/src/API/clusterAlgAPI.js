const clusterAlg=async(dataForAlgo)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForAlgo)
    };
var mes="";
    await fetch("/clusterAlg",options).then((res) => res.json())
        .then((data1) => {
            mes=data1;
            }
        );
        return mes;
}

export const clusterAlgAPI={
    clusterAlg
}