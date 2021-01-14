//Import (require) connection.js into orm.js
const connection = require('./connection.js');

const printQuestionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };
  
  // Helper function to convert object key/value pairs to SQL syntax
  const objToSql = (ob) => {
    const arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // Check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(`${key}=${value}`);
      }
    }
  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

const orm = {
    //collects all the entries that are in the table
    selectAll(tableInput, cb){
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
          cb(result);
        });
    },
    //function that inserts an entry into the table
    insertOne(table, cols, vals, cb){
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, (err, result) =>{
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne(table, objColVals, condition, cb){
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) =>{
            if (err) {
                throw err;
            }
            cb(result);
        })
    }
}



//export the orm object
module.exports = orm;

