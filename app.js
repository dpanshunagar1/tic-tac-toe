import Store from './store.js'
import View from './view.js';


// player variables with some data 
const players =[
    {
        id: 1,
        name : "player 1",
        iconClass: 'fa-o',
        colorClass: 'turquoise'
    },
    {
        id : 2,
        name: "player 2",
        iconClass: "fa-x",
        colorClass: 'yellow'
    }
]




// window.addEventListener("load", App.init);



function init(){
    const view = new View();
    const store = new Store('live-t3-storage-Key',players);
    
    function initView(){
        view.closeAll()
        view.clearMoves()
        view.setTurnIndicator(store.game.currentPlayer)
        view.updateScoreBoard(
            store.stats.playerWithStats[0].wins,
            store.stats.playerWithStats[1].wins , 
            store.stats.ties
        );
        view.initializedMoves(store.game.moves);
    }
    window.addEventListener('storage', () =>
    {
        initView();
    })
    initView()
    

    // actions performed after pressing reset button
    
    view.bindGameResetEvent(event =>{
        store.reset();
        initView()
        console.log(store.stats)
    })



 
    // actions performed after pressing new round 
    
    view.bindNewRoundEvent(event =>{
        store.newRound()
        initView()  

    })




    // when player interact with boxes then this function works 
    
    view.bindPlayerMoveEvent((square) =>{

        // check if the player had already played a move in the box 
        const existingMove = store.game.moves.find(move => move.squareId === +square.id);
        if (existingMove){
            return
        }

        // place an icon of the current player in the box
        view.handlePlayerMove(square, store.game.currentPlayer);


        // advance to the next state by pushing a move to move array
        store.playerMove(+square.id);
        if (store.game.status.isComplete){

            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins!` : `Tie!`);

            return
        }

       
        // set the next players turn indicator
        view.setTurnIndicator(store.game.currentPlayer);

    })
    
}


// this loads the init fuction at the time of refreshing 
window.addEventListener("load",init);