import { query, collection, getDocs } from 'firebase/firestore'
import db from '../../firebase'
import { InquiriesType } from '../reducers/inquiries'

export const fetchInquiries = async (dispatch: any) => {
  const inquiries: InquiriesType[] = []
  const q = query(collection(db, 'inquiries'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    inquiries.push({
      id: doc.id,
      ...doc.data(),
    } as InquiriesType)
  })
  dispatch({
    type: 'init-inquiries',
    payload: inquiries,
  })
}
