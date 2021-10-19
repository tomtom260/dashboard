import { FormEvent, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { addService, editService } from '../../store/actions/services'
import { AuthContext } from '../../utils/AuthProvider'
import styles from './styles.module.css'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { UIContext } from '../../utils/UIProvider'
import Loading from '../Loading'

type FormData = FormEvent<HTMLFormElement> & {
  target: {
    title: { value: string }
    description: { value: string }
  }
}

type ServiceFormProps = {
  title?: string
  description?: string
  features?: string[]
}

function ServiceForm({
  title: titleProps = '',
  description: descriptionProps = '',
  features: featuresProps = [''],
}: ServiceFormProps) {
  const [title, setTitle] = useState(titleProps)
  const [description, setDescription] = useState(descriptionProps)
  const [features, setFeatures] = useState(featuresProps)

  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch()
  const { id } = useParams<{ id: string }>()
  const { user } = useContext(AuthContext)
  const { toggleLoadingState, loading } = useContext(UIContext)

  const addFeature = () => {
    setFeatures(feats => {
      return [...feats, '']
    })
  }

  const removeFeature = (index: number) => {
    setFeatures(feat => {
      return [...feat.filter((value, i) => i !== index)]
    })
  }

  const onChangeFeature = (index: number, value: string) => {
    features[index] = value
    setFeatures(feats => {
      return [...feats]
    })
  }

  const handleSubmit = async (evt: FormData) => {
    evt.preventDefault()

    if (match.path.includes('add')) {
      await dispatch(
        addService(
          {
            title,
            description,
            addedBy: user?.displayName!,
            createdAt: Date.now(),
            features,
          },
          toggleLoadingState
        )
      )
    } else {
      await dispatch(
        editService(
          {
            title,
            description,
            lastModifiedBy: user?.displayName!,
            lastModifiedAt: Date.now(),
            id,
            features,
          },
          toggleLoadingState
        )
      )
    }
    history.push('/')
  }

  return loading ? (
    <Loading />
  ) : (
    <form className={styles.service_form} onSubmit={handleSubmit}>
      <div className={styles.service_form__input}>
        <label htmlFor='title'>Service Title</label>
        <input
          key='title'
          name='title'
          type='text'
          className='service_form__input'
          value={title}
          placeholder='Title'
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div className={styles.service_form__input}>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          placeholder='Description'
          // className='service_form__description'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div
        className={`${styles.service_form__input} ${styles.service_form__features}`}
      >
        <label htmlFor='features'>Features</label>
        <div className={styles.service_form__features__list}>
          {features.length === 0 ? (
            <div className={styles.service_form__add_feature}>
              <Fab
                onClick={addFeature}
                size='small'
                style={{
                  backgroundColor: '#4646bb',
                  color: 'white',
                }}
                aria-label='add'
                disableRipple
              >
                <AddIcon />
              </Fab>
            </div>
          ) : (
            features.map((feat, index) => (
              <>
                <div className={styles.service_form__feature}>
                  <input
                    name='features'
                    type='text'
                    value={features[index]}
                    placeholder='Feature'
                    onChange={evt => onChangeFeature(index, evt.target.value)}
                  />
                  <div className={styles.service__form__fab}>
                    <Fab
                      onClick={() => removeFeature(index)}
                      size='small'
                      style={{
                        backgroundColor: '#4646bb',
                        color: 'white',
                      }}
                      aria-label='remove'
                      disableRipple
                    >
                      <RemoveIcon />
                    </Fab>
                    {features.length < 4 && index === features.length - 1 && (
                      <Fab
                        onClick={addFeature}
                        size='small'
                        style={{
                          backgroundColor: '#4646bb',
                          color: 'white',
                        }}
                        aria-label='add'
                        disableRipple
                      >
                        <AddIcon />
                      </Fab>
                    )}
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
      <input className={styles.service_form__button} type='submit' />
    </form>
  )
}

export default ServiceForm
