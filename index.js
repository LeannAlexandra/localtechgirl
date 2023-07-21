let paused=false;
const rgbValues =[];
const washoutValues =[];
const rgbRadialValues =[];
let jumpIndex=126;
let calculateRGB=true;
const socialIcons= document.getElementsByTagName("i");
const numberOfVisibleColors=9; //(number of points on the spectrum, 9 with the current math produce a perfect continuation (conic)

runCPUIntesive();//it's been optimized ...


//////////////////////////// RGB EFFECT ////////////////////////////
//the only variable that needs to be persistently stored =i
/// precalculated all the values into an array, to save runtime cpu usage**

let i=1;

function runCPUIntesive(){
    let si = socialIcons.length;
    let skip =Math.floor((numberOfVisibleColors-si)/2);


    setInterval(() => {
        if (paused)
             return;   

        if(calculateRGB && i>jumpIndex)
            calculateRGB=false;

        if(!calculateRGB){ //reversed order because expecting this to happen a lot more*
            if(i>=jumpIndex){ // can actually bypass the test and just leave the mod.
                i=i%jumpIndex;
            } // ensures i is always smaller than jump index.
            document.documentElement.style.setProperty('--default-rgb', rgbValues[i]);
            document.documentElement.style.setProperty('--circle-rgb', rgbRadialValues[i]);
            document.documentElement.style.setProperty('--washout-rgb', washoutValues[i]);
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
            for(let a=0;a<numberOfVisibleColors;a++){
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
                    conic+=`rgb(${r},${g},${b})`;
                    cfirst=`, rgb(${r},${g},${b})`;
                }
                else{
                    conic+=temp;
                    if(a===(Math.floor(numberOfVisibleColors/2))){
                        document.documentElement.style.setProperty('--clr-center', `rgb(${r},${g},${b})`);
                        document.documentElement.style.setProperty('--clr-centerWashout', `rgb(${rwashout},${gwashout},${bwashout})`);
                    }
                }
                if (a-skip>=0 && a-skip<si){//the exact center value
                    i
                }
                
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



//////////////////////////////// ////////// INTRO TEXT AND PICTURE ///////////////

const introBlock=document.getElementById("intro");
const profilePicture=document.getElementById("leanna");
const topText=document.getElementById("topText");
const introLineBreak=document.getElementById("introLinebreak");
const catchphrase=document.getElementById("catchphrase");

let boundBox=introBlock.getBoundingClientRect();
let width= boundBox.width; //working with a radius of 200
let height=boundBox.height;
let radius= (width>height? height:width)/2;//ensure the radius is square ()
let introState=1;// the range between 0 & 1 decides where on the process we are. 
let introTargetState=1;//this value is binary, to denote the direction (are we going to 1 or to 0)
let introInBounds=true;//binary value - the target state only changes once per entry.
let movement=0.005;
let canChangeState=true;
// const midway={}


setInterval(()=>{
    if (introState===introTargetState){
        
        canChangeState=true;
        return;//do nothing
    }
    canChangeState=false
    const direction= introState>introTargetState? -1: 1;
        //lineAR MATH
    introState+=direction*(movement);
    console.log(`step ${direction*(movement)}`);
    introState= introState<0? 0:introState>1? 1: introState;
    console.log(`moving ${direction>0? `to`: `from`} center ${introState}`);
    const transparancy={
        one: 0.8,
        two: 0.2,
        three: 0.6,
        four: 0.6 //+.4
    };
    if(introState<=0.51&&introState>=0.49 ){
        profilePicture.style.zIndex= direction>0?profilePicture.style.zIndex=0  :profilePicture.style.zIndex=2;
        console.log(`SWITCHED`);
        profilePicture.style.scale= `1.5 ${(1-introTargetState)*1.5}`;
    }
    const fiftypercentline= (1-Math.abs( (introState -0.50))*2)**4 ;
    // console.log(`${percentile}% is ${fiftypercentline}% away from center sirce`);
    topText.style.bottom=`${fiftypercentline*120}px`;
    catchphrase.style.top=`${fiftypercentline*110}px`;
    introLineBreak.style.scale=`${1-fiftypercentline}`;
    introBlock.style.background=`radial-gradient(circle at 45% 35%,rgba(255, 255, 255, ${fiftypercentline*transparancy.one}) 3%, transparent 10%),
        radial-gradient(circle at center, transparent 20%, rgba(255, 255, 255, ${fiftypercentline*transparancy.two}) 30.2%,transparent 30.2%),
        radial-gradient(circle at center,rgba(255, 255, 255, ${fiftypercentline*transparancy.three}) 10%, transparent 30%, rgba(255, 255, 255, ${fiftypercentline*transparancy.five + 0.4}) 30%, ${fiftypercentline*transparancy.five + 0.4}) 34%, transparent 45%)`;
    // profilePicture.style.scale=1-introState;


},10)

introBlock.addEventListener("mousemove",(event)=>{
    if(!canChangeState)
        return; // dont do math if busy with animation.
    
    boundBox=introBlock.getBoundingClientRect(); //update (the y poisition changes)
    let centerX=(boundBox.x+width)/2;
    let centerY=(boundBox.y+height)/2;
    let distanceFromCenter = Math.sqrt((centerX-event.clientX)**2 +(centerY-event.clientY)**2); 
    if(distanceFromCenter>radius){
        return; // dont do anything (let the current trajectory play out)
    }
    const percentile=distanceFromCenter/radius;
    if (introInBounds && distanceFromCenter>(radius/2)){
        introInBounds=false;
        introTargetState=1;
     }
    else if (!introInBounds && distanceFromCenter<(radius/2))
    { //toggles when 50% from center. 
        introInBounds=true;
            // set new direction. 
        introTargetState=introTargetState===1? 0:1;
           
    
    }
})