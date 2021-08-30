const clusterAlg=async(dataForAlgo)=>{
    console.log(dataForAlgo)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForAlgo)
    };

    await fetch("/clusterAlg",options).then((res) => res.json())
        .then((data1) => {
                console.log('data:',data1);
            }
        );
}

export const clusterAlgAPI={
    clusterAlg
}