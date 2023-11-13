"use strict";

//  ---- Variables ----

const root = document.documentElement;
root.style.setProperty("--playerHeigth",(innerHeight-125-64)+"px");
const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreSpan = document.getElementById("score")
const enemyGrid = document.getElementById("enemy-grid");
const finishedScreen = document.getElementById("finished-screen");

const buttonLeft = document.getElementById("button-left");
const buttonRigth = document.getElementById("button-rigth");
const buttonSpace = document.getElementById("button-space");

const mediaQuery = window.matchMedia("(min-width: 1000px)");
let playerX = 190;
if (mediaQuery.matches) {
    playerX = 600;
    root.style.setProperty("--playerHeigth",(innerHeight-64)+"px");
}
let requestingMove = false;
const speed = 6;
let pressedKeys = {};
let score = 0;
let level = 1;
let life = 3;

const heart1 = document.getElementById("heart1");
const heart2 = document.getElementById("heart2");
const heart3 = document.getElementById("heart3");

const enemyArr = [];

//  ---- Classes and constructors ----

class Enemy {
    constructor(element,life,points,action,interval) {
        this.element = element;
        this.life = life;
        this.points = points;
        this.action = action;
        this.interval = interval;
        this.intervalId = null;
    }
    setAction() {
        if (this.action != undefined) {
            const time = Math.random()*this.interval+1000;
            this.intervalId = setInterval(this.action,Math.floor(time));
        }
    }
    stopAction() {
        if (this.intervalId) clearInterval(this.intervalId);
    }
}

// ---- CONTROLS ----
    //  ---- Key Actions (FOR DESKTOP) ----
    document.addEventListener("keydown", (e) => {
        if (pressedKeys[e.key] == undefined) {
            if (e.key == " ") createBullet();
            if ((e.key == "ArrowRight" || e.key == "ArrowLeft") && requestingMove == false) requestAnimationFrame(movePlayer);
            pressedKeys[e.key] = true;
        }
    });
    document.addEventListener("keyup", (e) => {
        delete pressedKeys[e.key];
    });

    //  ---- Button Actions (FOR MOBILE) ----
    let direction = 0;
    let touched = false;
    buttonLeft.addEventListener("touchstart",()=>{
        if (!(playerX-speed < 0)) playerX -= speed;
        requestAnimationFrame(movePlayer);
        touched = true;
        direction = 1;
    });
    buttonLeft.addEventListener("touchend",()=>touched = false);
    buttonRigth.addEventListener("touchstart",()=>{
        if (!(playerX-speed > innerWidth - 48)) playerX += speed;
        requestAnimationFrame(movePlayer);
        touched = true;
        direction = 2;
    });
    buttonRigth.addEventListener("touchend",()=>touched = false);
    buttonSpace.addEventListener("touchstart",createBullet);

// ---- Important Functions ----

function checkCollision(interval,obj,target,action) {
    const rect1 = obj.getBoundingClientRect();
    const tar = document.querySelectorAll(target);
    let minDistance = Infinity;
    let oneTar;
    if (tar.length == 0) clearInterval(interval);
    else {
        tar.forEach(t => {
            const rectTar = t.getBoundingClientRect();
            const distance = Math.sqrt((rect1.left - rectTar.left) ** 2 + (rect1.top - rectTar.top) ** 2);
            if (distance < minDistance) {
                minDistance = distance;
                oneTar = t;
            }
        });
        const rect2 = oneTar.getBoundingClientRect();
        if (
            rect1.right > rect2.left &&
            rect1.left < rect2.right &&
            rect1.bottom > rect2.top &&
            rect1.top < rect2.bottom
        ) {
            action(oneTar);
            clearInterval(interval);
        }
    }
}

// ---- Interaction Functions ----

function movePlayer() {
    if ("ArrowLeft" in pressedKeys) {
        if (!(playerX-speed < 0)) playerX -= speed;
    }
    if ("ArrowRight" in pressedKeys) {
        if (!(playerX-speed > innerWidth - 48)) playerX += speed;
    }

    player.style.left = playerX + "px";
    if (Object.keys(pressedKeys).length != 0 || touched == true) {
        if (direction == 1 && !(playerX-speed < 0)) playerX -= speed;
        else if (direction == 2 && !(playerX-speed > innerWidth - 48)) playerX += speed;  
        requestAnimationFrame(movePlayer);
        requestingMove = true;
    } else requestingMove = false;
}
requestAnimationFrame(movePlayer);

function createBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = (playerX+22) + "px";
    game.appendChild(bullet);

    const emptyEnemy = document.createElement("div");
    emptyEnemy.classList.add("empty-enemy");
    let bulletInterval;
    if (document.querySelectorAll(".enemy").length != 0) {
        bulletInterval = setInterval(()=>checkCollision(bulletInterval,bullet,".enemy",target=>{
            const id = target.id.match(/\d+/);
            score += enemyArr[id].points;
            enemyArr[id].stopAction();
            enemyArr[id] = null;
            enemyGrid.replaceChild(emptyEnemy,target);
            updateScore();
            checkLevelUp();
            bullet.remove();
        }),50);
    }
    setTimeout(()=>{
        bullet.remove();
        clearInterval(bulletInterval);
    },1000);
}

function createEnemyBullet(enemy,type,time=1000) {
    const enemyBullet = document.createElement("div");
    enemyBullet.classList.add("eb");
    enemyBullet.classList.add(type);
    const coords = enemy.getBoundingClientRect();
    game.appendChild(enemyBullet);
    enemyBullet.style.left = Math.floor(coords.left) + "px";
    enemyBullet.style.top = Math.floor(coords.top) + "px";
    enemyBullet.style.setProperty("--top",Math.floor(coords.top) + "px");

    const bulletInterval = setInterval(()=>checkCollision(bulletInterval,enemyBullet,"#player",target=>{
        life--;
        game.style.animation = ".5s ease forwards screenDamage";
        setTimeout(()=>game.style.animation = "none",500);
        drawHearts();
        enemyBullet.remove();
    }),50);

    setTimeout(()=>enemyBullet.remove(),time);
}

//  ---- Internal/UI Functions ----

function updateScore() {
    let addZeros = "0000";
    if (score >= 100 && score < 1000) addZeros = "000";
    else if (score >= 1000 && score < 10000) addZeros = "00";
    else if (score >= 10000 && score < 100000) addZeros = "0";
    else if (score >= 100000) addZeros = "";
    scoreSpan.textContent = addZeros + score.toString();
}

function checkLevelUp() {
    if (document.querySelectorAll(".enemy").length == 0) {
        const bullets = document.querySelectorAll(".bullet");
        bullets.forEach(i=>i.remove());
        const emptyEnemies = document.querySelectorAll(".empty-enemy");
        emptyEnemies.forEach(i=>i.remove());
        const enemyBullets = document.querySelectorAll(".eb");
        enemyBullets.forEach(i=>i.remove());
        level++;
        life = 3;
        drawHearts();
        document.getElementById("level").textContent = "Level: "+level;
        levels[level-1]();
    }
}

function drawHearts() {
    const h = "url('life.svg')";
    const nh = "url('lifeless.svg')";
    heart1.style.backgroundImage = h;
    heart2.style.backgroundImage = h;
    heart3.style.backgroundImage = h;
    if (life < 3) heart1.style.backgroundImage = nh;
    if (life < 2) heart2.style.backgroundImage = nh;
    if (life < 1) {
        const bullets = document.querySelectorAll(".bullet");
        bullets.forEach(i=>i.remove());
        const enemies = document.querySelectorAll(".enemy");
        enemies.forEach(i=>{
            const id = i.id.match(/\d+/);
            enemyArr[id].stopAction();
            enemyArr[id] = null;
            i.remove();
        });
        const emptyEnemies = document.querySelectorAll(".empty-enemy");
        emptyEnemies.forEach(i=>i.remove());
        const enemyBullets = document.querySelectorAll(".eb");
        enemyBullets.forEach(i=>i.remove());
        score = 0;
        level = 1;
        life = 3;
        document.getElementById("level").textContent = "Level: "+level;
        updateScore();
        drawHearts();
        levels[level-1]();
    }
}

//  ---- Accesibility Functions ----

window.addEventListener("resize",()=>{
    if (playerX > innerWidth - 48) {
        playerX = innerWidth - 48;
        movePlayer();
    }
    if (playerX < 0) {
        playerX = 0;
        movePlayer();
    }
});
