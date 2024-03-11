const notesContainer = document.querySelector(".notescontainer");
const createbtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes")
}
showNotes()

function updatestorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}


createbtn.addEventListener("click",()=> {

    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable","true");
    img.src = "Photos/delete.png";
    notesContainer.appendChild(inputbox).appendChild(img)
    updatestorage(); 

})

notesContainer.addEventListener("click", (e)=>{
    
    if (e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updatestorage()
    }
    else if (e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updatestorage();  
            }
        })
    }

})

document.addEventListener("keydown",event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

                                                                                             





