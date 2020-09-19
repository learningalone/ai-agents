const Problem = require('../core/Problem');

/**
 * Simple reflex agent problem. Define a problem to be solved by a simple reflex agent 
 */
class CleanerProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
        this.memory = {}
    }

    /**
     * Check if the given solution solves the problem. You must override.
     * The current state of the enviroment is maintained in data.world
     * @param {Object} solution 
     */
    goalTest(data) {
        let minX = min(data.world);
        if (data.interations >= this.env.maxIterations)
            return true;
        if (minX == 0) {
            return true;
        }
        return false;
    }

    register(direccion){
        if(this.memory[direccion]){
            this.memory[direccion] += 1;
        }else {
            this.memory[direccion] = 1;
        }

    }

    evaluar(action,agentState){
        let x;
        let y;
        if (action == "UP") {
            x = agentState.x;
            y = agentState.y - 1;
            if(this.memory[x+","+y]){
                console.log("esto");
                this.memory[x+","+y];
                return this.memory[x+","+y];
            } else {
                return 0;
            }
         }
         if (action == "DOWN") {
            x = agentState.x;
            y = agentState.y + 1;
            if(this.memory[x+","+y]){
                console.log("Esto");
                return this.memory[x+","+y];
            } else {
                return 0;
            }
         }
         if (action == "LEFT") {
            x = agentState.x - 1;
            y = agentState.y;
            if(this.memory[x+","+y]){
                return this.memory[x+","+y];
            } else {
                return 0;
            }
         }
         if (action == "RIGHT") {
            x = agentState.x + 1;
            y = agentState.y;
            if(this.memory[x+","+y]){
                return this.memory[x+","+y];
            } else {
                return 0;
            }
         }
    }
    /**
     * The transition model. 
     * Tells how to change the state (data) based on the given actions. You must override
     * In this case, the actions can be one the four movements or the TAKE action.
     * In this case, what changes based on the movement actions is the x or y position of the agent
     * or the current cell if the action is TAKE
     * @param {} data 
     * @param {*} action[]
     * @param {*} agentID 
     */
    update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        if(action.length == 1){
            if (action[0] == "UP") {
                //data.world[agentState.x][agentState.y] += 1;
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
                agentState.y -= 1; 
            }
            if (action[0] == "DOWN") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
                //data.world[agentState.x][agentState.y] += 1;
                agentState.y += 1;
            }
            if (action[0] == "LEFT") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
               // data.world[agentState.x][agentState.y] += 1;
                agentState.x -= 1;
            }
            if (action[0] == "RIGHT") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
               // data.world[agentState.x][agentState.y] += 1;
                agentState.x += 1;
            }
            if (action[0] == "TAKE") {
                map[agentState.y][agentState.x] = 0;
            }
            if (!data.interations) {
                data.interations = 1;
            } else {
                data.interations++;
            }    
        } else {
            //Evalua cual es la casilla menos visitada
            let aux = 0; //direccion de la casilla menos visitada
            let arrayAux = [];
            for(let i=0;i<action.length;i++){
                if(i==0){
                    arrayAux.push(action[i])
                } else {
                    for(j=0;j<arrayAux.length;j++){
                        if(this.evaluar(action[i],agentState) < this.evaluar(arrayAux[j],agentState)){
                            arrayAux.splice(j,0,viewKey[0][i]);
                            break;
                        } else {                            
                            if(this.evaluar(action[i],agentState) == this.evaluar(arrayAux[j],agentState)){
                                arrayAux.splice(j+1,0,viewKey[0][i]);
                                break;
                            } else {
                                if(j+1 == arrayAux.length){
                                    arrayAux.push(viewKey[0][i]);
                                }
                            }
                        }
                    }
                }
            }
            //se mueve a la casilla menos visitada
            if (arrayAux[0] == "UP") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
               // data.world[agentState.x][agentState.y] += 1;
                agentState.y -= 1;
            }
            if (arrayAux[0] == "DOWN") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
              //  data.world[agentState.x][agentState.y] += 1;
                agentState.y += 1;
            }
            if (arrayAux[0] == "LEFT") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
              //  data.world[agentState.x][agentState.y] += 1;
                agentState.x -= 1;
            }
            if (arrayAux[0] == "RIGHT") {
                this.register(agentState.x + "," + agentState.y);
                console.log(this.memory);
              //  data.world[agentState.x][agentState.y] += 1;
                agentState.x += 1;
            }
            if (arrayAux[0] == "TAKE") {
                map[agentState.y][agentState.x] = 0;
            }
            if (!data.interations) {
                data.interations = 1;
            } else {
                data.interations++;
            }
        }
    }

    /**
     * Gives the world representation for the agent at the current stage.
     * Notice that the agent don't have access to the whole labyrinth. It only "see"
     * the cell around and under it. 
     * @param {*} agentID 
     * @returns and object with the information to be sent to the agent
     */
    perceptionForAgent(data, agentID) {
        let map = data.world; 
        let agentState = data.states[agentID];
        let x = agentState.x;
        let y = agentState.y;
        let posAgent = [agentState.x,agentState.y];
        let posMeta = [data.stateF.x,data.stateF.y];
        let dir =[];
        let result = [];
        //LEFT
        if(map[y][x - 1] != "w"){
            dir.push("LEFT");
        }
        //UP
        if(map[y - 1][x] != "w"){
            dir.push("UP");
        }
        //RIGTH
        if(map[y][x + 1] != "w"){
            dir.push("RIGTH");
        }
        //DOWN
        if(map[y + 1][x] != "w"){
            dir.push("DOWN")
        }

        // result = result.map(value => value > 0 ? "w" : 0);
        
        //SMELL
        //result.push(Math.abs(map[y][x]));
        result = [dir,posAgent,posMeta]
        return result;
    }

    /**
     * Solve the given problem. We don't need to change in this case
     * @param {*} problem 
     * @param {*} callbacks 
     */
    /*solve(problem, callbacks) {
        this.controller.setup({ world: problem, problem: this });
        this.controller.start(callbacks);
    }*/
}

module.exports = CleanerProblem;


function min(data) {
    let min = 9999999;
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        for (j = 0; j < row.length; j++) {
            if (row[j] == "w"){
                
            } else {
                if(row[j] < min){
                    min = row[j];
                }
            }
        }
    }
    return min;
}
