const login=async (email,password)=>{
    try{
    const ans ={email,password}
    var flag =false;
    var type;
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(ans)
    };
    await fetch("/login",options).then((response)=>response.json()) .then(response=>{
        if (response.data == "true"){
            flag=true;
            type= {type: response.type}; 
            var fname=response.fname;
            var lname=response.lname;
            const obj={'email':email,'type':response.type,'fname':fname,'lname':lname }
            sessionStorage.setItem('user',JSON.stringify(obj));   
        }      
    });
    if(flag==true)
    {
        return type;
    }
    else{
        return null;
    }

    }catch
    {
        return null;
    }
    //return {type:"manager"}
}
export const loginAPI={
    login
}