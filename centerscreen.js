///gather array of all divs with .wrap class
const previewableProjects = document.getElementsByClassName("wrap");

//iterate through all add a event listener for mouse enter ()

for(let wrap of previewableProjects){
    wrap.addEventListener("mouseover",()=>{
        return;
        console.log("this is div");


    });
}