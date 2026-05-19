// =====================
// ITEMS
// =====================

let isRolling = false;

const humans = ["🪖 Soldier", "🌾 Farmer", "👨🏽 Mortal"];
const commons = ["🐂 Minotaur", "🐎 Centaur", "👁️ Cyclops"];
const heroics = ["🦶 Achilles", "💪 Hercules", "🌊 Perseus"];
const mythics = ["🐍 Medusa", "🐉 Hydra", "🐕 Cerberus", "🦁 Chimera"];
const godly = ["🦉 Athena", "⚔️ Ares", "☀️ Apollo", "🪞 Aphrodite"];
const olympians = ["⚡ Zeus", "🔱 Poseidon", "💀 Hades"];
const primordials = ["⌛ Cronus", "🌌 Uranus", "🌍 Gaia"];


// =====================
// COINS
// =====================

let coins = 100;
const spinCost = 8;


// =====================
// ROLL SYSTEM
// =====================

function roll() {

    if (isRolling) return;
isRolling = true;

    if (coins < spinCost) {

        document.getElementById("result").innerText =
            "❌ Not enough coins!";

        return;
    }

    coins -= spinCost;

    updateCoins();

    let randomRoll = Math.random() * 100;

    let rarity;
    let pool;

    if (randomRoll < 50) {
    rarity = "Human";
    pool = humans;
}
else if (randomRoll < 75) {
    rarity = "Common";
    pool = commons;
}
else if (randomRoll < 90) {
    rarity = "Heroic";
    pool = heroics;
}
else if (randomRoll < 97) {
    rarity = "Mythic";
    pool = mythics;
}
else if (randomRoll < 99.3) {
    rarity = "Godly";
    pool = godly;
}
else if (randomRoll < 99.85) {
    rarity = "Olympian";
    pool = olympians;
}
else {
    rarity = "Primordial";
    pool = primordials;
}

    let finalItem =
        pool[Math.floor(Math.random() * pool.length)];

    let resultBox =
        document.getElementById("result");

    let allItems = [

        ...humans,
        ...commons,
        ...heroics,
        ...mythics,
        ...godly,
        ...olympians,
        ...primordials
    ];

    let spinTime = 0;
    let totalSpin = 2400;

    resultBox.className = "result-box spinning";

    function animateRoll() {

        let fakeItem =

            allItems[
                Math.floor(Math.random() * allItems.length)
            ];

        resultBox.innerText = fakeItem;

        spinTime += 100;

        let speed = 50 + (spinTime / 18);

        if (spinTime < totalSpin) {

            setTimeout(animateRoll, speed);
        }

        else {

            resultBox.innerText =
                `${finalItem} (${rarity})`;

            resultBox.className =
                "result-box " + rarity.toLowerCase();

            flashEffect(rarity);

            if (
                rarity === "Olympian" ||
                rarity === "Primordial"
            ) {

                resultBox.classList.add("big-win");

                setTimeout(() => {

                    resultBox.classList.remove("big-win");

                }, 900);
            }
            isRolling = false;
        }
    }

    animateRoll();
}


// =====================
// COIN DISPLAY
// =====================

function updateCoins() {

    document.getElementById("coins").innerText =
        `🪙 Coins: ${coins}`;
}


// =====================
// EARN COINS
// =====================

function earnCoins() {

    coins += 25;

    updateCoins();
}


// =====================
// SIDEBAR
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

    if (!rarityDiv.dataset.original) {

        rarityDiv.dataset.original =
            rarityDiv.childNodes[0].textContent.trim();
    }

    if (currentOpen === type) {

        rarityDiv.innerHTML =
            rarityDiv.dataset.original;

        currentOpen = "";

        return;
    }

    document.querySelectorAll(".rarity").forEach(div => {

        if (!div.dataset.original) {

            div.dataset.original =
                div.childNodes[0].textContent.trim();
        }

        div.innerHTML =
            div.dataset.original;
    });

    currentOpen = type;

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

    let flash =
        document.getElementById("flash");

    let colors = {

        olympian: "rgba(59,255,255,0.6)",
        primordial: "rgba(128,0,128,0.7)",
        godly: "rgba(255,215,0,0.6)"
    };

    if (!colors[rarity.toLowerCase()])
        return;

    flash.style.background =
        colors[rarity.toLowerCase()];

    flash.style.opacity = "1";

    setTimeout(() => {

        flash.style.opacity = "0";

    }, 300);
}


// START DISPLAY
updateCoins();