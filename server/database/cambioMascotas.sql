alter table Mascotas
ADD idUsuario INT NOT NULL;

alter table Mascotas
ADD CONSTRAINT idUsuario
FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario);