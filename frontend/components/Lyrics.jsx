import LyricWord from "./LyricWord";

function Lyrics({ words, clickedWords, setClickedWords, loadingLyrics }) {

    return (
        <>     
            {loadingLyrics ? (
                <p>Getting the lyrics...</p>
            ) : ( 
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
            )}
        </>
    );
}

export default Lyrics