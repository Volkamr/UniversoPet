create table historialPersonal(
    FechaInic DATE NOT NULL,
    FechaFinal DATE,
    idSede INT NOT NULL,
    cedula BIGINT NOT NULL,
    FOREIGN KEY (idSede) REFERENCES Sedes(idSede),
    FOREIGN KEY (cedula) REFERENCES Personal(cedula),
    PRIMARY KEY (FechaInic, idSede, cedula)
);