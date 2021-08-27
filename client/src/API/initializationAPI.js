import schedule from 'node-schedule'

const everyNewDay= ()=>{
    schedule.scheduleJob('0 0 * * *', async() => { 
        await fetch("/initialization");

     }) 

}


export const initilaz={
    everyNewDay
}