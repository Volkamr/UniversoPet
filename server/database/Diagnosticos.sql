create table Diagnosticos(
    idDiagnostico INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    descDIagnostico VARCHAR(2000) NOT NULL,
    comentario VARCHAR (2000) ,
    idCita INT NOT NULL,
    FOREIGN KEY (idCita) REFERENCES Citas(idCita)
);