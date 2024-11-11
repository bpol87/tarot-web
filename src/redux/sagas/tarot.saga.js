import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function fetchDeck(action){
try {
    const deck = yield axios.get('/api/tarot')
    yield put({ type: 'SET_DECK', payload: deck })
} catch (error) {
 console.log('Error fetching deck:', error)
}
}

function* tarotSaga(){
    yield takeLatest('FETCH_DECK', fetchDeck)
}

export default tarotSaga;