import {initializeApp} from 'firebase/app'
import {collection, getDoc, getDocs, 
  getFirestore , query ,doc, where,setDoc ,deleteDoc, addDoc, orderBy} from 'firebase/firestore/lite'

  
//Auth
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgt5A5oNbtYGhZTm8GN0wFH27g5dMxo98",
  authDomain: "snapchat-clone-cef03.firebaseapp.com",
  databaseURL: "https://snapchat-clone-cef03-default-rtdb.firebaseio.com",
  projectId: "snapchat-clone-cef03",
  storageBucket: "snapchat-clone-cef03.appspot.com",
  messagingSenderId: "634748637390",
  appId: "1:634748637390:web:48f24f0b4c97774abe009f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const ref = collection(db , "vans")

async function fetch (){
    const dict = await getDocs(ref)
    return dict
}

const auth = getAuth();


async function fetchByFilter (searchparam , searchresult){
  const q = query(ref , where(searchparam ,"==",searchresult))
  const dict = await getDocs(q)
  console.log("dict" , dict)
  return dict
}

async function fetchById (mail,id){
  
  
  const docRef = doc(db, mail , id)
  const dict = await getDoc(docRef)

  return dict

}


async function signUp(email , password){
    const userobject =  await  createUserWithEmailAndPassword(auth, email, password)
    return userobject.user
  
}

async function signIn(email,password){
  const userObject =await signInWithEmailAndPassword(auth , email , password)
  return userObject.user
}

async function hostVansFetch(email){

      const hostref= collection(db , email )
      const sorted=query(hostref,orderBy("ordTime","desc"))
      const data = await getDocs(sorted)
      console.log(data)
      return data
}
async function hostVansupdate(mail ,data){
    const hostref = collection(db,mail)
    await addDoc(hostref ,data)
    return true
}
async function hostVanDel(mail , id){
  const hostref = doc(db,mail,id)
    await deleteDoc(hostref)
}



export {hostVanDel,fetch  , fetchByFilter ,hostVansFetch,hostVansupdate, fetchById , signUp ,signIn ,auth}
