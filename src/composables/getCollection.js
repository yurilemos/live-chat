import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)
    console.log('colection:',collection)
    
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')
        
    console.log('colectionRef:',collectionRef)

    collectionRef.onSnapshot((snap) => {
        console.log('snap:',snap)
        let results = []
        snap.docs.forEach(doc => {
            console.log('doc:',doc)
            doc.data().createdAt && results.push({...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    return { error, documents }
}

export default getCollection