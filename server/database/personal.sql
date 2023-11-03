create table
    Personal(
        cedula bigint PRIMARY KEY NOT NULL,
        password VARCHAR(100),
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        email VARCHAR (200) NOT NULL,
        profesion VARCHAR (600) NOT NULL,
        fotoPerfil LONGTEXT NULL,
        idTipoPersonal INT NOT NULL,
        idEstado INT NOT NULL,
        FOREIGN KEY (idTipoPersonal) REFERENCES TipoPersonal(idTipoPersonal),
        FOREIGN KEY (idEstado) REFERENCES Estados(idEstado)
    );

ALTER TABLE Personal MODIFY fotoPerfil LONGTEXT NULL;

insert into Personal (cedula, password, nombres, apellidos, email, profesion, fotoPerfil, idTipoPersonal, idEstado) values (123456789, 'pass', 'Cristiano', 'Ronaldo', 'cristiano@gmail.com', 'Veterinario Especializado',null, 1, 1);