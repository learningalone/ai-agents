const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": ["UP","RIGHT"],
            "0,0,0,w,0": ["UP","RIGHT"],
            "0,0,w,0,0": ["UP","LEFT"],
            "0,0,w,w,0": ["UP","LEFT"],//left
            "0,w,0,0,0": ["RIGHT","DOWN"],//L
            "0,w,0,w,0": ["RIGHT","LEFT"],
            "0,w,w,0,0": ["LEFT","DOWN"],
            "0,w,w,w,0": ["LEFT"],
            "w,0,0,0,0": ["RIGHT","UP"],//U*
            "w,0,0,w,0": ["RIGHT","UP"],
            "w,0,w,0,0": ["DOWN","UP"],
            "w,0,w,w,0": ["UP"],
            "w,w,0,0,0": ["DOWN","RIGHT"],//R*
            "w,w,0,w,0": ["RIGHT"],
            "w,w,w,0,0": ["DOWN"],
            "default": ["TAKE"]
        };
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let viewKey = this.perception.join();
        console.log(viewKey)
        if (this.table[viewKey]) {
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
    }

}

module.exports = CleanerAgent;