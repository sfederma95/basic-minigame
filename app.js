let area = $('#area')
let player = $('#player')
let score = 0;

area.on('click',function(e){
    if (e.target.id!=='player'){
        let top = e.pageY-25
        let left = e.pageX-25
        player.animate({
            top: `${top}px`,
            left: `${left}px`,
          }, 1000,'linear')
    }
})

function generateRandomXY(){
    let top = Math.floor(Math.random() * window.innerHeight) + 1
    let left = Math.floor(Math.random() * window.innerWidth) + 1
    return [top,left]
}

function generateEnemy(){
    let [top,left]=generateRandomXY();
    let enemy = $('<div>').attr('id','enemy')
    enemy.css('top',`${top-25}px`)
    enemy.css('left',`${left-25}px`)
    area.append(enemy);
}

function generateCoin(){
    let [top,left]=generateRandomXY();
    let coin = $('<div>').attr('id','coin')
    coin.css('top',`${top-10}px`)
    coin.css('left',`${left-10}px`)
    area.append(coin);
}

function youLose(){
    let enemy = document.querySelector('#enemy');
    let player = document.querySelector('#player');
    let rect1 = enemy.getBoundingClientRect();
    let rect2 = player.getBoundingClientRect();
    var overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)
    if (overlap){
        player.remove();
        setTimeout(function(){ alert('you lose!');
    }, 500);
        setTimeout(function(){ location.reload()
        }, 700);
    }
}

function gainPoint(){
    let coin = document.querySelector('#coin');
    let player = document.querySelector('#player');
    let rect1 = coin.getBoundingClientRect();
    let rect2 = player.getBoundingClientRect();
    var overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)
    if (overlap){
        coin.remove();
        score++
        console.log(score)
    }
}

setInterval(youLose,50)
setInterval(gainPoint,50)

generateEnemy();
generateCoin();
