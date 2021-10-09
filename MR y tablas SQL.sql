/* 
Modelo Relacional:

Usuarios:
Usuario(rut, correo, password, nombreCompleto, descripcion, ubicacion, telefono, direccion, fechaNacimiento)
Administrador(rut)
Institucion(rut, totalFunc, totalPuestos, area)
Veterinario(rut, especialidad, rutInstitucion)
Dueño(rut, estado)

Otros:
Mascota(id, nombre, fechaNacimiento, especie, razaColor, sexo, esterilizado, tieneChip, desparasitado, estado, descripcion, razaColor, rutUsuario)
Control(id, fecha, peso, temperatura, vacuna, estado, observacion, rutVet, rutUsuario, idMascota)
fichaAdopcion(id, fecha, observacion, rutVet, rutUsuario, idMascota)
*/

create table usuario(
	rut varchar(12) not null primary key,
	correo text not null,
	password text not null,
	nombreCompleto text not null,
	descripcion text not null,
	ubicacion text not null,
	telefono int not null,
	direccion text not null,
	fechaNacimiento DATE not null
);

create table administrador(
	rut varchar(12) not null,
	primary key(rut),
	foreign key(rut) references usuario(rut)
);

create table institucion(
	rut varchar(12) primary key not null references usuario(rut),
	area text not null,
	totalFunc int not null,
	totalPuestos int not null
);

create table veterinario(
	rut varchar(12) primary key not null references usuario(rut),
	especialidad text not null,
	rutInstitucion varchar(12),
	foreign key(rutInstitucion) references institucion(rut)
	--[PUEDE SER NULL?]
);

create table dueño(
	rut varchar(12) primary key not null references usuario(rut),
	estado text not null
);

create table mascota(
	id text not null,
	nombre text not null,
	fechaNacimiento DATE not null,
	especie text not null,
	razaColor text not null,
	sexo text not null,
	esterilizado text not null,
	tieneChip text not null,
	desparasitado text not null,
	estado text not null,
	descripcion text not null,
	primary key(id),
	rutUsuario varchar(12) not null references institucion(rut)
);

create table controlMedico(
	id text not null,
	fecha DATE not null,
	peso float not null,
	temperatura float not null,
	vacuna text not null,
	estado text not null,
	observacion text not null,
	primary key(id),
	rutVet varchar(12) not null references veterinario(rut),
	rutUsuario varchar(12) not null references usuario(rut),
	idMascota text not null references mascota(id)
);

create table fichaAdopcion(
	id text not null,
	fecha DATE not null,
	observacion text not null,
	rutVet varchar(12) not null references veterinario(rut),
	rutUsuario varchar(12) not null references usuario(rut),
	idMascota text not null references mascota(id)
);
	

	