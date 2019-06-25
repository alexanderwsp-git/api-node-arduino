var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//CONF PARA CONEXION
var dbConn = mysql.createConnection({
    host: '192.168.1.117',
    user: 'awsp',
    password: 'L1nu*m4c',
    database: 'ARD_SENSOR'
});

//CONEXION A BASE
dbConn.connect();

//TEST
app.post('/', function (req, res) {
    return res.send({ error: false, status: 'OK', data: 'Welcome ' + req.body.name + '!. This means the app is working!! :)' })
});

// ***************** BLOQUE USUARIO *******************//
//OBTENER TODOS LOS USUARIOS
app.get('/user', function (req, res) {
    dbConn.query('SELECT * FROM USER', function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, data: results, message: 'Lista de usuarios.' });
    });
});

//OBTIENE UN USUARIO
app.get('/user/:id', function (req, res) {

    let user_id = req.params.id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Debe enviar un ID para buscar el usuario' });
    }

    dbConn.query('SELECT * FROM USER where id_user=?', user_id, function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, data: results[0], message: 'Usuario encontrado' });
    });

});

//AGREGA UN USUARIO 
app.post('/user', function (req, res) {
    let created = new Date();
    let username = req.body.username;
    let email = req.body.email;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let status = req.body.status;
    let createdBy = req.body.createdBy;
    let createdAt = created;
    let modifiedBy = null;
    let modifiedAt = null;

    if (!username) {
        return res.send({ error: true, message: 'username, no esta definido' });
    }
    if (!email) {
        return res.send({ error: true, message: 'email, no esta definido' });
    }
    if (!name) {
        return res.send({ error: true, message: 'name, no esta definido' });
    }
    if (!lastName) {
        return res.send({ error: true, message: 'lastName, no esta definido' });
    }
    if (!status) {
        return res.send({ error: true, message: 'status, no esta definido' });
    }
    if (!createdBy) {
        return res.send({ error: true, message: 'createdBy, no esta definido' });
    }

    let user = {
        username: req.body.username,
        email: email,
        name: name,
        last_name: lastName,
        status: status,
        created_by: createdBy,
        created_at: created,
        modified_by: null,
        modified_at: null
    };

    if (!user) {
        return res.status(400).send({ error: true, message: 'Debe enviar un usuario' });
    }

    dbConn.query("INSERT INTO USER SET ? ", user, function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Usuario ha sido creado' });
    });
});

//UTUALIZA USUARIO
app.put('/user', function (req, res) {

    let modified = new Date();
    let idUser = req.body.id;
    let username = req.body.username;
    let email = req.body.email;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let status = req.body.status;
    let modifiedBy = req.body.modifiedBy;
    let modifiedAt = modified;

    if (!idUser) {
        return res.send({ error: true, message: 'id, no esta definido' });
    }
    if (!username) {
        return res.send({ error: true, message: 'username, no esta definido' });
    }
    if (!email) {
        return res.send({ error: true, message: 'email, no esta definido' });
    }
    if (!name) {
        return res.send({ error: true, message: 'name, no esta definido' });
    }
    if (!lastName) {
        return res.send({ error: true, message: 'lastName, no esta definido' });
    }
    if (!status) {
        return res.send({ error: true, message: 'status, no esta definido' });
    }
    if (!modifiedBy) {
        return res.send({ error: true, message: 'modifiedBy, no esta definido' });
    }

    let user = {
        username: req.body.username,
        email: email,
        name: name,
        last_name: lastName,
        status: status,
        modified_by: modifiedBy,
        modified_at: modifiedAt
    };

    dbConn.query("UPDATE USER SET ? WHERE id_user = ?", [user, idUser], function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Usuario ha sido modificado' });
    });
});

//ELIMINA USUARIO
app.delete('/user', function (req, res) {

    let modified = new Date();
    let idUser = req.body.id;
    let status = 'Inactive';
    let modifiedBy = req.body.modifiedBy;
    let modifiedAt = modified;

    if (!idUser) {
        return res.send({ error: true, message: 'id, no esta definido' });
    }
    if (!status) {
        return res.send({ error: true, message: 'status, no esta definido' });
    }
    if (!modifiedBy) {
        return res.send({ error: true, message: 'modifiedBy, no esta definido' });
    }

    let user = {
        status: status,
        modified_by: modifiedBy,
        modified_at: modifiedAt
    };

    dbConn.query("UPDATE USER SET ? WHERE id_user = ?", [user, idUser], function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Usuario ha sido eliminado' });
    });
});

// ***************** BLOQUE ELEMENTO *******************//

//LISTA ELEMENTO
app.get('/element', function (req, res) {
    dbConn.query('SELECT * FROM ELEMENT', function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, data: results, message: 'Lista de elementos' });
    });
});

//ONTIENE UN ELEMENTO
app.get('/element/:id', function (req, res) {

    let elemento_id = req.params.id;

    if (!elemento_id) {
        return res.status(400).send({ error: true, message: 'Debe enviar un ID para buscar el elemento' });
    }

    dbConn.query('SELECT * FROM ELEMENT where id_element=?', elemento_id, function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, data: results[0], message: 'Elemento encontrado' });
    });

});

//AGREGAR ELEMENTO
app.post('/element', function (req, res) {
    let created = new Date();
    let name = req.body.name;
    let color = req.body.color;
    let description = req.body.description;
    let nomenclatura = req.body.nomenclatura;
    let periodicNumber = req.body.periodicNumber;
    let value = req.body.value;
    let init = req.body.init;
    let end = req.body.end;
    let limit = req.body.limit;
    let notify = req.body.notify;
    let status = req.body.status;
    let createdBy = req.body.createdBy;
    let createdAt = created;
    let modifiedBy = null;
    let modifiedAt = null;

    if (!name) {
        return res.send({ error: true, message: 'name, no esta definido' });
    }
    if (!color) {
        return res.send({ error: true, message: 'color, no esta definido' });
    }
    if (!description) {
        return res.send({ error: true, message: 'description, no esta definido' });
    }
    if (!nomenclatura) {
        return res.send({ error: true, message: 'nomenclatura, no esta definido' });
    }
    if (!periodicNumber) {
        return res.send({ error: true, message: 'periodicNumber, no esta definido' });
    }
    if (!value) {
        return res.send({ error: true, message: 'value, no esta definido' });
    }
    if (!init) {
        return res.send({ error: true, message: 'init, no esta definido' });
    }
    if (!end) {
        return res.send({ error: true, message: 'end, no esta definido' });
    }
    if (!limit) {
        return res.send({ error: true, message: 'limit, no esta definido' });
    }
    if (!notify) {
        return res.send({ error: true, message: 'notify, no esta definido' });
    }
    if (!status) {
        return res.send({ error: true, message: 'status, no esta definido' });
    }
    if (!createdBy) {
        return res.send({ error: true, message: 'createdBy, no esta definido' });
    }

    let element = {
        name: name,
        color: color,
        description: description,
        nomenclatura: nomenclatura,
        periodic_number: periodicNumber,
        value: value,
        init: init,
        end: end,
        limit: limit,
        notify: notify,
        status: status,
        created_by: createdBy,
        created_at: created,
        modified_by: null,
        modified_at: null
    };

    if (!element) {
        return res.status(400).send({ error: true, message: 'Debe enviar un elemento' });
    }

    dbConn.query("INSERT INTO ELEMENT SET ? ", element, function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Elemento ha sido creado' });
    });
});

//ACTUALIZA ELEMENTO
app.put('/element', function (req, res) {
    let modified = new Date();
    let idElement = req.body.id;
    let name = req.body.name;
    let color = req.body.color;
    let description = req.body.description;
    let nomenclatura = req.body.nomenclatura;
    let periodicNumber = req.body.periodicNumber;
    let value = req.body.value;
    let init = req.body.init;
    let end = req.body.end;
    let limit = req.body.limit;
    let notify = req.body.notify;
    let status = req.body.status;
    let modifiedBy = req.body.modifiedBy;
    let modifiedAt = modified;

    if (!idElement) {
        return res.send({ error: true, message: 'idElement, no esta definido' });
    }
    if (!name) {
        return res.send({ error: true, message: 'name, no esta definido' });
    }
    if (!color) {
        return res.send({ error: true, message: 'color, no esta definido' });
    }
    if (!description) {
        return res.send({ error: true, message: 'description, no esta definido' });
    }
    if (!nomenclatura) {
        return res.send({ error: true, message: 'nomenclatura, no esta definido' });
    }
    if (!periodicNumber) {
        return res.send({ error: true, message: 'periodicNumber, no esta definido' });
    }
    if (!value) {
        return res.send({ error: true, message: 'value, no esta definido' });
    }
    if (!init) {
        return res.send({ error: true, message: 'init, no esta definido' });
    }
    if (!end) {
        return res.send({ error: true, message: 'end, no esta definido' });
    }
    if (!limit) {
        return res.send({ error: true, message: 'limit, no esta definido' });
    }
    if (!notify) {
        return res.send({ error: true, message: 'notify, no esta definido' });
    }
    if (!status) {
        return res.send({ error: true, message: 'status, no esta definido' });
    }
    if (!modifiedBy) {
        return res.send({ error: true, message: 'modifiedBy, no esta definido' });
    }

    let element = {
        name: name,
        color: color,
        description: description,
        nomenclatura: nomenclatura,
        periodic_number: periodicNumber,
        value: value,
        init: init,
        end: end,
        limit: limit,
        notify: notify,
        status: status,
        modified_by: modifiedBy,
        modified_at: modified
    };

    if (!element) {
        return res.status(400).send({ error: true, message: 'Debe enviar un elemento' });
    }

    dbConn.query("UPDATE ELEMENT SET ? WHERE id_element = ?", [element, idElement], function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Elemento ha sido actualizado' });
    });
});

//ELIMINA ELEMENTO
app.delete('/element', function (req, res) {
    let modified = new Date();
    let idElement = req.body.id;
    let status = 'Inactive';
    let modifiedBy = req.body.modifiedBy;
    let modifiedAt = modified;

    if (!idElement) {
        return res.send({ error: true, message: 'idElement, no esta definido' });
    }
    if (!modifiedBy) {
        return res.send({ error: true, message: 'modifiedBy, no esta definido' });
    }

    let element = {
        status: status,
        modified_by: modifiedBy,
        modified_at: modified
    };

    if (!element) {
        return res.status(400).send({ error: true, message: 'Debe enviar un elemento' });
    }

    dbConn.query("UPDATE ELEMENT SET ? WHERE id_element = ?", [element, idElement], function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Elemento ha sido creado' });
    });
});

// *************** ELEMENTO EVENTO *****************

//OBTENER TODOS LOS EVENTOS
app.get('/element_event', function (req, res) {
    dbConn.query('SELECT * FROM ELEMENT_EVENT', function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, data: results, message: 'Lista de eventos.' });
    });
});

//AGREGAR ELEMENTO
app.post('/element_event', function (req, res) {
    let created = new Date();
    let elemento = req.body.elemento;
    let value = req.body.value;
    let createdBy = req.body.createdBy;
    let createdAt = created;

    if (!elemento) {
        return res.send({ error: true, message: 'elemento, no esta definido' });
    }
    if (!value) {
        return res.send({ error: true, message: 'value, no esta definido' });
    }
    if (!createdBy) {
        return res.send({ error: true, message: 'createdBy, no esta definido' });
    }
    let elementEvento = {
        element_id: elemento,
        value: value,
        created_by: createdBy,
        created_at: created
    };

    if (!elementEvento) {
        return res.status(400).send({ error: true, message: 'Debe enviar un elemento evento' });
    }

    dbConn.query("INSERT INTO ELEMENT_EVENT SET ? ", elementEvento, function (error, results, fields) {
        if (error) {
            return res.send({ error: error });
        }
        return res.send({ error: false, result: results, data: fields, message: 'Elemento ha sido creado' });
    });
});

//SETEA PORT
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;