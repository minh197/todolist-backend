
const fs = require('fs')
const yargs = require("yargs");
const chalk = require("chalk");
let completedList=[]
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
yargs.command ({
    command: "delete",
    describe: "deletes one todo item",
    builder: {
        id: {
            describe: "id number",
            demandOption: true,
            type: "number",
        }
    },
    handler: function(builder) {
        console.log(chalk.red.bold("One todo has been deleted."))
        let data = loadData()
        data.splice(builder.id,1)
        saveData(data)
    }
})
yargs.command ({
    command: "toggle",
    describe: "toggles todos from complete to incomplete and vice versa",
    builder: {
        id: {
            describe: "id number",
            demandOption: true,
            type: "number",
        }
    },
    handler: function(builder) {
        console.log(chalk.green.bold("Your todo has been toggled."))
        let data = loadData()
        data[builder.id].status = !data[builder.id].status
        saveData(data)
    }
})

yargs.command({
    command: "list",
    describe: "List all the todos",
    builder:{
        status:{
        describe: "Describe the status of the to-do",
        demandOption: false,
        type: "boolean",
        default: "false"
    }
    },


    handler: function (args) {
        const data = loadData()
        data.forEach(({ todo, status },idx) => console.log(chalk.white.bold(`
        idx: ${idx}
        todo: ${todo}
            status: ${status}`)))
            
            console.log(chalk.yellow.bold("Listing all the to-dos"))
    }
});

yargs.command ({
    command: "list_complete",
    describe: "listing completed todos",
    handler: function() {
        console.log(chalk.green.bold("Here are all the completed todos."))
        const data = loadData();
        data.forEach(({id, todo, status}) => {if (status === true) {console.log(`
        id: ${id}
        todo: ${todo}
        status: ${status}`)}})
    }

})

yargs.command ({
    command: "list_incomplete",
    describe: "listing completed todos",
    handler: function() {
        console.log(chalk.magenta.bold("Here are all the incompleted todos."))
        const data = loadData();
        data.forEach(({id, todo, status}) => {if (status === false) {console.log(`
        id: ${id}
        todo: ${todo}
        status: ${status}`)}})
    }

})

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
       console.log(chalk.green.bold("Finish adding"))

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