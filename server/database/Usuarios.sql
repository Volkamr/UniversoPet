create table Usuarios(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fotoPerfil LONGTEXT,
    idEstado INT NOT NULL,
    celular BIGINT NOT NULL,
    edad INT NOT NULL,
    FOREIGN KEY (idEStado) REFERENCES Estados(idEstado) 
);