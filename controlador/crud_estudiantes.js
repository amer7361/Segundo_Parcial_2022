import { conectar } from "../modelo/db_conectar.js";

var crud_estudiantes = ({});

crud_estudiantes.leer = function(req, res) {
    conectar.query('select id_estudiante,carne,nombres,apellidos,direccion,telefono,email,genero,date_format(fecha_nacimiento,"%Y-%m-%d") as fecha_nacimiento from estudiantes order by carne;', function(err, result) {
        if (err) {
            throw err;
        } else {
            res.render('estudiantes/index', {
                resultado: result
            });
        
}
});
}

crud_estudiantes.crud = function(req, res){
    const btn_agregar=req.body.btn_agregar;
    const btn_modificar=req.body.btn_modificar;
    const btn_eliminar=req.body.btn_eliminar;
    const id_estudiante=req.body.txt_id;
    const carne=req.body.txt_carne;
    const nombres=req.body.txt_nombres;
    const apellidos=req.body.txt_apellidos;
    const direccion=req.body.txt_direccion;
    const telefono=req.body.txt_telefono;
    var genero=req.body.txt_genero;
    if(genero==1){
        genero=true;
    }
    else{
        genero=false;
    }
    const email=req.body.txt_email;
    const fecha_nacimiento=req.body.txt_fecha_nacimiento;
    if (btn_agregar) {
        conectar.query('insert into estudiantes set ?',{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:email,fecha_nacimiento:fecha_nacimiento,genero:genero}, function(err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
    if (btn_modificar) {
        conectar.query('update estudiantes set ? where id_estudiante=?',[{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:email,fecha_nacimiento:fecha_nacimiento,genero:genero},id_estudiante], function(err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
    if (btn_eliminar) {
        conectar.query('delete from estudiantes where id_estudiante=?',id_estudiante, function(err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
}

export { crud_estudiantes };