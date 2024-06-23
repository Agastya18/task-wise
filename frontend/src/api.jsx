import axios from 'axios';
export const fetchTransactions = ()=>{
   const resp=axios.get('/api/transactions/get-all');
    return resp;
   

}
export const  postTransactions = (transactionData)=>{
    const resp = axios.post('/api/transactions/create',transactionData);
    return resp;
}

export const getTransactionByCategory = ()=>{
    const resp = axios.get('/api/transactions/get-chart');
    return resp;
}