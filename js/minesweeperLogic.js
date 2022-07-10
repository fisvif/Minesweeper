let gameZone = document.querySelector('#gameZone'),
    gameZoneSize = 10,
    map = [];

function rand(number1, number2){  // функція рандома 
    return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}

function generateMap(a, b){
    let BombCount = 0;

    //  Generate bomb ---------------------------------------------------------------
    for (let i = 0; i < a; i++) {
        map[i] = [];

        for (let j = 0; j < a; j++) {
            let isBomb;
    
            isBomb = rand(0,1);
    
            if (BombCount >= gameZoneSize) 
            {
                b[i][j] = 1;
            } else {
                if (isBomb == 0 && BombCount <= gameZoneSize * 0.5) 
                {
                    isBomb = rand(0,1);
    
                    if (isBomb == 0) 
                    {
                        b[i][j] = rand(0,1);
                    } else {
                        b[i][j] = isBomb;
                    }
                } else {
                    
                    b[i][j] = isBomb;
                }
            }
    
            if (b[i][j] == 0) 
            {
                BombCount++;
            }
        }
    }

    //  Generate numbers ----------------------------------------------------------

    for (let i = 0; i < gameZoneSize; i++) {
        let BombAround = 0;

        for (let j = 0; j < gameZoneSize; j++) {
            if(map[i][j] != 0){
                if (i > 0 && j > 0 && map[i-1][j-1] == 0) 
                {
                    BombAround++;
                }

                if (i > 0 && map[i-1][j] == 0) 
                {
                    BombAround++;
                }

                if (i > 0 && j <= gameZoneSize-1 && map[i-1][j+1] == 0) 
                {
                    BombAround++;
                }

                if (j > 0 && map[i][j-1] == 0) 
                {
                    BombAround++;
                }

                if ( j <= gameZoneSize-1 && map[i][j+1] == 0) 
                {
                    BombAround++;
                }
                
                if (i < gameZoneSize-1 && j > 0 && map[i+1][j-1] == 0) {
                    BombAround++;
                }

                if (i < gameZoneSize-1 && map[i+1][j] == 0) {
                    BombAround++;
                }

                if (i < gameZoneSize-1 && j < gameZoneSize-1 && map[i+1][j+1] == 0) {
                    BombAround++;
                }

                if(BombAround == 0){
                    map[i][j] = '&nbsp;';
                }else{
                    map[i][j] = BombAround;
                }
                BombAround = 0;
            }
        }
    }
}

function showMap(map){

    map.forEach(element => {
        element.forEach(e => {
            let cell = document.createElement("div");
            cell.className = 'cell partition';
    
            if (e === 0) {
                cell.innerHTML = 'bomb';
                cell.className += ' bomb';
                cell.style.background = 'rgb(' +  rand(100, 255) + ',' +  rand(100, 255) + ',' +  rand(100, 255) + ')';
            } else {
                cell.innerHTML = e;
            }
    
            gameZone.appendChild(cell);
        });
    });

    gameZone.style.width = gameZoneSize * document.querySelector('.cell').offsetWidth +'px';
    gameZone.style.height = gameZoneSize * document.querySelector('.cell').offsetHeight +'px';
}

function cellCheck(cellClass, cell){

    cellClass.remove('partition');
    
    if (cellClass.contains('bomb')) 
    {
        document.querySelector('.lose-alert').style.display = 'block';

        document.querySelectorAll('.cell').forEach(e => {
            e.classList.remove('partition');
        });
    } else {
        if (cell.textContent  != '1' && cell.textContent  != '2' && cell.textContent  != '3' && cell.textContent  != '4' && cell.textContent  != '5' && cell.textContent  != '6' && cell.textContent  != '7' && cell.textContent  != '8' && cell.classList.contains('bomb') == false) {
            document.querySelectorAll('.cell').forEach(e => {
                console.log(2);
                if (e.textContent  != '1' && e.textContent  != '2' && e.textContent  != '3' && e.textContent  != '4' && e.textContent  != '5' && e.textContent  != '6' && e.textContent  != '7' && e.textContent  != '8' && e.classList.contains('bomb') == false) {
                    console.log(3);
                    e.classList.remove('partition');
                }
            });
        }
    }
    
    if (!cellClass.contains('bomb') && cell.textContent == ' ')
    {
    }
}

document.querySelector('.restar-btn').onclick = function (){  location.reload() };

generateMap(gameZoneSize, map);
showMap(map);

document.querySelectorAll('.cell').forEach(e => {
    e.onclick = function () {
        cellCheck(e.classList, e);
    };
    
    e.contextmenu = function () {
        e.preventDefault()
    };
});

// window.addEventListener('contextmenu', (event) => {
//     event.preventDefault()
//   })