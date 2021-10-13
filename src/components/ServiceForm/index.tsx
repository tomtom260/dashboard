import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { addService, editService } from '../../store/actions/services'
import './index.css'

type FormData = FormEvent<HTMLFormElement> & {
  target: {
    title: { value: string }
    description: { value: string }
  }
}

type ServiceFormProps = {
  title?: string
  description?: string
}

function ServiceForm({
  title: titleProps = '',
  description: descriptionProps = '',
}: ServiceFormProps) {
  const [title, setTitle] = useState(titleProps)
  const [description, setDescription] = useState(descriptionProps)

  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch()
  const { id } = useParams<{ id: string }>()

  const handleSubmit = async (evt: FormData) => {
    evt.preventDefault()

    if (match.path.includes('add')) {
      await dispatch(
        addService({
          title,
          description,
          addedBy: 'user45',
          date: Date.now(),
        })
      )
    } else {
      await dispatch(
        editService({
          title,
          description,
          addedBy: 'user45',
          date: Date.now(),
          id,
        })
      )
    }
    history.push('/')
  }

  return (
    <form className='service_form' onSubmit={handleSubmit}>
      <div className='service_form__input'>
        <label htmlFor='title'>Service Title</label>
        <input
          name='title'
          type='text'
          className='service_form__title'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div className='service_form__input'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          className='service_form__description'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <input type='submit' />
    </form>
  )
}

export default ServiceForm
