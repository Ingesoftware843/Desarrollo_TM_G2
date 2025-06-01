-- Insertar Roles
SET IDENTITY_INSERT Roles ON;
INSERT INTO Roles (RolID, NombreRol) VALUES
(1, 'Piloto'),
(2, 'Guardia'),
(3, 'Operador'),
(4, 'Administrador'),
(5, 'Usuario');
SET IDENTITY_INSERT Roles OFF;
GO

-- Insertar Estados
SET IDENTITY_INSERT Estados ON;
INSERT INTO Estados (EstadoID, NombreEstado) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'En Progreso');
SET IDENTITY_INSERT Estados OFF;
GO

-- Insertar Municipalidades
INSERT INTO Municipalidades (Nombre, Region, Telefono, Email) VALUES
('Ciudad Central', 'Región Metropolitana', '50212345678', 'central@municipio.gt'),
('Villa Nueva', 'Región I',         '50223456789', 'villanueva@muni.gt'),
('Chimaltenango', 'Región VII',     '50234567890', 'chimalteca@muni.gt');
GO

-- Insertar Líneas de Transporte
INSERT INTO Lineas (Nombre, MunicipalidadID, MapaURL, DistanciaTotal) VALUES
('Línea Azul',  1, 'http://mapas.gt/linea_azul',  10.50),
('Línea Verde', 1, 'http://mapas.gt/linea_verde', 15.75),
('Línea Roja',  2, 'http://mapas.gt/linea_roja',  12.00);
GO

-- Insertar Estaciones
INSERT INTO Estaciones (Nombre, MunicipalidadID, Ubicacion,CapacidadEstimada) VALUES
('Estación Central', 1, 'Av. Siempre Viva 123',100),
('Estación Norte',   1, 'Calle 10, Zona 5',150),
('Estación Este',    2, 'Km 8 Carretera a El Salvador',120),
('Estación Sur',     2, 'Entrada principal de Villa Nueva',75);
GO

-- Relación Línea–Estación (orden y distancia acumulada)
INSERT INTO LineasEstaciones (LineaID, EstacionID, OrdenEstacion, DistanciaAnterior) VALUES
(1, 1, 1, 0.00),
(1, 2, 2, 5.25),
(2, 1, 1, 0.00),
(2, 3, 2, 6.00),
(3, 4, 1, 0.00);
GO

-- Insertar Accesos
INSERT INTO Accesos (EstacionID, Descripcion) VALUES
(1, 'Puerta A - Salida Principal'),
(1, 'Puerta B - Entrada Secundaria'),
(2, 'Pasillo Zona Norte'),
(3, 'Acceso VIP');
GO

-- Insertar Parqueos
INSERT INTO Parqueos (EstacionID, Capacidad) VALUES
(1, 50),
(2, 30),
(3, 20);
GO

-- Insertar Buses
INSERT INTO Buses (LineaID, ParqueoID, Placa, CapacidadMaxima) VALUES
(1, 1, 'P-123-ABC', 40),
(1, 1, 'P-456-DEF', 45),
(2, 2, 'P-789-GHI', 35);
GO

-- Insertar Pilotos
INSERT INTO Pilotos (Nombre, DPI, Direccion, Telefono, Email, FechaContratacion, LicenciaTipo, FechaVencimientoLicencia) VALUES
('Carlos López', '2356789012345', 'Rinconada 45, Zona 1', '50255551234', 'carlos.lopez@transporte.gt', '2020-06-15', 'B', '2025-06-14'),
('Ana Gómez',    '4567890123456', 'Col. Las Flores 12, Zona 3', '50255552345', 'ana.gomez@transporte.gt',    '2021-03-10', 'C', '2026-03-09');
GO

-- Insertar Historial Educativo
INSERT INTO HistorialEducativo (PilotoID, NivelEducativo, Institucion, FechaInicio, FechaFin, Certificacion) VALUES
(1, 'Licenciatura en Transporte', 'Universidad del Transporte',      '2015-01-10', '2019-12-15', 'Certificado de Conducción Segura'),
(2, 'Técnico en Mantenimiento',  'Instituto Técnico Nacional',        '2016-02-01', '2018-11-20', 'Certificado Mecánico Básico');
GO

-- Asignar Pilotos a Buses
INSERT INTO AsignacionPilotos (BusID, PilotoID, FechaInicio, Turno) VALUES
(1, 1, '2025-05-01', 'Mañana'),
(2, 2, '2025-05-10', 'Tarde');
GO

-- Insertar Guardias
INSERT INTO Guardias (Nombre, DPI, Direccion, Telefono, Email, FechaContratacion, RolID) VALUES
('Luis Martínez', '5678901234567', 'Las Palmas 5, Zona 2', '50255553456', 'luis.martinez@seguridad.gt', '2019-09-01', 2),
('María Ruiz',    '6789012345678', 'Col. El Bosque 23, Zona 4','50255554567','maria.ruiz@seguridad.gt',    '2022-01-20', 2);
GO

-- Asignar Guardias a Accesos
INSERT INTO AsignacionGuardias (AccesoID, GuardiaID, FechaInicio, Turno, EstadoID) VALUES
(1, 1, '2025-05-05', 'Noche', 1),
(2, 2, '2025-05-12', 'Mañana', 1);
GO

-- Insertar Operadores
INSERT INTO Operadores (Nombre, DPI, Direccion, Telefono, Email, FechaContratacion, RolID) VALUES
('José Pérez', '7890123456789', 'Calle Real 77', '50255555678', 'jose.perez@operadores.gt', '2018-07-15', 3);
GO

-- Asignar Operadores a Estaciones
INSERT INTO AsignacionOperadores (EstacionID, OperadorID, FechaInicio, Turno, EstadoID) VALUES
(1, 1, '2025-05-01', 'Mañana', 1);
GO

-- Insertar Usuarios
INSERT INTO Usuarios (NombreA, Usuario, Contrasena, RolID, EstadoID) VALUES
('Juan Pérez', 'jperez', 'hashed_pwd_juan',  5, 1),
('Laura Díaz','ldiaz',  'hashed_pwd_laura', 4, 1);
GO

-- Registrar Intentos de Login
INSERT INTO IntentosLogin (UsuarioID, Exitoso) VALUES
(1, 0),
(1, 0),
(1, 1),
(2, 1);
GO

-- Registrar Viajes
INSERT INTO RegistroViajes (
    BusID, EstacionOrigenID, EstacionDestinoID, FechaHoraSalida, CantidadPasajeros
) VALUES
(1, 1, 2, CONVERT(datetime, '2025-05-20 08:00:00', 120), 30),
(2, 2, 3, CONVERT(datetime, '2025-05-21 14:30:00', 120), 40);

GO

-- Crear Alertas
INSERT INTO Alertas (TipoAlerta, EstacionID, BusID, FechaHora, Descripcion) VALUES
('Retraso', 1, 1, CONVERT(datetime, '2025-05-20 08:45:00', 120), 'El bus tiene un retraso de 15 minutos'),
('Mantenimiento', 2, 2, CONVERT(datetime, '2025-05-22 10:00:00', 120), 'Revisión técnica programada');

GO
