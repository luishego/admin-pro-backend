const response = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizaImagen');

const subirImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    // Validar tipo de archivo
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msj: 'No es un tipo válido'

        })
    };
    // Validar que exista el archivo
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msj: 'No fué posible subir las imagenes'

        })
    };
    // Extraer archivo
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensinArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar Extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'jfif'];
    if( !extensionesValidas.includes(extensinArchivo) ) {
        return res.status(400).json({
            ok: false,
            msj: 'No es una extensión válida'

        })
    };

    //Generar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extensinArchivo}`

    //Path para guardar la imagen
 
    const path = `./archivos/${ tipo }/ ${ nombreArchivo }`;

    //Mover imagen
    file.mv( path, ( err ) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msj: 'error al mover la imagen'
            });
        }

        // Actualizar DB

        actualizarImagen( tipo, id, nombreArchivo );

        res.status(200).json({
            ok: true,
            msj: 'Archivo subido correctamente',
            nombreArchivo
        })

    } )



    

};

const getImage = ( req, res = response  ) => {
    const tipo = req.params.tipo;
    const image = req.params.img;Map
    const pathImg = path.join(__dirname, `../archivos/${ tipo }/${ image }`);
    
    if(fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    }
    else {
        res.sendFile(path.join(__dirname, `../archivos/no_img.png`));
    }

}


module.exports = {
    subirImagen,
    getImage
}