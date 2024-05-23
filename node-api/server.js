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
app.get('/get-all-teas', (req, res) => {
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let sql_command = 'SELECT t.* FROM tea t;';
  
  return new Promise( (resolve) => {
    db.all( sql_command, [], (err, row) => {resolve(row);})
  }).then( (row) => {
    db.close();
    return res.json({"data": row}); 
  }).catch( (err) => {
    db.close();
    return console.log(err);
  });
});


//Route to get a set of teas that with the filter
//For the moment only take one parameter to filter 
app.get('/get-tea', (req, res)=>{
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let data = req.body;
  let datalist = []

  let sql_command = 'SELECT t.* FROM tea t WHERE ';
  for( d in data ){
    sql_command += 't.'+ d +' = ?';
    datalist.push( data[d] );
  }
  sql_command += ';';

  return new Promise( (resolve) => {
    db.all( sql_command, datalist, (err, row) => {resolve(row);}) 
  }).then( (row) => {
    db.close();
    return res.json({"data": row});
  }).catch( (err) => {
    db.close();
    return console.log(err);
  });
});


//Route the get all the tea's data from an id send through url
//(caution with the db.all, probably a bottleneck with larger database)
app.get('/get-tea/:id', (req, res) =>{
  let id = req.params.id;
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let sql_command = 'SELECT t.* FROM tea t WHERE t.id = ?;';
  
  return new Promise( (resolve) => {
    db.all(sql_command, [id], (err, row) => { resolve(row); })
  }).then( (row) => {
    db.close();
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
    db.run(sql_command, [data['tea_name'], data['type'], data['country'], data['region']], (err, row) => { resolve(row); });
  }).then( (row) => {
      db.close();
      return res.json({});
  }).catch( (err)=> {
      db.close();
      return res.json({});
  });
});

//Update the information of a tea passing the id through the url
//(Caution, the string have some problems to manage more that one parameter change, the sql string should be changed)
app.put('/edit-tea/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });

  let setstring = '';
  let updatedata = [];
  for(d in data){
    setstring += d + ' = ? '; 
    updatedata.push( data[d] );
  }
  updatedata.push( id );
  let sql_command = 'UPDATE tea SET '+ setstring + 'WHERE id = ?'
  
  return new Promise( (resolve) => {
    db.run( sql_command, updatedata, (err, row) => { resolve(row); });
  }).then( (row) => {
    db.close();
    return res.json({});
  }).catch( (err)=>{
    db.close();
    return res.json();
  });
});


app.delete('/delete-tea/:id', (req, res) => {
  let id =req.params.id;
  let db = new sqlite3.Database(url_database, (err) => { if (err) { return console.error(err.message); } });
  let sql_command = 'DELETE FROM tea WHERE id = ?';

  return new Promise( (resolve) => {
    db.run( sql_command, [id], (err, row) => { resolve(row); } );
  }).then( (row) => {
    db.close();
    return res.json({});
  }).catch( (row) => {
    db.close();
    return res.json({});
  });
});
