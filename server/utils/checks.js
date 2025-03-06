export const isValidEmail = (email)=>{
    const first = email.split('@')[0];
    if(first.length >=6){
        return true;
    }
    return false;
}