export function  formateTimer(timer){
    let minute = Math.floor(timer/60);
    let second = timer%60;
  
    return  (
        (minute <10 ? "0"+minute:minute)+":"+
        (second <10 ? "0"+second:second)
    )
}