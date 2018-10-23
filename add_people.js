const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {

let people_firstname = process.argv[2];

   if (err) {
     return console.error("Connection Error", err);
   }
   
  client.query("SELECT * FROM famous_people WHERE first_name like $1::text GROUP BY id", [people_firstname], (err, result) => {
     if (err) {
       return console.error("error running query", err);
     }

    console.log("Searching ....")
    let celebs = result.rows;

    console.log(`Found ${celebs.length} by the name ${people_firstname}: `);
    celebs.forEach(function(row,number){
      console.log(`-${number + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`)
    });
    
    
  
    client.end();
  });
});