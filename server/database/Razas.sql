create table Razas (
    idRaza INT AUTO_INCREMENT PRIMARY KEY,
    raza varchar(30) NOT NULL,
    idTipoAnimal INT,
    FOREIGN KEY (idTipoAnimal) REFERENCES TipoAnimal(idTipoAnimal) 
);