import React,{useReducer} from 'react'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase'
import { OBTENER_PRODUCTOS_EXITO } from '../../types'

import _ from 'lodash'

const FirebaseState = ({children}) => {
    const initialState = {
        menu:[]
    }

    //use reducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)
    
    //funcion que se ejecuta para traer los productos
    const obtenerProductos = async () => {
        let productos = await firebase.obtenerProductos()
        productos = _.sortBy(productos, 'categoria')
        //console.log(productos)
        //tenemos resultados de la base de datos
        dispatch({
            type: OBTENER_PRODUCTOS_EXITO,
            payload: productos
        });
    }




    return(

        <FirebaseContext.Provider
            value={{
                menu:state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState