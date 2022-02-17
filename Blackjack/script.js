let cards = [], cardVal = [0,0];
            
const cardsJSON = fetch("https://kingjango13.github.io/CardsJS/Cards.json").then(x => x.json());

const refreshCards = async() => cards = [...(await cardsJSON)];
refreshCards();

const randomCard = () => cards.splice(Math.floor(Math.random() * cards.length),1)[0]

const dealer = {
    total(){
        var h = dealer.hidden, s = dealer.shown
        return [h[0] + s[0],h[1] + s[1]]
    },
    draw(){
        if(dealer.max() < 17){
            var card = randomCard().values;
            dealer.shown[0] += card[0];
            dealer.shown[1] += card[1] || card[0];
            dealer.draw()
        }
        dealer.updateDisplay()
    },
    max: () => dealer.total().concat([0]).filter(x => x < 22).reduce((x,y) => Math.max(x,y)) || 0,
    updateDisplay: () => document.getElementById("dealerShown").textContent = dealer.shown,
    busted: () => Math.min(...dealer.total()) > 21,
    __init__(){
        var h = randomCard().values, s = randomCard().values
        dealer.hidden = [h[0],h.length > 1 ? h[1] : h[0]]
        dealer.shown = [s[0],s.length > 1 ? s[1] : s[0]]
        dealer.updateDisplay()
    }
}

function drawCard(){
    var val = randomCard().values;
    cardVal[0] += val[0];
    cardVal[1] += val.length > 1 ? val[1] : val[0];
    document.getElementById("cardVal").textContent = cardVal;
}

function load(){
    document.getElementById("hit").addEventListener("click",e => {
        drawCard()
        if(Math.min(...cardVal) > 21){
            alert("Sorry, you lose");
            location.reload()
        }
    })
    document.getElementById("stay").addEventListener("click",e => {
        dealer.draw()
        if(dealer.max() >= playerMax()){
            alert("Sorry, you lose");
            location.reload()
        } else {
            alert("You win!")
        }
    })
    setTimeout(dealer.__init__,10)
    drawCard()
    drawCard()
}

const playerMax = () => cardVal.concat([0]).filter(x => x < 22).reduce((x,y) => Math.max(x,y))