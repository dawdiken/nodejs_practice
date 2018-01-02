var mysql = require('mysql');

var studentDAO={
    sqlGetAll: "select * from students;",
    sqlFindById: "select * from students where userID = ?;",
    sqlInsert: "insert into students (userID, fisrtName) values (?,?);",
    sqlUpdate: "update students set ? where userID = ?;",
    sqlDelete: "delete from students where userID =?;",
    // note that these methods are all the same except the sql and the data
    // in studentDAO2 we simplify that
    getAll:function(callback) {
        var con = getConnection(); // we need a different connection for each
        con.connect(function (err) {
            if (err) throw err;
            var data = [];
            con.query(studentDAO.sqlGetAll,[] ,function (err, result) {
                handleErrorandLog(err,"getAll",result);
                 if(callback)callback(result);
            });
        });
    },
    findById:function(id,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [id];
            con.query(studentDAO.sqlFindById,data, function (err, result) {
                handleErrorandLog(err,"findById",result)
                if(callback)callback(result);
            });
        });
    },
    insert:function(student,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [student.id, student.name];
            con.query(studentDAO.sqlInsert,data, function (err, result) {
                handleErrorandLog(err,"Insert",result);
                if(callback)callback(result);
            });
        });
    },
    update:function(student,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [student, student.id];
            con.query(studentDAO.sqlUpdate,data, function (err, result) {
                handleErrorandLog(err,"Update",result);
                if(callback)callback(result);
            });
        });
    },
    delete:function(id,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [id];
            con.query(studentDAO.sqlDelete,data, function (err, result) {
                handleErrorandLog(err,"Delete",result);
                if(callback)callback(result);
            });
        });
    }


    // the others are the same
}

function getConnection(){
    return  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'softdev3',
    });
}

function handleErrorandLog(err, name, result){
    if(err){
        console.log(err.sql);
        throw err;
    }
    console.log(name+": " + JSON.stringify(result));

}


module.exports= studentDAO;