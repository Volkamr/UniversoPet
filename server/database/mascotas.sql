create table Mascotas(
    idMascota INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    fechaNac DATE NOT NULL,
    peso INT NOT NULL,
    idRaza INT NOT NULL,
    idEstado INT NOT NULL,
    imagen LONGTEXT,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idRaza) REFERENCES Razas(idRaza),
    FOREIGN KEY (idEstado) REFERENCES Estados(idEstado),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario)
);