const baseURL = '/api/sequences/'

export default {
    getSequences(){
        return fetch(baseURL)
        .then(res => res.json())
    },
    postSequence(payload){
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
    },
    deleteSequence(id) {
        return fetch(baseURL + id, {
            method: 'DELETE'
        })
    }
}