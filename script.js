let cardsContainer;

document.addEventListener("DOMContentLoaded", function() {
    console.log("loaded")
    cardsContainer = document.querySelector(".card-container");

    fetchGetCharacters();
})

function setAttributes(element, attributes) {
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function fetchGetCharacters() {
    fetch("http://localhost:3000/characters")
      .then((response => response.json()))
      .then((characterData) => renderCharacter(characterData));
}

function renderCharacter(characterData) {
    characterData.forEach((character) => {
        createCharacterCard(character);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("div");
    setAttributes(card, {"id": character.id, "class": "card"});
    
    const name = document.createElement("p");
    name.setAttribute("class", "name");
    name.innerText = character.name;

    const image = document.createElement("img");
    setAttributes(image, {"src": character.img_url, "class": "character-img", "alt": `${character.name}-img`});

    const buttonsContainer = document.createElement("div")
    buttonsContainer.setAttribute("class", "reaction");

    const btn1 = document.createElement("span");
    btn1.setAttribute("id", "love")
    btn1.setAttribute("class", "off")
    btn1.innerText = " 🥰 ";
    const btn2 = document.createElement("span");
    btn2.setAttribute("id", "eyeroll")
    btn2.setAttribute("class", "off")
    btn2.innerText = " 🙄 ";
    const btn3 = document.createElement("span");
    btn3.setAttribute("id", "mad")
    btn3.setAttribute("class", "off")
    btn3.innerText = " 😡 ";
    const btn4 = document.createElement("span");
    btn4.setAttribute("id", "cold")
    btn4.setAttribute("class", "off")
    btn4.innerText = " 🥶 ";

    buttonsContainer.append(btn1, btn2, btn3, btn4);
    card.append(name, image, buttonsContainer);
    cardsContainer.append(card);

    reactionListener(btn1, btn2, btn3, btn4);
}

function reactionListener(btn1, btn2, btn3, btn4) {
    const reactionArray = [btn1, btn2, btn3, btn4];
    reactionArray.forEach((reaction) => {
        reaction.addEventListener("click", event => {
            if (event.target.className === "off") {
                event.target.style.textShadow = "0 0 5px #FF0000";
                event.target.className = "on"
            } else if (event.target.className === "on") {
                event.target.style.textShadow = "none";
                event.target.className = "off"
            }  
        });
    });
}