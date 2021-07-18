import axios from 'axios';
// import {APIRootPath} from '@fed-exam/config';

// export type Ticket = {
//     id: string,
//     title: string;
//     content: string;
//     creationTime: number;
//     userEmail: string;
//     labels?: string[];
// }

export const ApiClient = {
    // getTickets: (search:string,dateBefore:string,dateAfter:string,fromMail:string,page:string) => Promise<Ticket[]>;
    // sendEmail: (message:string,email:string) => void;
    // updateTicket:(id:string,title:string)=> void;
    // addNewTicket:(id:string,title:string,content:string,userEmail:string,creationTime:number,labels:string)=> void;
}

 const  createApiClient = () => {
    return {

    //     getTickets: (search: string, dateBefore: string, dateAfter: string, fromMail: string, page: string) => {
    //         return axios.get(APIRootPath.concat("/query?search=", search, "&beforDate=", dateBefore, "&afterDate=", dateAfter, "&mail=", fromMail, "&page=", page)).then((res) => res.data);
    //     },
    //     sendEmail: (message: string, email: string) => {
    //         axios.get(APIRootPath.concat("/sendMail?message=", message, "&email=", email))
    //     },
    //     addNewTicket: (id: string, title: string, content: string, userEmail: string, creationTime: number, labels: string) => {
    //         const ticket= {
    //             id:id,
    //             title:title,
    //             content:content,
    //             userEmail:userEmail,
    //             creationTime:creationTime,
    //             labels:labels
    //         };
    //         var body= JSON.stringify(ticket)
    //         // const options = {
    //         //     	headers: {
    //         //     		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         //     	}}
    //             return axios.post(APIRootPath.concat("/addNewTicket"),ticket);
    //         },
    //     updateTicket: (id: string, title: string) => {
    //         const ticket= {
    //             id:id,
    //             title:title
    //         };
    //         var body= JSON.stringify(ticket)
    //             return axios.post(APIRootPath.concat("/updateTicket"),ticket);
    //         }
    ApiClient
        }

    }
export default createApiClient() 
