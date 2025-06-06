import LyricWord from "./LyricWord";

function Lyrics({ words, clickedWords, setClickedWords }) {

    return (
        <>     
            <h1>Lyrics</h1>
            <div>
                {words.map((word, index) => (
                    <LyricWord 
                    key={index} 
                    word={word}
                    setClickedWords={setClickedWords}
                    clickedWords={clickedWords}
                     />
                ))}
            </div>
        </>
    );
}

export default Lyrics