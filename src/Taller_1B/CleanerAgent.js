const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {};
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let result = [];
        let viewKey = this.perception
        console.log(viewKey)
        for(let i=0;i<viewKey[0].length;i++){
            if (i == 0){
                result.push(viewKey[0][i])
            } else {
                for(j=0;j<result.length;j++){
                    if(this.evaluar(viewKey[0][i], viewKey[1], viewKey[2]) < this.evaluar(result[j],viewKey[1], viewKey[2])){
                        result.splice(j,0,viewKey[0][i]);
                        j = resultado.length;
                    } else {
                        if(j+1 == result.length){
                            result.push(viewKey[0][i])
                        }
                    }
                }
            }
        }
        return result;
    }

    evaluar(dir,ini,fin){
        if(dir == "LEFT"){
            return this.distancia(ini[0]-1,ini[1],fin[0],fin[1]);
        }
        if(dir == "UP"){
            return this.distancia(ini[0],ini[1]-1,fin[0],fin[1]);
        }
        if(dir == "RIGTH"){
            return this.distancia(ini[0]+1,ini[1],fin[0],fin[1]);
        }
        if(dir == "DOWN"){
            return this.distancia(ini[0],ini[1]+1,fin[0],fin[1]);
        }
    }

    distancia(xi,yi,xf,yf){
       let distance = Math.sqrt(Math.pow((xf - xi), (2)) + (Math.pow((yf - yi), (2))));
       return distance;
    }

}

module.exports = CleanerAgent;