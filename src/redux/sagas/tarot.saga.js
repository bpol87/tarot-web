import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDeck(){
try {
    const response = yield axios.get('/api/tarot')
    const deck = response.data
    yield put({ type: 'SET_DECK', payload: deck })
} catch (error) {
 console.log('Error fetching deck:', error)
}
}

function* addTarotSpread(action) {
    try {
        const data = action.payload;
        const spreadData = {
            card_one: data[0].id,
            card_one_orientation: data[0].orientation,
            card_two: data[1].id,
            card_two_orientation: data[1].orientation,
            card_three: data[2].id,
            card_three_orientation: data[2].orientation,
        };

        yield axios.post('/api/tarot/3-spread', spreadData);

    } catch (error) {
        console.log('Error adding spread to history', error);
    }
}

function* fetchThreeHistory () {
    try {
        const response = yield axios.get(`/api/tarot/3-history/`)
        console.log('response is:', response)
        yield put({type: 'SET_THREE_HISTORY', payload: response.data})
    } catch (error) {
        console.log('Error fetching 3-spread history', error)
    }
}


function* tarotSaga(){
    yield takeLatest('FETCH_DECK', fetchDeck)
    yield takeLatest('SAVE_TAROT_SPREAD', addTarotSpread)
    yield takeLatest('FETCH_THREE_HISTORY', fetchThreeHistory)
}

export default tarotSaga;