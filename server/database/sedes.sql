create table
    Sedes(
        idSede INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        img LONGTEXT NOT NULL,
        titulo VARCHAR(200) Not null,
        descripcion VARCHAR(200) not null,
        idCiudad INT not null,
        FOREIGN KEY (idCiudad) REFERENCES Ciudades(idCiudad)
    );