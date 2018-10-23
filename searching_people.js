var knex = require('knex');
const pg = require("pg");
const settings = require("./settings");

var db = knex({
   client: 'pg',
   connection: {
       user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
}});


let people_firstname = process.argv[2];
let people_lastname = process.argv[3];
let people_date = process.argv[4];

  
   db('famous_people').insert({first_name: people_firstname, last_name: people_lastname, birthdate: people_date})
   .then(function(){
   	 db('famous_people').select('*').where({first_name: `${people_firstname}`})
  .andWhere({last_name: `${people_lastname}`})
  .andWhere({birthdate: `${people_date}`})
  .then(function(rows){
  	console.log("Searching ....")
  	 console.log(`Found ${rows.length} by the name ${people_firstname}: `);
    rows.forEach(function(row,number){
      console.log(`-${number + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`)
    });
  });
 });
 
   
  // client.query("SELECT * FROM famous_people WHERE first_name like $1::text GROUP BY id", [people_firstname], (err, result) => {
  //    if (err) {
  //      return console.error("error running query", err);
  //    }

    
    // let celebs = result.rows;

    // console.log(`Found ${celebs.length} by the name ${people_firstname}: `);
    // celebs.forEach(function(row,number){
    //   console.log(`-${number + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`)
    // });
