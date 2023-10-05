create table Citas(
    idCita INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    idServicio INT NOT NULL,
    idMascota INT NOT NULL,
    cedula BIGINT NOT NULL,
    idSede INT NOT NULL,
    idEStadoCita INT NOT NULL,
    FOREIGN KEY (idServicio) REFERENCES Servicios(idServicio),
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota),
    FOREIGN KEY (cedula) REFERENCES Personal(cedula),
    FOREIGN KEY (idEStadoCita) REFERENCES EstadosCitas(idEStadoCita),
    FOREIGN KEY(idSede) REFERENCES Sedes(idSede)
);