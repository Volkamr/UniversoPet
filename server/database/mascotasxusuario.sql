create table MascotasxUsuario(
    idUsuario INT,
    idMascota INT,
    PRIMARY KEY (idMascota, idUsuario),
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
);