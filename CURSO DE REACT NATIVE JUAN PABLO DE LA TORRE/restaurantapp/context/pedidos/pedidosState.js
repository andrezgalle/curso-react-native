import React,{useReducer} from 'react'
import PedidosReducer from './pedidosReducer'
import PedidoContext from './pedidosContext'

import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from '../../types'

const PedidoState = ({children}) => {
    const initialState = {
        pedido:[],
        platillo: null,
        total:0,
        idpedido:''
    }

    //use reducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState)

    //selecciona el producto que el usuario desea ordenar
    const seleccionarPlatillo = platillo => {
        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //muestra el total a pagar
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //eliminar un articulo del carrito

    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }
    
    const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return(

        <PedidoContext.Provider
            value={{
                pedido:state.pedido,
                seleccionarPlatillo,
                platillo:state.platillo,
                guardarPedido,
                total:state.total,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado,
                idpedido:state.idpedido
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState