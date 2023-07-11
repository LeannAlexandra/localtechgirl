






//////////////////////////// RGB EFFECT ////////////////////////////
//the only variable that needs to be persistently stored =i
let i=1;
setInterval(() => {
    const offset=27;
    const f=0.05;
    const width= 45;
    const center =210;
    const sway=14;
    let phase=0;
    const nowMS=new Date;

    const swayAmount=Math.sin(nowMS.getDate()%360)*sway;
    let variable= `linear-gradient( ${90+swayAmount}deg`;
    let conic=``;
    let cfirst=``;
    let washout=variable;
    for(let a=0;a<9;a++){
        let abstraction=Math.sin(f*i + ((phase++)*offset));
        let r=Math.floor(abstraction * width + center);
        let rwashout=Math.floor(abstraction * 20 + 235);

        abstraction=Math.sin(f*i + ((phase++)*offset));
        let g=Math.floor(abstraction * width + center);
        let gwashout=Math.floor(abstraction * 20 + 235);

        abstraction=Math.sin(f*i + ((phase++)*offset));
        let b=Math.floor(abstraction * width + center);
        let bwashout=Math.floor(abstraction * 20 + 235);
        
        const temp=`, rgb(${r},${g},${b})`
        variable+=temp;
        washout+=`, rgb(${rwashout},${gwashout},${bwashout})`
        if (a===0){
            conic+=`rgb(${r},${g},${b})`
            cfirst=`, rgb(${r},${g},${b})`
        }else
            conic+=temp;
    }
    variable+=`)`;
    washout+=`)`;
    conic=`conic-gradient(`+conic;
    conic+=cfirst+`)`;
    document.documentElement.style.setProperty('--default-rgb', variable);
    document.documentElement.style.setProperty('--circle-rgb', conic);
    document.documentElement.style.setProperty('--washout-rgb', washout);
     i++;
}, 100);

///////////////  FOOTER YEAR /////////////
setFooterText();
function setFooterText(){
    const dateNow=new Date();
    const year= dateNow.getFullYear();
document.getElementById("footerText").innerHTML=`Copyright ©${year} LocalTechGirl - Your go-to girl for all your tech needs`;

}

