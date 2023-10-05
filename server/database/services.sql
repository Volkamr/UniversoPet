create table
    Servicios (
        idServicio INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(40) NOT NULL,
        idName VARCHAR(40) NOT NULL,
        descripcion VARCHAR(900) NOT NULL,
        imgVista TEXT(300000) NOT NULL,
        imgServicio TEXT(300000) NOT NULL
    );