import { useState } from 'react'

function ClickedWord({ word, index} ) {

    const [translation, setTranslation] = useState('')

    fetch('http://localhost:5000/api/get-translation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word: word })
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setTranslation(data.translation)
        })

    function removeWord(){
        console.log("removing")
    }

    return (
        <div className={index}>
            <h1>{word}</h1>
            <p>English: "{translation}"</p>
            <button onClick={removeWord}>remove</button>
        </div>
    )
}

export default ClickedWord