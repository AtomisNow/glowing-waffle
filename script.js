// =====================
// ITEMS
// =====================


const humans = ["🪖 Soldier", "🌾 Farmer", "👨🏽 Mortal"];
const commons = ["🐂 Minotaur", "🐎 Centaur", "👁️ Cyclops"];
const heroics = ["🦶 Achilles", "💪 Hercules", "🌊 Perseus"];
const mythics = ["🐍 Medusa", "🐉 Hydra", "🐕 Cerberus", "🦁 Chimera"];
const godly = ["🦉 Athena", "⚔️ Ares", "☀️ Apollo", "🪞 Aphrodite"];
const olympians = ["⚡ Zeus", "🔱 Poseidon", "💀 Hades"];
const primordials = ["⌛ Cronus", "🌌 Uranus", "🌍 Gaia"];




// =====================
// ROLL SYSTEM
// =====================

let coins = 100; 
const spinCost = 8;

function roll() {


    if (coins < spinCost) {
    document.getElementById("result").innerText =
        "❌ Not enough coins!";
    return;
}


coins -= spinCost;


document.getElementById("coins").innerText =
    `🪙 Coins: ${coins}`;

    let roll = Math.random() * 100;


    let rarity, pool;


    if (roll < 35) { rarity = "Human"; pool = humans; }
    else if (roll < 60) { rarity = "Common"; pool = commons; }
    else if (roll < 78) { rarity = "Heroic"; pool = heroics; }
    else if (roll < 90) { rarity = "Mythic"; pool = mythics; }
    else if (roll < 96) { rarity = "Godly"; pool = godly; }
    else if (roll < 99) { rarity = "Olympian"; pool = olympians; }
    else { rarity = "Primordial"; pool = primordials; }


    let item = pool[Math.floor(Math.random() * pool.length)];

    // SPIN EFFECT
    let resultBox = document.getElementById("result");
    let spins = 10;
    let interval = setInterval(() => {
        resultBox.innerText = pool[Math.floor(Math.random() * pool.length)];
        spins--;
        if (spins <= 0) {
            clearInterval(interval);


            resultBox.innerText = `${item} (${rarity})`;
            resultBox.className = "result-box " + rarity.toLowerCase();


            flashEffect(rarity);
        }
    }, 80);
}




// =====================
// SIDEBAR CLICK VIEW
// =====================


let currentOpen = "";


function showRarity(type) {


    const rarityDiv = event.target;


    const data = {
        human: humans,
        common: commons,
        heroic: heroics,
        mythic: mythics,
        godly: godly,
        olympian: olympians,
        primordial: primordials
    };


    // SAVE ORIGINAL TEXT IF NOT SAVED
    if (!rarityDiv.dataset.original) {
        rarityDiv.dataset.original = rarityDiv.childNodes[0].textContent.trim();
    }


    // CLOSE IF SAME TAB CLICKED
    if (currentOpen === type) {
        rarityDiv.innerHTML = rarityDiv.dataset.original;
        currentOpen = "";
        return;
    }


    // RESET ALL
    document.querySelectorAll(".rarity").forEach(div => {


        if (!div.dataset.original) {
            div.dataset.original = div.childNodes[0].textContent.trim();
        }


        div.innerHTML = div.dataset.original;
    });


    currentOpen = type;


    // OPEN CURRENTl
    rarityDiv.innerHTML =
        rarityDiv.dataset.original +
        "<div class='mini-list'>" +
        data[type].join("<br>") +
        "</div>";
}





// =====================
// FLASH EFFECT
// =====================


function flashEffect(rarity) {
    let flash = document.getElementById("flash");


    let colors = {
        olympian: "rgba(59, 255, 255, 0.6)",
        primordial: "rgba(128,0,128,0.7)",
        godly: "rgba(255,215,0,0.6)",
    };


    if (!colors[rarity.toLowerCase()]) return;


    flash.style.background = colors[rarity.toLowerCase()];
    flash.style.opacity = "1";


    setTimeout(() => {
        flash.style.opacity = "0";
    }, 300);
}

function earnCoins() {
    coins += 25;

    document.getElementById("coins").innerText=
    `🪙 Coins: ${coins}`;
}