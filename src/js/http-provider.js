/**
 * Status peticiones Http:
 * 200: Todo está bien
 * 201: El registro lo creo
 * 400: Los 400 son error en la petición 
 * 500: Problemas del servidor
 */


 const jokeUrl     = 'https://api.chucknorris.io/jokes/random';
 const urlUsuarios = 'https://reqres.in/api/users?page=2';

 // Cloudinary
 const cloudPreset = 'udemyJS';
 const cloudUrl    = 'https://api.cloudinary.com/v1_1/di8zh0ewr/upload';

 // fetch( jokeUrl ).then ( resp => {
 //     resp.json().then( ({ id, value }) =>{
 //         console.log(id);
 //         console.log(value);
 //     });
 // });
 
// fetch( jokeUrl )
//     .then( resp => resp.json())
//     .then( ({id, value}) => {
//         console.log(id, value)
//     });

const obtenerChiste = async () =>{

    try {
        const resp = await fetch( jokeUrl );
        if( !resp.ok ) throw 'No se puedo realizar la petición';

        const {icon_url, id, value } = await resp.json();

        return {icon_url, id, value };

    } catch ( err ) {
        
        throw err;

    }


}


const obtenerUsuarios = async ()=>{

    const resp = await fetch( urlUsuarios );
    const { data: usuarios } = await resp.json();
    
    return usuarios;

};

// archivoSubir :: File
const subirImagen = async ( archivoSubir ) =>{

    const fromData = new FormData();
    fromData.append( 'upload_preset', cloudPreset );
    fromData.append( 'file', archivoSubir );

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: fromData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
        
    } catch (err) {
        throw err;
    }

}

export{
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}