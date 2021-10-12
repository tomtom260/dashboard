import {
  collection,
  addDoc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import db from '../../firebase'
import { ServiceType } from '../reducers/services'

const addServiceToRedux = (dispatch: any, payload: any) => {
  dispatch({
    type: 'add-service',
    payload,
  })
}

export const addService =
  (payload: Omit<ServiceType, 'id'>) => async (dispatch: any) => {
    const newDoc = await addDoc(collection(db, 'services'), payload)
    addServiceToRedux(dispatch, {
      ...payload,
      id: newDoc.id,
    })
  }

export const editService =
  (payload: PartialK<ServiceType, 'id'>) => async (dispatch: any) => {
    const { id } = payload
    delete payload['id']
    await setDoc(doc(db, 'services', id!), payload, {
      merge: true,
    })

    editServiceFromRedux(dispatch, {
      ...payload,
      id: id!,
    })
  }

export const fetchServices = async (dispatch: any) => {
  const services: ServiceType[] = []
  const q = query(collection(db, 'services'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    services.push({
      id: doc.id,
      ...doc.data(),
    } as ServiceType)
  })
  dispatch({
    type: 'init-service',
    payload: services,
  })
}

const editServiceFromRedux = (dispatch: any, payload: ServiceType) => {
  dispatch({
    type: 'edit-service',
    payload,
  })
}

export const removeService =
  (payload: { id: string }) => async (dispatch: any) => {
    console.log('hello')
    await deleteDoc(doc(db, 'services', payload.id))
    removeServiceFromRedux(dispatch, payload)
  }

const removeServiceFromRedux = (dispatch: any, payload: { id: string }) => {
  dispatch({
    type: 'remove-service',
    payload,
  })
}

// Works like partial but for specfic keys in K

type PartialK<T, K extends PropertyKey = PropertyKey> = Partial<
  Pick<T, Extract<keyof T, K>>
> &
  Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never
