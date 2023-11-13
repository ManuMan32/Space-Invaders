// ---- SPACE INVADERS GAME LEVELS (Array with builder functions) ----

const levels = [
    function() {

        //  Level 1
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.classList.add("alien");
            el.id = "enemy"+i;
            const newEnemy = new Enemy(el,1,50,null,null);
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 2
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            let isAlien;
            if (i < 6 || i > 11) isAlien = (i % 2 == 0);
            else isAlien = (!(i % 2 == 0));
            if (isAlien) {
                el.classList.add("alien");
                newEnemy = new Enemy(el,1,50,null,null);
            } else {
                el.classList.add("alien2");
                newEnemy = new Enemy(el,1,100,()=>createEnemyBullet(el,"bullet-enemy"),8000);
                newEnemy.setAction();
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 3
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            if (i < 6) {
                el.classList.add("alien2");
                newEnemy = new Enemy(el,1,100,()=>createEnemyBullet(el,"bullet-enemy"),8000);
                newEnemy.setAction();
            } else {
                el.classList.add("alien");
                newEnemy = new Enemy(el,1,50,null,null);
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 4
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            let isAlien;
            if (i < 6 || i > 11) isAlien = (i % 2 == 0);
            else isAlien = (!(i % 2 == 0));
            if (isAlien) {
                el.classList.add("alien");
                newEnemy = new Enemy(el,1,50,null,null);
            } else {
                if (i < 6) {
                    el.classList.add("alien2");
                    newEnemy = new Enemy(el,1,100,()=>createEnemyBullet(el,"bullet-enemy"),8000);
                    newEnemy.setAction();
                } else {
                    el.classList.add("alien3");
                    newEnemy = new Enemy(el,1,200,()=>createEnemyBullet(el,"bullet-enemy2"),8000);
                    newEnemy.setAction();
                }
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 5
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            let isAlien;
            if (i < 6 || i > 11) isAlien = (i % 2 == 0);
            else isAlien = (!(i % 2 == 0));
            if (isAlien || ((i > 1 && i < 4) || (i > 7 && i < 10) || (i > 13 && i < 16))) {
                el.classList.add("alien");
                newEnemy = new Enemy(el,1,50,null,null);
            } else {
                el.classList.add("alien4");
                newEnemy = new Enemy(el,1,300,()=>createEnemyBullet(el,"bullet-enemy3"),4000);
                newEnemy.setAction();
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 6
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            if (i < 6) {
                el.classList.add("alien3");
                newEnemy = new Enemy(el,1,200,()=>createEnemyBullet(el,"bullet-enemy2"),8000);
                newEnemy.setAction();
            } else {
                if (i > 11 && !(i > 13 && i < 16)) {
                    el.classList.add("alien4");
                    newEnemy = new Enemy(el,1,300,()=>createEnemyBullet(el,"bullet-enemy3"),4000);
                    newEnemy.setAction();
                } else {
                    el.classList.add("alien");
                    newEnemy = new Enemy(el,1,50,null,null);
                }
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 7
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            let isAlien;
            if (i < 6 || i > 11) isAlien = (i % 2 == 0);
            else isAlien = (!(i % 2 == 0));
            if (isAlien) {
                el.classList.add("alien2");
                newEnemy = new Enemy(el,1,100,()=>createEnemyBullet(el,"bullet-enemy"),8000);
                newEnemy.setAction();
            } else {
                el.classList.add("alien3");
                newEnemy = new Enemy(el,1,200,()=>createEnemyBullet(el,"bullet-enemy2"),8000);
                newEnemy.setAction();
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 8
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            if (i < 6 || i > 11) {
                el.classList.add("alien4");
                newEnemy = new Enemy(el,1,300,()=>createEnemyBullet(el,"bullet-enemy3"),4000);
                newEnemy.setAction();
            } else {
                el.classList.add("alien2");
                newEnemy = new Enemy(el,1,100,()=>createEnemyBullet(el,"bullet-enemy"),8000);
                newEnemy.setAction();
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 9
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            el.classList.add("alien5");
            newEnemy = new Enemy(el,1,500,()=>createEnemyBullet(el,"bullet-enemy4",3000),5000);
            newEnemy.setAction();
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

        //  Level 10
        for (let i = 0; i < 18; i++) {
            const el = document.createElement("div");
            el.classList.add("enemy");
            el.id = "enemy"+i;
            let newEnemy;
            let isAlien;
            if (i < 6 || i > 11) isAlien = (i % 2 == 0);
            else isAlien = (!(i % 2 == 0));
            if (isAlien) {
                el.classList.add("alien5");
                newEnemy = new Enemy(el,1,500,()=>createEnemyBullet(el,"bullet-enemy4",3000),5000);
                newEnemy.setAction();
            } else {
                el.classList.add("alien4");
                newEnemy = new Enemy(el,1,300,()=>createEnemyBullet(el,"bullet-enemy3"),4000);
                newEnemy.setAction();
            }
            enemyArr[i] = newEnemy;
            enemyGrid.appendChild(el);
        }

    },
    function() {

    	//   Finish screen
    	enemyGrid.style.display = "none";
        finishedScreen.style.display = "flex";
        document.getElementById("level").textContent = "";

    }
];
levels[level-1]();