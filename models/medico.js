const { Schema, model, SchemaTypes } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: false
    },
    subespecialidad: {
        type: String,
        required: false
    },
    img: {
        type: String,
        
    },
    usr: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    hospital: [{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }]

});

MedicoSchema.method('toJSON', function() {
    const { __v,  ...object} = this.toObject();

    return object;
})

module.exports = model('Medico', MedicoSchema);