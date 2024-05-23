# Tea Api
The Api use as basis *NodeJs* and *Express*, the SQLite3 database is in the *sql-database*.
To execute the api locally, use *npm start* or the dockerfile (soon).


### Get routes
1. */get-all-teas* return all the teas available in the database.
2. */get-tea* return the teas under some conditions sended as a json.
3. */get-tea/:id* return the data from the tea with the id inserted in the url.

### Post routes
1. */add-new-tea* route that allow to add a new tea in the database, the expected object new to have *{"tea_name": "", "type": "", "country": "", "region": ""}*

### Update routes
1. */edit-tea/:id* route that allow the data from the tea with the id from the url, all the changes are receive as a json.

### Delete routes
1. */delete-tea/:id* route to delete a tea from the database that match with the id from the url.
