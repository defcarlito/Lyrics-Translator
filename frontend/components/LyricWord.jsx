import {  useState } from 'react'

function LyricWord({ word, clickedWords, setClickedWords }) {
    const parts = word.split("\n") // seperates word and \n char if it has one
    const [hover, setHover] = useState(false)

    function clickedWord(){
        let filtered_word = word.replace(/[":'!?,.\]\[()]/g, "").replace("\n", "").replace("-", " ").toLowerCase()
        if (!clickedWords.includes(filtered_word) && isNaN(filtered_word)){
            setClickedWords([...clickedWords, filtered_word])
        }

    }

    return (
        <>  
            {parts.map((part, index) => (
                <span key={index} 
                onClick={clickedWord}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    cursor: 'pointer',
                    color: hover ? "white" : "black"
                }}
                >
                    {part}
                    {index < parts.length - 1 && <br/>}
                    {' '}
                </span>
            ))}
        </>
    )
}

export default LyricWord