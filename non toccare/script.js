const btnConferma = document.getElementById('btnConferma');
const outputDiv = document.getElementById('output');

let output = "";

fetch("non toccare/testo/corsi.txt")  // Assicurati che il percorso sia corretto
  .then(response => response.text())
  .then(text => {
    

    let filecont = text.split("(-corso-)");

    //leggo modulo per modulo
    for (let corsoCont = 0; corsoCont < filecont.length; corsoCont++){
        
        for (let b = 0; b < filecont[corsoCont].split("\n").length; b++){
            if (filecont[corsoCont].split("\n")[b].includes("(-titolo-)")){
                output += '<div class="container">' +
                    '<h1>' + filecont[corsoCont].split("\n")[b+1].split("(!!!)")[0] + '</h1>' +
                    '<img class="corso" src="non toccare/immagini/corsi/' + filecont[corsoCont].split('\n')[b+1].split("(!!!)")[1].replace(" ", "") + '.png" alt="Logo" ' +
                    'onError="this.onerror=null; this.src=\'non toccare/immagini/corsi/default.png\';">' +
                    '<button class="btn-conferma" id="btnConferma" data-corso="'+ corsoCont +'">Fai il test</button>' +
                '</div>';
            }
        }

        output+='</div>';
    }

    outputDiv.innerHTML = output;
    
    document.querySelectorAll('.btn-conferma').forEach(button => {
        button.addEventListener('click', function() {
          // Memorizza l'indice del corso selezionato in localStorage
          const corsoCont = this.getAttribute('data-corso');
          localStorage.setItem('corsoCont', corsoCont);
          
          // Redirige alla pagina del test
          window.location.href = "non toccare/test.html";  // La pagina del test
        });
    });

  })
  .catch(error => console.error("Errore nella lettura del file:", error));


