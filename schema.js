const moongoose = require("mongoose")

const schema = new moongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }
})

const Expense = moongoose.model('expenseinfo',schema)// first parameter -> collection name 2nd arg -> schema name

module.exports = {Expense}