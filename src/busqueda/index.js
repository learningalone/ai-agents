let maze = [[2, 1, 1], 
            [2, 3, 3], 
            [2, 3, 1], 
            [1, 1, 1]];
let start = [3, 0];
let goal = [0, 2];
const OPERATORS = ["U", "D", "L", "R"];// Priotity in case

let root = {
    pos: start,
    cost: 0,
    parent: null,
    action: null
};

let problem = { maze, goal };

// Avoid come back
// root: {pos: [3, 0], cost: 0, parent: null, action: null}
// node: {pos: [x, y], cost: number, parent: node, action: string}
function testGoal(node, problem) {
    //console.log(problem);
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}

function solve(problem, nodo) {
    let solution = [];
    let cost = 0;
    let nodos = [];
    // START CODE HERE
    let nodoEvaluado = nodo;

    while (!testGoal(nodoEvaluado, problem) ) {
        agregarNodos(problem.maze,nodoEvaluado,nodos);
        nodoEvaluado = sacarMinimo(nodos);
        console.log(nodoEvaluado);
    } 
    cost = nodoEvaluado.cost;
    console.log(cost);
    trasarRuta(nodoEvaluado,solution);

    // END CODE HERE
    return { solution, cost }
}

function agregarNodos(maze,padre,nodos) {
    if(padre.pos[0] > 0){
        let fila = padre.pos[0]-1;
        let colum = padre.pos[1];
        let costo = maze[fila][colum] + padre.cost;
        nodos.push(crearNodo([fila,colum], costo, padre, "U"))
    }
    if(padre.pos[0] < maze.length-1){ 
        let fila = padre.pos[0]+1;
        let colum = padre.pos[1];
        let costo = maze[fila][colum] + padre.cost;
        nodos.push(crearNodo([fila,colum], costo, padre, "D"))
    }
    if(padre.pos[1] > 0){
        let fila = padre.pos[0];
        let colum = padre.pos[1]-1;
        let costo = maze[fila][colum] + padre.cost;
        nodos.push(crearNodo([fila,colum], costo, padre, "L"))
    }
    if(padre.pos[1] < maze[0].length){
        let fila = padre.pos[0];
        let colum = padre.pos[1]+1;
        let costo = maze[fila][colum] + padre.cost;
        nodos.push(crearNodo([fila,colum], costo, padre, "R"))
    }

    //return nodos;
}

function crearNodo(pos,cost,parent,action) {
    let node = {
        pos: pos,
        cost: cost,
        parent: parent,
        action: action
    };
    return node;
};

function sacarMinimo(nodos){
    let min = { cost: 999999 };
    let index = null;
    for (let i = 0; i< nodos.length; i++) {
      if(nodos[i].cost < min.cost){
          min = nodos[i];
          index = i;
      }
    }
    nodos.splice(index,1);
    return min;
}

function trasarRuta(nodo,array){
    if (nodo.parent != null){
        array.splice(0,0,nodo.action);
        trasarRuta2(nodo.parent,array);
    }else {
        console.log(array);
    }
    return 0;
}

function trasarRuta2(nodo,array){
    if (nodo.parent != null){
        array.splice(0,0,nodo.action);
        trasarRuta(nodo.parent,array);
    }else{
        console.log(array);
    }
    return 0;
}

console.log(solve(problem, root));