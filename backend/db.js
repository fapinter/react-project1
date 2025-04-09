import mysql from "mysql2";

export const db = mysql.createConnection({
    //Change the host into localhost in case of running in Mysql Workbench
    //otherwise, use the ip address of your machine
    host : "localhost",
    user : "root",
    password : "root",
    database : "trabalho1_crud"
});


//Function used only to test the connection with the database
function testDatabaseConnection() {
  db.connect((err) => {
      if (err) {
          console.error("Error connecting to the database:", err);
          return;
      }
      console.log("Connection established");

      //Query to verify the connection
      db.query("SELECT name_product from products WHERE id < 2", (err, results) => {
          if (err) {
              console.error("Error doing the query", err);
              return;
          }
          console.log("Query results", results);
      });
  });
}

// Call test function
testDatabaseConnection();



