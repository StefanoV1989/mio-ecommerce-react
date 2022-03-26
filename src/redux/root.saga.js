import { all, call } from 'redux-saga/effects'
import { carrelloSagas } from './carrello/carrello.sagas'

export default function* rootSaga() {
    yield(all([
        call(carrelloSagas)
    ]))
}