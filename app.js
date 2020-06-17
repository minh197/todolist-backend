
const fs = require('fs')
const yargs = require("yargs");
const chalk = require("chalk");
function loadData() {
    try {
        const buffer = fs.readFileSync("data.json")
        const data = buffer.toString()
        const dataObj = JSON.parse(data)
        console.log(JSON.parse(data))
        return dataObj

    } catch (err) {
        return []
    }


}

function saveData(data) {
    fs.writeFileSync("data.json", JSON.stringify(data))


}
function addToDo(todo, status) {
    const data = loadData()
    const newToDo = { todo: todo, status: status }
    data.push(newToDo)
    saveData(data)

}



yargs.command({
    command: "list",
    describe: "List all the todos",


    handler: function () {
        const data = loadData()
        data.forEach(({ todo, status }) => console.log(`
            todo: ${todo}
            status: ${status}`))
            console.log(chalk.yellow.bold("Listing all the to-dos"))
    }
});

yargs.command({
    command: "add",
    describe: "Add a new to-dos",
    builder: {
        todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string",
            alias: "t"
        },
        status:{
            describe: "Describe the status of the to-do",
            demandOption: false,
            type: "boolean",
            alias: "s",
            default: "false"
        }
    },
    handler: function ({todo,status}) {
       addToDo(todo,status)
       console.log("Finish adding")

    }
}
)

yargs.parse();
// if (process.argv[2] === "list") {
//     console.log("Listing to do")
//     const data = loadData()
//     data.forEach(({ todo, status }) => console.log(`
//     todo: ${todo}
//     status: ${status}`))

// } else if (process.argv[2] === "add") {
//     console.log("adding a new to do to the list")
//     let todo = process.argv[3] || null
//     let status = process.argv[4] || false
//     if (todo) {
//         addToDo(todo, status)
//     } else {
//         console.log("Need to provide todo body")
//     }

// }
// else {
//     console.log("Can not understandnode")
// }