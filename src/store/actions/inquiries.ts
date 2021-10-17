import { User } from '@firebase/auth'
import { query, collection, getDocs, setDoc, doc } from 'firebase/firestore'
import db from '../../firebase'
import { InquiriesType } from '../reducers/inquiries'

export const fetchInquiries =
  (
    user: User,
    incCountInquiries: () => void,
    toggleLoadingState: (value: boolean) => void
  ) =>
  async (dispatch: any) => {
    const inquiries: InquiriesType[] = []
    toggleLoadingState(true)
    const q = query(collection(db, 'inquiries'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: any) => {
      const data = doc.data()
      if (user) if (!data.seen.includes(user.displayName)) incCountInquiries()
      inquiries.push({
        id: doc.id,
        ...data,
      } as InquiriesType)
    })
    inquiries.sort((inq1, inq2) => inq2.date - inq1.date)
    dispatch({
      type: 'init-inquiries',
      payload: inquiries,
    })
    toggleLoadingState(false)
  }

export const toggleInquirySeen =
  (
    id: string,
    seen: string[],
    userFullName: string,
    decCountInquiries: () => void
  ) =>
  async (dispatch: any) => {
    decCountInquiries()
    seen.push(userFullName)
    await setDoc(
      doc(db, 'inquiries', id),
      {
        seen,
      },
      { merge: true }
    ).then(() => {
      toggleSeenInquiryRedux({ userFullName, id }, dispatch)
    })
  }

export const updateHandledBy =
  (id: string, userFullName: string) => async (dispatch: any) => {
    await setDoc(
      doc(db, 'inquiries', id),
      {
        handledBy: userFullName,
      },
      { merge: true }
    ).then(() => {
      updateHandledByRedux({ userFullName, id }, dispatch)
    })
  }

const toggleSeenInquiryRedux = (
  { id, userFullName }: { userFullName: string; id: string },
  dispatch: any
) => {
  dispatch({
    type: 'seen',
    payload: {
      user: userFullName,
      id: id,
    },
  })
}

const updateHandledByRedux = (
  { id, userFullName }: { userFullName: string; id: string },
  dispatch: any
) => {
  dispatch({
    type: 'handled',
    payload: {
      user: userFullName,
      id: id,
    },
  })
}
