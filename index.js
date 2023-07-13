let paused=false;
const rgbValues =[];
const washoutValues =[];
const rgbRadialValues =[];
let jumpIndex=130;
const rMovement=[];
const rwhoustmovm=[];

runCPUIntesive();//it's been optimized ...


//////////////////////////// RGB EFFECT ////////////////////////////
//the only variable that needs to be persistently stored =i
/// precalculated all the values into an array, to save runtime cpu usage**

let i=1;

function runCPUIntesive(){
    setInterval(() => {
        if (paused){
             return;   
        }
        if(i>126){
            let k=i%126;
            document.documentElement.style.setProperty('--default-rgb', rgbValues[k]);
            document.documentElement.style.setProperty('--circle-rgb', rgbRadialValues[k]);
            document.documentElement.style.setProperty('--washout-rgb', washoutValues[k]);
        }
        else{
            const offset=27;
            const f=0.05;
            const width= 45;
            const center =210;
            const sway=14;
            let phase=0;
            const nowMS=new Date;

            const swayAmount=Math.sin(nowMS.getDate()%360)*sway; //0= perfectly verticle. - the slight angle does magic.
            let variable= `linear-gradient( ${Math.floor(90+swayAmount)}deg`;
            let conic=``;
            let cfirst=``;
            let washout=variable; //exactly square? -> `linear-gradient( ${90}deg` (as above, the angle does wonders. ) 
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
                    rMovement.push(r);
                    rwhoustmovm.push(rwashout);
                }
                else
                    conic+=temp;
            }
            washout+=`)`;
            variable+=`)`;
            conic+=cfirst+`)`;
            conic=`conic-gradient(`+conic;
            washoutValues.push(washout);
            rgbValues.push(variable);     
            rgbRadialValues.push(conic);
            document.documentElement.style.setProperty('--default-rgb', variable);
            document.documentElement.style.setProperty('--circle-rgb', conic);
            document.documentElement.style.setProperty('--washout-rgb', washout);
        }
        i++;
    }, 100);
}
///////////////  FOOTER YEAR /////////////
setFooterText();
function setFooterText(){
    const dateNow=new Date();
    const year= dateNow.getFullYear();
document.getElementById("footerText").innerHTML=`Copyright ©${year} LocalTechGirl - Your go-to girl for all your tech needs`;

}

