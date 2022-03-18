document.addEventListener("DOMContentLoaded", function () { 

    const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    const symbols = ["spade", "heart", "club", "diamond"];
    let deck = [];
    const sectionStart = document.querySelector("#start");
    const sectionPlayGround = document.querySelector("#playGround");
    const btnStart = document.querySelector("#btnStart");
    const btnUp = document.querySelector("#up");
    const btnDown = document.querySelector("#down");
    let actualValue;
    const divAccumulatedCards = document.querySelector("#accumulatedCards");
    //Contadores
    let accumulatedCards = 0;

    sectionPlayGround.style.display = "none"; 

    //Event Listeners
    btnStart.addEventListener("click", start); 
    btnUp.addEventListener("click", function (){ up(actualValue) });
    btnDown.addEventListener("click", function (){ down(actualValue) });

    //Create Deck
    function createDeck(){
        symbols.forEach( symbol => {
            values.forEach( value => {
                deck = [...deck, [value, symbol]];
            }); 
        }); 
        sectionPlayGround.style.display = "none";
        console.log("Deck Shuffled");
    }

    //Start
    function start(){
        createDeck();
        sectionStart.style.display = "none";
        sectionPlayGround.style.display = "block";
        btnUp.style.display = "block";
        btnDown.style.display = "block";
        flipCard(); 
    }

    //Up
    function up(valor){
        flipCard();
    }
    //Down
    function down(valor){
        flipCard();
    }

    //Flip Card
    function flipCard(){ 
        let min = 0;
        let max = deck.length;
        let rnd;
        let actualCard = document.querySelector("#actualCard");
        
        let actualSymbol;
        let actualColor;

        //Accumulated Cards Counter
        accumulatedCards += 1;
        divAccumulatedCards.innerHTML = accumulatedCards;
                    
        //Random
        rnd = Math.ceil(Math.random() * (max - min) + min) - 1;

        //Actual Value
        actualValue = deck[rnd][0];

        //Actual Symbol
        switch (deck[rnd][1]){
            case "spade":
                actualSymbol = '♤';
                break; 
            case "heart":
                actualSymbol = '♡';
                break;
            case "club":
                actualSymbol = '♧';
                break;
            case "diamond":
                actualSymbol = '♢';
                break;
            default:
                break;
        }

        //Actual Color
        if (actualSymbol === "spade" || actualSymbol === "club"){
            actualColor = "#111";
        } else {
            actualColor = "Red";
        }

        //Llena div
        actualCard.innerHTML = actualValue + "&nbsp;" + actualSymbol;
        actualCard.style.color = actualColor;

        console.log(deck.length);
        
        //Grab Card
        deck.splice(rnd, 1);

        //Verify if deck is empty
        isDeckEmpty();

        return actualValue;
    }

    function isDeckEmpty(){
        if (deck.length === 1) {
            sectionStart.style.display = "block";
            btnStart.innerHTML = "Shuffle";
            btnUp.style.display = "none";
            btnDown.style.display = "none";
            console.log("Deck Ended");
        }
    }

});


