import React,{useContext, useEffect} from 'react'
import { StyleSheet,ScrollView } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import { Container,Box,Text,List,FlatList,Thumbnail,ListItem,SectionList,Flex,Image, View, Pressable } from 'native-base'
import GlobalStyles from '../styles/global'
import PedidoContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {

  //react navigation
  const navigate = useNavigation()

  //Context de Firebase
  const {menu,obtenerProductos} = useContext(FirebaseContext)
  const {seleccionarPlatillo} = useContext(PedidoContext)
  useEffect(()=> {
    obtenerProductos()
  },[])

  const mostrarHeading = (categoria , i) => {
    if(i > 0){
      const categoriaAnterior = menu[i-1].categoria
      if(categoriaAnterior !== categoria){
        return (
          <Text 
            style={{paddingVertical:10,fontWeight:'bold', backgroundColor:'#000',color:'#ffda00'}}
          >{categoria}
          </Text>
      )
      }
    } else{
      return (
        <Text 
        style={{paddingVertical:10,fontWeight:'bold', backgroundColor:'#000',color:'#ffda00'}}
        >{categoria}
        </Text>
      )
    }
  }

  return (
    <Box style={[GlobalStyles.contenedor,{backgroundColor:'#000'}]}>
      <View style={{backgroundColor:'#fff',marginHorizontal:'2.5%' , marginTop:10}}>
        <ScrollView>
          {menu.map( (item,i) =>{
            const {imagen, nombre, descripcion, categoria, id, precio} = item

            return(
              <View key={id}>
                {mostrarHeading(categoria,i)}
                <List padding={2}>
                  <Pressable onPress={()=> {

                    //eliminar algunas propiedades
                    const {existencia, ...platillo2} = item
                    seleccionarPlatillo(platillo2)
                    navigate.navigate("DetallePlatillo")
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center',gap:25}}>
                      <Image size={100} borderRadius={100} source={{
                            uri: imagen}} 
                      />
                      <View style={{flex:1}}>
                        <Text style={{fontWeight:'bold'}}>{nombre}</Text>
                        <Text numberOfLines={3}>{descripcion}</Text>
                        <Text style={{fontWeight:'bold'}}>Precio: $ {precio}</Text>
                      </View>
                    </View>
                  </Pressable>
                </List>
              </View>
            )

          })}
        </ScrollView>
      </View>
    </Box>
  )
}

export default Menu