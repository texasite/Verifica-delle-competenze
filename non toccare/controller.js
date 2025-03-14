const dominio = window.location.hostname;
const domini = ["italia.texa.org"];

let found = false;
for(let i = 0; i < domini.length; i++){
    if(domini[i]==dominio)
        found=true;
}

if(found){
    window.location.href = "home.html";
} else {
    window.location.href = "nonconsentito.html";
}
