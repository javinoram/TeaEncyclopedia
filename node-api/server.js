const express = require('express');
const port = 8080;
const app = express();
const sqlite3 = require('sqlite3').verbose();
const url_database = '../sql-database/tea.db'
app.use( express.json() );


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


//Route to get all the teas
app.get('/get-teas', (req, res) => {
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let sql_command = 'SELECT t.* FROM tea t;';
  
  return new Promise( (resolve) => {
    db.all( sql_command, [], (err, row) => {resolve(row);})
  }).then( (row) => {
    db.close()
    return res.json({"data": row}); 
  }).catch( (err) => {
    db.close();
    return console.log(err);
  });

});

//Route to add a new tea (the api should receive a json with the data)
app.post('/add-new-tea', (req, res) => {
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let sql_command = 'INSERT INTO tea (tea_name, type, country, region) VALUES ((?), (?), (?), (?))';
  let data = req.body;

  return new Promise( (resolve) => {
    db.run(sql_command, [data['tea_name'], data['type'], data['country'], data['region']], (err, row)=>{ resolve(row); });
  }).then( (row) => {
      db.close();
      return res.json({});
  }).catch( (err)=> {
      db.close();
      return res.json({});
  });
});
