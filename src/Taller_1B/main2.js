const CleanerProblem = require('./CleanerProblem');
const CleanerAgent = require('./CleanerAgent');

let myProblem = new CleanerProblem({ maxIterations: 100 });

myProblem.addAgent("Smith", CleanerAgent, { x: 1, y: 7 }, {x:6, y:6});
myProblem.solve([
    ["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", 0, 0, 0, 0, 0, 0, "w"],
    ["w", "w", 0, "w", 0, "w", "w", "w"],
    ["w", 0, 0, 0, 0, "w", 0, "w"],
    ["w", 0, "w", "w", 0, "w", 0, "w"],
    ["w", 0, 0, "w", 0, "w", 0, "w"],
    ["w", "w", 0, "w", 0, "w", -1, "w"],
    ["w", 0, 0, "w", 0, 0, 0, "w"],
    ["w", 0, "w", "w", 0, "w", 0, "w"],
    ["w", 0, 0, 0, 0, "w", 0, "w"],
    ["w", 0, "w", 0, 0, "w", 0, "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]
], {
    onFinish: (result) => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("agent: " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        world[agentState.y][agentState.x] = "X"
        status = 1;
        for (let line of world) {
            console.log(line)
            for (let cell of line)
                if (cell == -1)
                    status = -1
        }

        if (status == -1)
            console.log("Agent cannot solve this problem :(")
        else
            console.log("Agent could solve this problem :)")
    },
    onTurn: (result) => { console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1])) }
});