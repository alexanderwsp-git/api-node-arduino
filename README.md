# api-node-arduino

`Api que permite insertar usuarios, elementos, y eventos en una base MySQL usando NODE.js`

Levantamos un contenedor con MySQL:

```docker
docker run --name ard-mysql -e MYSQL_ROOT_PASSWORD=secret-pswd -p 3306:3306 -p 33060:33060 -d mysql:latest
```

Entramos al contenedor y ejecutamos la creación de un nuevo usuario, con permisos de conexión:

```sh
CREATE USER 'awsp'@'localhost' IDENTIFIED BY 'secret-pwsd';
CREATE USER 'awsp'@'%' IDENTIFIED BY 'secret-pwsd';
ALTER USER 'awsp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret-pwsd';
ALTER USER 'awsp'@'%' IDENTIFIED WITH mysql_native_password BY 'secret-pwsd';
GRANT ALL PRIVILEGES on *.* to 'awsp'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES on *.* to 'awsp'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

    Comprobamos que nuestro contenedor MySQL se haya levantado correctamente y luego hacemos un `telnet`.  

```Luego de esto podemos conectarnos con nuestro cliente para MySQL favorito y ejecutar el archivo DB.SQL, que se encuentra dentro del dir ard-node/SQL.```

### Ahora debemos construir nuestra imagen, para levantar el proyecto en node.js

Entramos al dir `ard-node`, y ejecutamos lo siguiente:

```docker
docker build -t ard-node:1.0 .
docker run -it --rm --name ard-node1.0 -p 1080:3000 -v "$PWD":/usr/src/app -w /usr/src/app ard-node:1.0
```

Url para probar

```sh
curl -i -X POST -H "Content-Type: application/json" http://127.0.0.1:1080 --data '{"name" : "Alexander"}'
```

Descargar el app Insomnia para importar los request que estan dentro del dir `INSOMNIA/ard-request.json`.
