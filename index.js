// add-expense -> post
// get-expenses -> get
// edit-expenses -> post / patch
// delete expenses

//schema
/**
 * category,amount,date
 */

// mongodb+srv://<username>:<password>@linga.xjscauz.mongodb.net/?retryWrites=true&w=majority&appName=Linga

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Expense } = require('./schema.js'); // importing model
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 8000;

async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://Lingesh:Linga123@linga.xjscauz.mongodb.net/Expensedb?retryWrites=true&w=majority&appName=Linga"
    ); // async funciton returns a promise
    app.listen(port, function () {
      console.log(`listening  on port ${port}`);
    });
  } catch (error) {
    console.log("error");
    console.log("couldn't establish connection");
  }
}

connectToDb();

app.post("/add-expenses", async function (request, response) {
  try {
    await Expense.create({
      // for inserting data into db
      amount: request.body.amount,
      category: request.body.category,
      date: request.body.date,
    });
    response.status(200).json({
      status: "success",
      message: "entry created",
    });
  } catch (error) {
    response.status(500).json({
      status: "failure",
      message: "entry    created",
      error: error,
    });
  }
});

app.get("/get-expenses", async (request, response) => {
  try {
    const expensedata = await Expense.find(); // asynchronous
    response.status(200).json(expensedata);
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "failed to reterive data",
      error: error,
    });
  }
});

app.delete("/delete-expense/:id", async (request, response) => {
  try {
    const expenseid = await Expense.findById(request.params.id);
    console.log(expenseid);
    if (expenseid) {
      await Expense.findByIdAndDelete(expenseid);
      response.status(200).json({
        status: "success",
        message: "deleted an entry",
      });
    } else {
      response.status(404).json({
        status: "failed",
        message: "file not found",
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "internal error",
    });
  }
});

app.patch("/edit-expense/:id", async (request, response) => {
  try {
    const expenseid = await Expense.findById(request.params.id);
    console.log(expenseid);
    if (expenseid) {
      await expenseid.updateOne({
        amount: request.body.amount,
        category: request.body.category,
        date: request.body.date,
      });
      response.status(200).json({
        status: "success",
        message: "updated an entry",
      });
    } else {
      response.status(404).json({
        status: "failed",
        message: "file not found",
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "internal error",
    });
  }
});
