let xTurn, xCounter = 0, cCounter = 0
const cells = document.querySelectorAll('[data-state]')


function startNewGame(){
    resetBoard(cells)
    for (const cell of cells) {
        cell.addEventListener('click',clickHandler, {once:true})
        function clickHandler() {
            if(cell.dataset.state != 'empty') return
            if(xTurn){
                cell.dataset.state = 'x'
                xCounter++ 
                if (xCounter >= 3) checkForWin('x',xCounter)
            } 
            else {
                cell.dataset.state = 'c'
                cCounter++
                if (xCounter >= 3) checkForWin('c')
            }
            xTurn = !xTurn
        }
    }
}
function resetBoard(cells = []){
    xTurn = true
    xCounter = 0 
    cCounter = 0
    cells.forEach(cell => {
        cell.dataset.state = 'empty'
    })
    if(document.querySelector('.gameover')) document.querySelector('.gameover').remove()
    
}

function checkForWin(currentPlayer){

    //Generating a board representing the game
    let board=[[],[],[]]
    counter = 0 
    for (let i = 0; i < 3; i++) {
        for (let y = 0; y < 3; y++) {
            if(cells[counter].dataset.state == 'x') board[i][y] = 1
            else if (cells[counter].dataset.state == 'c') board[i][y] = 0
            else board[i][y] = ''  
            counter++
        } 
    }
    
    function checkIfSame(a,b,c,xCounter){
        if(a === "" || b==="" || c==="") return false
        if(a===b && b===c) return true
    }

    for (let i = 0; i < 3; i++) {
        if(checkIfSame(board[0][i],board[1][i],board[2][i])) return endGame(currentPlayer)
    }
    for (let i = 0; i < 3; i++) {
        if(checkIfSame(board[i][0],board[i][1],board[i][2])) return endGame(currentPlayer)
    }

    if(checkIfSame(board[0][0],board[1][1],board[2][2])) return endGame(currentPlayer)

    if(checkIfSame(board[0][2],board[1][1],board[2][0])) return endGame(currentPlayer)
    
    if(xCounter == 5) return endGame(false)
}

function endGame(result){
    let message
    if(result == false) message = 'Tie'
    else if(result == 'x') message = 'X won'
    else message = 'Circle won'
    const newDiv = document.createElement('div')
    newDiv.classList.toggle('gameover')
    newDiv.innerText = message
    
    const newButton = document.createElement('button')
    newButton.innerText = 'New Game'
    newButton.addEventListener('click', startNewGame);
    newDiv.append(newButton)
    document.body.appendChild(newDiv)
}


startNewGame()

document.querySelector('.newgame').addEventListener('click', startNewGame)