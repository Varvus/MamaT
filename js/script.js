document.addEventListener("DOMContentLoaded", function () { 

    const letters = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    const symbols = ["spade", "heart", "club", "diamond"];
    const values  = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let deck = [];
    const sectionStart = document.querySelector("#start");
    const sectionPlayGround = document.querySelector("#playGround");
    const btnStart = document.querySelector("#btnStart");
    const btnUp = document.querySelector("#up");
    const btnDown = document.querySelector("#down");
    let actualLetter;
    let actualValue;
    const divAccumulatedCards = document.querySelector("#accumulatedCards");
    const divDrinkMessages = document.querySelector("#drinkMessages");
    let checked;
    let firstPlayer;

    //Contadores
    let accumulatedCards = 0;
    let firstPlayerCount = 0;

    //Initial
    sectionPlayGround.style.display = "none"; 

    //Event Listeners
    btnStart.addEventListener("click", start); 
    btnUp.addEventListener("click", function (){ up(actualValue) });
    btnDown.addEventListener("click", function (){ down(actualValue) });

    //Create Deck
    function createDeck(){
        symbols.forEach( symbol => {
            letters.forEach( (letter, i) => {
                deck = [...deck, [letter, (i+1), symbol]];
            }); 
        }); 
        sectionPlayGround.style.display = "none";
    }

    //Start (BeginButton)
    function start(){
        createDeck();
        sectionStart.style.display = "none";
        sectionPlayGround.style.display = "block";
        btnUp.style.display = "block";
        btnDown.style.display = "block";
        flipCard(); 
        firstPlayer      = true;
    }

    //Up
    function up(valor){
        flipCard();
        checked = checkCard("up", valor);
        message(" ");
        drinkMessage();
    }
    //Down
    function down(valor){
        flipCard();
        checked = checkCard("down", valor);
        message(" ");
        drinkMessage();
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

        firstPlayerCount += 1;
                    
        //Random
        rnd = Math.ceil(Math.random() * (max - min) + min) - 1;

        //Actual Letter
        actualLetter = deck[rnd][0];

        //Actual Value
        actualValue = deck[rnd][1];

        //Actual Symbol
        switch (deck[rnd][2]){
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
        if (actualSymbol == "spade" || actualSymbol == "club"){
            actualColor = "#111";
        } else if (actualSymbol == "heart" || actualSymbol == "diamond"){
            actualColor = "Red";
        } 

        //Llena div de carta Actual
        actualCard.innerHTML = actualLetter + "&nbsp;" + actualSymbol;
        actualCard.style.color = actualColor;
        
        //Grab Card
        deck.splice(rnd, 1);

        //Verify if deck is empty
        isDeckEmpty();

        return actualLetter;
    }

    function checkCard(choose, lastValue){
        if (choose === "up"){
            if (actualValue > lastValue){
                return true
            } else if (actualValue < lastValue){
                return false
            } 
            return false
        } 
        if(choose === "down") {
            if (actualValue < lastValue){
                return true
            } else if (actualValue > lastValue){
                return false
            } 
            return false
        }
    }

    function isDeckEmpty(){
        if (deck.length === 1) {
            sectionStart.style.display = "block";
            btnStart.innerHTML = "Shuffle";
            btnUp.style.display = "none";
            btnDown.style.display = "none";
        }
    }

    function drinkMessage(){
        if (!checked) {
            message(`Bebes ${accumulatedCards} tragos`);
            
            accumulatedCards = 0;
            firstPlayerCount = 0;
            firstPlayer = true;
        }

        if (firstPlayer){
            if(firstPlayerCount == 3){
                message("Ya puedes cambiar de Jugador!") ;
                firstPlayerCount = 0;
                firstPlayer = false;
            }
        } else {
            if(firstPlayerCount == 1){
                message("Puedes Cambiar de Jugador!");
                firstPlayerCount = 0;
                firstPlayer = false;
            }
        }
    }

    function message(msg){
        divDrinkMessages.innerHTML = " ";
        divDrinkMessages.classList.addClass = "blink" ;
        setTimeout( () => {
            divDrinkMessages.innerHTML = '' + msg + '';
            divDrinkMessages.classList.removeClass = "blink" ;
        }, 200);
        
    }

});


