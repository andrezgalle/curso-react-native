import {initializeApp} from 'firebase/app'
import firebaseConfig from './config';
import { getFirestore,collection, addDoc,query,orderBy, getDocs, where, getDoc,doc, updateDoc, deleteDoc, arrayUnion} from "firebase/firestore";
class Firebase {
    constructor(){
        const app = initializeApp(firebaseConfig)
        this.db = getFirestore(app);
    }

    async obtenerProductos(){
        const q = query(collection(this.db,'productos'),where('existencia','==',true))
        const querySnapshot = await getDocs(q);

        const platillos = querySnapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })

        return platillos;
    }

    async agregarPedido (pedido) {
        const pedidoState = await addDoc(collection(this.db,"ordenes",),pedido)
        return pedidoState
    }

    async obtenerOrden(id){
        const docRef = doc(this.db, "ordenes", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    }
}

const firebase = new Firebase()
export default firebase