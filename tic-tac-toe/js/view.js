export default class View {
    $ = {}
    constructor(){
        this.$.menu = this.#qs('[data-id="menu"]');
        this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
        this.$.menuItems = this.#qs('[data-id="menu-items"]');
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
        this.$.square = document.querySelectorAll('[data-id="square"]');
        this.$.modal = this.#qs('[data-id="modal"]');
        this.$.modalT = this.#qs('[data-id="modal-text"]');
        this.$.modalB = this.#qs('[data-id="modal-btn"]');
        this.$.turn =this.#qs('[data-id="turn"]');
        this.$.p1Wins =this.#qs('[data-id="score1"]');
        this.$.tie =this.#qs('[data-id="tie"]');
        this.$.p2Wins =this.#qs('[data-id="score2"]');
        

        // UI-only event listener 
        this.$.menu.addEventListener('click', event => {
            this.#toggleMenu();
        })
    }





    // Register all the event listener
    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener('click' , handler);
        this.$.modalB.addEventListener('click' , handler);
        
    }




    bindNewRoundEvent(handler){
        this.$.newRoundBtn.addEventListener('click', handler)
    }





    bindPlayerMoveEvent(handler){
        this.$.square.forEach(square => {
           square.addEventListener('click',() => handler(square)); 
        });
    }







    // DOM helper methods

    updateScoreBoard(p1Wins,p2Wins,tie){
        this.$.p1Wins.innerText = `${p1Wins} wins`;
        this.$.p2Wins.innerText = `${p2Wins} wins`;
        this.$.tie.innerText = `${tie} wins`;
    }



    openModal(message){
        this.$.modal.classList.remove("hidden");
        this.$.modalT.innerText =message

    }



    closeModal(){
        this.$.modal.classList.add("hidden");
    }



    closeAll(){
        this.closeModal();
        
    }
    
    
    initializedMoves(moves){
        this.$.square.forEach(square => {
            const existingMove = moves.find(moves => moves.squareId === +square.id )

            if(existingMove){
                this.handlePlayerMove(square , existingMove.player)
            }
            
        })
    }

    clearMoves(){
        this.$.square.forEach(square =>{
            square.replaceChildren();
        })
    }
    


    #toggleMenu(){
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");
        const icon =this.$.menuBtn.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }



    handlePlayerMove(squareEl,player){
        const icon = document.createElement('i');
        icon.classList.add('fa-solid',
         player.iconClass,
         player.colorClass)
        squareEl.replaceChildren(icon);
    }



    setTurnIndicator(players)
    {
        
        const icon = document.createElement('i');
        const text = document.createElement('p');
        this.$.turn.classList.add( players.id === 1 ? 
            'turquoise' : 'yellow')
        this.$.turn.classList.remove( players.id === 1 ? 
            'yellow' : 'turquoise')

      
        icon.classList.add('fa-solid',players.id === 1 ? 'fa-o' : 'fa-x');
        text.innerText = (players.id === 1 ? "Player 1, you're up!" : "Player 2, you're up!");
        this.$.turn.replaceChildren(icon,text);
    }



    
    #qs(selector , parent){
        const el = parent ? 
        parent.querySelector(selector):
        document.querySelector(selector);
        if(!el) throw new Error('could not find element');
        return el;
    }
}


