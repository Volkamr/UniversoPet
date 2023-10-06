create table Mascotas(
    idMascota INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    fechaNac DATE NOT NULL,
    peso INT NOT NULL,
    idTipoAnimal INT NOT NULL,
    idEstado INT NOT NULL,
    imagen LONGTEXT,
    FOREIGN KEY (idTipoAnimal) REFERENCES TipoAnimal(idTipoAnimal),
    FOREIGN KEY (idEstado) REFERENCES Estados(idEstado)
);