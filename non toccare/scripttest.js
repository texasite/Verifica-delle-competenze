const btnConferma = document.getElementById('btnConferma');
const outputDiv = document.getElementById('output');
const btnFine = document.getElementById('btnInviotest');

let output = '<div class="container"><div class="attenzione"><h1>ATTENZIONE</h1></div>'+
        '<p>Una sola risposta è giusta in ogni domanda. Alcune risposte errate comportano un voto negativo. Si consiglia quindi di non rispondere se non si è convinti.</p>'+
    '</div>';

fetch("testo/corsi.txt")  // Assicurati che il percorso sia corretto
  .then(response => response.text())
  .then(text => {

    let filecont = text.split("(-corso-)");

    const corsoCont = localStorage.getItem('corsoCont');


        // Verifica se il valore è presente
        if (corsoCont !== null) {
            
            for (let b = 0; b < filecont[corsoCont].split("\n").length; b++){
                
                
                if (filecont[corsoCont].split("\n")[b].includes("(-domanda-singola-)")){
                    output += '<div class="container">' + 
                                    '<h1>'+filecont[corsoCont].split("\n")[b+1]+'</h1>';
                    
                    for (let c = b+2; c < filecont[corsoCont].split("\n").length; c++){
                        if (filecont[corsoCont].split("\n")[c].includes("(-domanda-singola-)") || filecont[corsoCont].split("\n")[c].includes("(-domanda-multipla-)") || filecont[corsoCont].split("\n")[c].includes("(-valutazione-)"))
                            break;

                        if (filecont[corsoCont].split("\n")[c].includes("(-immagini-)")){
                            
                            for(let img = 0; img < filecont[corsoCont].split("\n")[c+1].split(";").length; img++){
                                output+='<img class="domanda" src="immagini/domande/' + filecont[corsoCont].split('\n')[c+1].split(";")[img].replace(" ", "") + '" alt="Logo"> <br>';
                            }
                            c = c + 1;
                            
                        } else {
                            let domanda = "";
                            if(filecont[corsoCont].split("\n")[c].split(" ").length > 1){
                                for (let d = 1; d < filecont[corsoCont].split("\n")[c].split(" ").length; d++){
                                    domanda += (filecont[corsoCont].split("\n")[c].split(" ")[d] + ' ');
                                }
                                output+='<input type="radio" id="'+c+'" name="'+b+'" value="'+c+'"/><label for="'+c+'"><p>'+ domanda +
                                         '</p></label><br>';
                            }
                            
                        }
                        
                    }   

                    output += '</div>';    
                    
                    
                   
                } else if (filecont[corsoCont].split("\n")[b].includes("(-domanda-multipla-)")){
                    if (filecont[corsoCont].split("\n")[b].includes("(-domanda-multipla-)")){
                        output += '<div class="container">' + 
                                        '<h1>'+filecont[corsoCont].split("\n")[b+1]+'</h1>' +
                                        '<form for="'+b+'">';
                    for (let c = b+2; c < filecont[corsoCont].split("\n").length; c++){

                        if (filecont[corsoCont].split("\n")[c].includes("(-domanda-singola-)") || filecont[corsoCont].split("\n")[c].includes("(-domanda-multipla-)"))
                            break;
                    
                        if (filecont[corsoCont].split("\n")[c].includes("(-immagini-)")){
                                                
                            for(let img = 0; img < filecont[corsoCont].split("\n")[c+1].split(";").length; img++){
                                output+='<img class="domanda" src="immagini/domande/' + filecont[corsoCont].split('\n')[c+1].split(";")[img].replace(" ", "") + '.png" alt="Logo"> <br>';
                            }
                            c = c + 1;
                                                        
                        } else {
                            let domanda = "";
                            filecont[corsoCont].split("\n")[c]
                            for (let d = 1; d < filecont[corsoCont].split("\n")[c].split(" ").length; d++){
                                domanda += (filecont[corsoCont].split("\n")[c].split(" ")[d] + ' ');
                            }
                            output+='<br><label>' +
                            '<input type="checkbox" id="'+c+'" name="'+b+'" value="'+c+'"/>'+ domanda +
                            '</label><br>';
                        }
                                                
                    }                           
                        output += '</form></div>';  
                    }
                }
    
                
            }
    
            output+='</div>';
            
        } else {
            
            console.log("Nessun corso selezionato, probabilmente l'utente ha saltato la selezione");
        }

    outputDiv.innerHTML = output;
    
    let visited = false;
    btnFine.addEventListener('click', function() {
        btnFine.innerText = "Torna alla home";
        if (visited){
            window.location.href = "../index.html";
        }
        visited = true;
        output = "";
        let punti = 0;
        for (let b = 0; b < filecont[corsoCont].split("\n").length; b++) {
            if (filecont[corsoCont].split("\n")[b].includes("(-domanda-singola-)")) {
                let selected = document.querySelectorAll(`input[name='${b}']:checked`);
                if (selected.length > 0) {
                    let domanda = "";
                            filecont[corsoCont].split("\n")[selected[0].value]
                            for (let d = 1; d < filecont[corsoCont].split("\n")[selected[0].value].split(" ").length; d++){
                                domanda += (filecont[corsoCont].split("\n")[selected[0].value].split(" ")[d] + ' ');
                            }

                    if (filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[0].includes("t")){
                        output += '<div class="container"> <h1>' + filecont[corsoCont].split("\n")[b+1] + '</h1><br><div class="mag"><p>'+ domanda + '</p><br><p style="color: green;">Corretto! +' + filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1] + ' punti</p></div></div>';
                        punti += parseInt(filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1]);
                    } else {
                        let trovacorretta = document.querySelectorAll(`input[name='${b}']`);
                        let risposta = "";
                        if (trovacorretta.length > 0) {
                            for (let corr = 0; corr < trovacorretta.length; corr++){
                                if (filecont[corsoCont].split("\n")[trovacorretta[corr].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[0].includes("t")){
                                    
                                    for (let d = 1; d < filecont[corsoCont].split("\n")[trovacorretta[corr].value].split(" ").length; d++){
                                        risposta += (filecont[corsoCont].split("\n")[trovacorretta[corr].value].split(" ")[d] + ' ');
                                    }
                                
                                }
                            }
                        }
                        output += '<div class="container"> <h1>' + filecont[corsoCont].split("\n")[b+1] + '</h1><br><div class="min"><p>Hai risposto sbagliato!: </p><br><p>'+ domanda + '</p><br>';
                        if(parseInt(filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1]) > 1){
                            output+=' -' + filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1] + ' punti!'
                        } else if (parseInt(filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1]) == 1){
                            output+=' -' + filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1] + ' punto!'
                        }
                        output+='</div><br><div class="mag"><p>La risposta corretta era:</p><br><p>'+ risposta +'</p></div></div>';
                        punti -= parseInt(filecont[corsoCont].split("\n")[selected[0].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[1]);
                    }
                          
                } else {
                    let trovacorretta = document.querySelectorAll(`input[name='${b}']`);
                        let risposta = "";
                        if (trovacorretta.length > 0) {
                            for (let corr = 0; corr < trovacorretta.length; corr++){
                                if (filecont[corsoCont].split("\n")[trovacorretta[corr].value].replace("(", "").replace(")", "").split(" ")[0].split("-")[0].includes("t")){
                                    
                                    for (let d = 1; d < filecont[corsoCont].split("\n")[trovacorretta[corr].value].split(" ").length; d++){
                                        risposta += (filecont[corsoCont].split("\n")[trovacorretta[corr].value].split(" ")[d] + ' ');
                                    }
                                
                                }
                            }
                        }

                    output += '<div class="container"> <h1>' + filecont[corsoCont].split("\n")[b+1] + '</h1><br><div class="comp"><p> Non hai risposto </p></div><br><div class="mag"><p>La risposta corretta era:</p><br><p>'+risposta+'</p></div></div>';

                }
                
            } else if (filecont[corsoCont].split("\n")[b].includes("(-valutazione-)")){
                output += '<div class="container">';
                for (let c = b+1; c < filecont[corsoCont].split("\n").length; c++){
                    if (filecont[corsoCont].split("\n")[c].includes("(-domanda-singola-)") || filecont[corsoCont].split("\n")[c].includes("(-corso-)") || filecont[corsoCont].split("\n")[c].includes("(-CC-)"))
                        break;

                    if (filecont[corsoCont].split("\n")[c].includes("(-immagini-)")){
                        
                        for(let img = 0; img < filecont[corsoCont].split("\n")[c+1].split(";").length; img++){
                            output+='<img class="domanda" src="immagini/domande/' + filecont[corsoCont].split('\n')[c+1].split(";")[img].replace(" ", "") + '" alt="Logo"> <br>';
                        }
                        c = c + 1;
                        
                    } else {
                  
                        if(filecont[corsoCont].split("\n")[c].split(" ").length > 1){
                            

                            switch (filecont[corsoCont].split("\n")[c].replace("(", "").replace(")", "").split("-")[0]){
                                case 'min':
                                    if(punti <= parseInt(filecont[corsoCont].split("\n")[c].replace("(", "").replace(")", "").split("-")[1])){
                                        output+='<div class="min">';
                                        output+='<h1>';
                                        for (let giudizio = 0; giudizio < filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ").length; giudizio++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ")[giudizio];
                                        }
                                        output+='</h1><p>Punti totalizzati: '+punti+'</p></div><br><p>';
                                        for (let valutazione = 0; valutazione < filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ").length; valutazione++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ")[valutazione] + ' ';
                                        }
                                        output+='</p><br>';
                                    }
                                    break;
                                case 'comp':
                                    if(punti <= parseInt(filecont[corsoCont].split("\n")[c].replace("(", "").replace(")", "").split("-")[2]) && punti >= parseInt(filecont[corsoCont].split("\n")[c].replace("(", "").replace(")", "").split("-")[1])){
                                        output+='<div class="comp">';
                                        output+='<h1>';
                                        for (let giudizio = 0; giudizio < filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ").length; giudizio++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ")[giudizio];
                                        }
                                        output+='</h1><p>Punti totalizzati: '+punti+'</p></div><br><p>';
                                        for (let valutazione = 0; valutazione < filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ").length; valutazione++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ")[valutazione] + ' ';
                                        }
                                        output+='</p><br>';
                                    }
                                    break;
                                case 'mag':
                                    if(punti >= parseInt(filecont[corsoCont].split("\n")[c].replace("(", "").replace(")", "").split("-")[1])){
                                        output+='<div class="mag">';
                                        output+='<h1>';
                                        for (let giudizio = 0; giudizio < filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ").length; giudizio++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[0].split(" ")[giudizio];
                                        }
                                        output+='</h1><p>Punti totalizzati: '+punti+'</p></div><br><p>';
                                        for (let valutazione = 0; valutazione < filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ").length; valutazione++){
                                            output += filecont[corsoCont].split("\n")[c+1].split("(!!)")[1].split(" ")[valutazione] + ' ';
                                        }
                                        output+='</p><br>';
                                    }
                                    break;        

                            }
                            
                        }
                        
                    }
                    
                }
                
            } else if (filecont[corsoCont].split("\n")[b].includes("(-CC-)")){
                output += '<table>'+
                          '<tr><th><h1>Corsi consigliati</h1></th></tr>';
                    
                    for (let c = b+1; c < filecont[corsoCont].split("\n").length; c++){
                        if (filecont[corsoCont].split("\n")[c].includes("(-domanda-singola-)") || filecont[corsoCont].split("\n")[c].includes("(-corso-)") || filecont[corsoCont].split("\n")[c].includes("(-valutazione-)"))
                            break;

                        if (filecont[corsoCont].split("\n")[c].includes("(-immagini-)")){
                            for(let img = 0; img < filecont[corsoCont].split("\n")[c+1].split(";").length; img++){
                                output+='<img class="domanda" src="immagini/domande/' + filecont[corsoCont].split('\n')[c+1].split(";")[img].replace(" ", "") + '" alt="Logo"> <br>';
                            }
                            c = c + 1;
                            
                        } else {
                            if(filecont[corsoCont].split("\n")[c].split(" ").length > 1){
                                output+='<tr><td><a target="_blank" href="'+ filecont[corsoCont].split('\n')[c].split("(!-!)")[1].replace(" ", "") +'">'+ filecont[corsoCont].split('\n')[c].split("(!-!)")[0]+'</a></td></tr>';
                                //manda link
                            }
                            
                        }
                        
                    }   

                    output += '</div>';    

            }
    
            if (filecont[corsoCont].split("\n")[b].includes("(-domanda-multipla-)")) {
                let selectedCheckboxes = document.querySelectorAll(`input[name='${b}']:checked`);
                let selectedValues = [];
                selectedCheckboxes.forEach(checkbox => {
                    selectedValues.push(checkbox.value);
                });
            }


        }

        
    
        outputDiv.innerHTML = output;
    });
    
    

  })
  .catch(error => console.error("Errore nella lettura del file:", error));


