create table DiagnosticosxCita(
    idCita INT NOT NULL,
    idDiagnostico INT NOT NULL,
    PRIMARY KEY (idCita, idDiagnostico),
    FOREIGN KEY (idCita) REFERENCES Citas(idCita),
    FOREIGN KEY (idDiagnostico) REFERENCES Diagnosticos(idDiagnostico)
);