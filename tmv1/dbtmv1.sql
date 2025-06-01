-- Tabla de Roles (para diferenciar entre tipos de usuarios)
CREATE TABLE Roles
(
    RolID INT PRIMARY KEY IDENTITY(1,1),
    NombreRol VARCHAR(50) NOT NULL
    -- Ejemplo: 'Piloto', 'Guardia', 'Operador' , 'Administrador', 'Usuario'
);

-- Tabla de Estados (para manejar los estados de usuario y otros objetos)
CREATE TABLE Estados
(
    EstadoID INT PRIMARY KEY IDENTITY(1,1),
    NombreEstado VARCHAR(20) NOT NULL
    -- Ejemplo: 'Activo', 'Inactivo', 'En Progreso'
);

-- Tabla de Usuarios (para gestionar credenciales de login)
CREATE TABLE Usuarios
(
    UsuarioID INT PRIMARY KEY IDENTITY(1,1),
    NombreA VARCHAR(100) NOT NULL,
    -- Nombres y Apellidos del usuario.
    Usuario VARCHAR(100) NOT NULL,
    -- Nombre de usuario para login (correo electrónico, username, etc.)
    Contrasena VARCHAR(255) NOT NULL,
    -- Contraseña almacenada de forma segura (encriptada)
    RolID INT NOT NULL,
    -- Relaciona el rol del usuario (Piloto, Guardia, etc.) - editado falta el default
    EstadoID INT NOT NULL,
    -- Estado del usuario (Activo, Inactivo, etc.)
    FechaCreacion DATETIME DEFAULT GETDATE(),
    -- Fecha de creación de la cuenta
    FOREIGN KEY (RolID) REFERENCES Roles(RolID),
    FOREIGN KEY (EstadoID) REFERENCES Estados(EstadoID)
);

-- Tabla de Intentos de Login (para rastrear intentos fallidos y seguridad)
CREATE TABLE IntentosLogin
(
    IntentoID INT PRIMARY KEY IDENTITY(1,1),
    UsuarioID INT NOT NULL,
    -- Usuario que intenta logearse
    FechaIntento DATETIME DEFAULT GETDATE(),
    Exitoso BIT,
    -- Indica si el intento fue exitoso (1) o fallido (0)
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Municipalidades
CREATE TABLE Municipalidades
(
    MunicipalidadID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Region VARCHAR(50) NOT NULL,
    Telefono VARCHAR(20),
    Email VARCHAR(100)
);

-- Tabla de Lineas de Transporte
CREATE TABLE Lineas
(
    LineaID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    MunicipalidadID INT NOT NULL,
    MapaURL VARCHAR(500) NULL,
    DistanciaTotal DECIMAL(10,2) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (MunicipalidadID) REFERENCES Municipalidades(MunicipalidadID)
);

-- Tabla de Estaciones
CREATE TABLE Estaciones
(
    EstacionID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    MunicipalidadID INT NOT NULL,
    Ubicacion VARCHAR(200) NOT NULL,
    CapacidadEstimada INT NULL,
    Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (MunicipalidadID) REFERENCES Municipalidades(MunicipalidadID)
);

-- Tabla de Relación Linea - Estación
CREATE TABLE LineasEstaciones
(
    LineaID INT,
    EstacionID INT,
    OrdenEstacion INT NOT NULL,
    DistanciaAnterior DECIMAL(10,2),
    PRIMARY KEY (LineaID, EstacionID),
    FOREIGN KEY (LineaID) REFERENCES Lineas(LineaID),
    FOREIGN KEY (EstacionID) REFERENCES Estaciones(EstacionID)
);

-- Tabla de Accesos
CREATE TABLE Accesos
(
    AccesoID INT PRIMARY KEY IDENTITY(1,1),
    EstacionID INT NOT NULL,
    Descripcion VARCHAR(200) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (EstacionID) REFERENCES Estaciones(EstacionID)
);

-- Tabla de Parqueos
CREATE TABLE Parqueos
(
    ParqueoID INT PRIMARY KEY IDENTITY(1,1),
    EstacionID INT NOT NULL,
    Capacidad INT NOT NULL,
    Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (EstacionID) REFERENCES Estaciones(EstacionID)
);

-- Tabla de Buses
CREATE TABLE Buses
(
    BusID INT PRIMARY KEY IDENTITY(1,1),
    LineaID INT NOT NULL,
    ParqueoID INT NOT NULL,
    Placa VARCHAR(20) UNIQUE NOT NULL,
    CapacidadMaxima INT NOT NULL,
    Estado VARCHAR(20) DEFAULT 'Activo',
    FOREIGN KEY (LineaID) REFERENCES Lineas(LineaID),
    FOREIGN KEY (ParqueoID) REFERENCES Parqueos(ParqueoID)
);

-- Tabla de Pilotos
CREATE TABLE Pilotos
(
    PilotoID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    DPI VARCHAR(20) UNIQUE NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(100),
    Estado VARCHAR(20) DEFAULT 'Activo',
    FechaContratacion DATE NOT NULL,
    LicenciaTipo VARCHAR(20) NOT NULL,
    FechaVencimientoLicencia DATE NOT NULL
);

-- Tabla de Historial Educativo
CREATE TABLE HistorialEducativo
(
    HistorialID INT PRIMARY KEY IDENTITY(1,1),
    PilotoID INT NOT NULL,
    NivelEducativo VARCHAR(100) NOT NULL,
    Institucion VARCHAR(200) NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE,
    Certificacion VARCHAR(200),
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Tabla de Asignación de Pilotos a Buses
CREATE TABLE AsignacionPilotos
(
    AsignacionID INT PRIMARY KEY IDENTITY(1,1),
    BusID INT NOT NULL,
    PilotoID INT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE,
    Turno VARCHAR(20) NOT NULL,
    FOREIGN KEY (BusID) REFERENCES Buses(BusID),
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Tabla de Guardias
CREATE TABLE Guardias
(
    GuardiaID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    DPI VARCHAR(20) UNIQUE NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(100),
    Estado VARCHAR(20) DEFAULT 'Activo',
    -- Asignacion si aun sigue contratado no forma parte del catalogo estados
    FechaContratacion DATE NOT NULL,
    RolID INT,
    -- Referencia al catálogo de roles
    FOREIGN KEY (RolID) REFERENCES Roles(RolID)
);

-- Tabla de Asignación de Guardias a Accesos
CREATE TABLE AsignacionGuardias
(
    AsignacionID INT PRIMARY KEY IDENTITY(1,1),
    AccesoID INT NOT NULL,
    GuardiaID INT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE,
    Turno VARCHAR(20) NOT NULL,
    EstadoID INT,
    -- Referencia al catálogo de estados
    FOREIGN KEY (AccesoID) REFERENCES Accesos(AccesoID),
    FOREIGN KEY (GuardiaID) REFERENCES Guardias(GuardiaID),
    FOREIGN KEY (EstadoID) REFERENCES Estados(EstadoID)
);

-- Tabla de Operadores
CREATE TABLE Operadores
(
    OperadorID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    DPI VARCHAR(20) UNIQUE NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(100),
    Estado VARCHAR(20) DEFAULT 'Activo',
    FechaContratacion DATE NOT NULL,
    RolID INT,
    -- Referencia al catálogo de roles
    FOREIGN KEY (RolID) REFERENCES Roles(RolID)
);

-- Tabla de Asignación de Operadores a Estaciones
CREATE TABLE AsignacionOperadores
(
    AsignacionID INT PRIMARY KEY IDENTITY(1,1),
    EstacionID INT NOT NULL,
    OperadorID INT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE,
    Turno VARCHAR(20) NOT NULL,
    EstadoID INT,
    -- Referencia al catálogo de estados
    FOREIGN KEY (EstacionID) REFERENCES Estaciones(EstacionID),
    FOREIGN KEY (OperadorID) REFERENCES Operadores(OperadorID),
    FOREIGN KEY (EstadoID) REFERENCES Estados(EstadoID)
);

-- Tabla de Registro de Viajes
CREATE TABLE RegistroViajes
(
    ViajeID INT PRIMARY KEY IDENTITY(1,1),
    BusID INT NOT NULL,
    EstacionOrigenID INT NOT NULL,
    EstacionDestinoID INT NOT NULL,
    FechaHoraSalida DATETIME NOT NULL,
    FechaHoraLlegada DATETIME,
    CantidadPasajeros INT NOT NULL,
    Estado VARCHAR(20) DEFAULT 'En Progreso',
    FOREIGN KEY (BusID) REFERENCES Buses(BusID),
    FOREIGN KEY (EstacionOrigenID) REFERENCES Estaciones(EstacionID),
    FOREIGN KEY (EstacionDestinoID) REFERENCES Estaciones(EstacionID)
);

-- Tabla de Alertas
CREATE TABLE Alertas
(
    AlertaID INT PRIMARY KEY IDENTITY(1,1),
    TipoAlerta VARCHAR(50) NOT NULL,
    EstacionID INT NULL,
    BusID INT NULL,
    FechaHora DATETIME NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'Activa',
    FOREIGN KEY (EstacionID) REFERENCES Estaciones(EstacionID),
    FOREIGN KEY (BusID) REFERENCES Buses(BusID)
);
CREATE TABLE ViajesUsuario
(
    ViajeUsuarioID INT PRIMARY KEY IDENTITY(1,1),
    UsuarioID INT NOT NULL,
    EstacionOrigenID INT NOT NULL,
    EstacionDestinoID INT NOT NULL,
    FechaViaje DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (EstacionOrigenID) REFERENCES Estaciones(EstacionID),
    FOREIGN KEY (EstacionDestinoID) REFERENCES Estaciones(EstacionID)
);
