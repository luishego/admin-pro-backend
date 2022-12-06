const fs = require('fs');
const { Usuario, Medico, Hospital} = require('../models/index');

const borrarImagen = ( path ) => {
    if( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    let pathViejo = `./archivos/${tipo}/`;
    switch( tipo ){
        case 'medicos':

            const medico = await Medico.findById( id );
            if( !medico ){
                console.log('No existe el id del medico');
                return false;
            }
            borrarImagen( `${ pathViejo }${ medico.img }` );
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':

            const hospital = await Hospital.findById( id );
            if( !hospital ){
                console.log('No existe el id del hospital');
                return false;
            }
            borrarImagen( `${ pathViejo }${ hospital.img }` );
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            
            const usuario = await Usuario.findById( id );
            if( !usuario ){
                console.log('No existe el id del usuario');
                return false;
            }
            borrarImagen(`${ pathViejo }${ usuario.img }` );
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    };
};


module.exports = {
    actualizarImagen
};