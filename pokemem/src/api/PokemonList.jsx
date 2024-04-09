import { useState, useEffect } from "react";
import shuffleArray from "../utils/shuffleArray.js";


function PokemonList() {
    // State for pokemons to further work with
    const [pokemons, setPokemons] = useState([]);
    // State for loading phase
    const [isLoading, setIsLoading] = useState(true);
    // State for handling error cases
    const [error, setError] = useState(null);

    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const savedScore = localStorage.getItem('bestscore');
        return savedScore !== null ? parseInt(savedScore, 10) : 0;
    })
    const [clickedPokemons, setClickedPokemons] = useState([]);


    const handleClickedCard = (pokemonId) => {
        if (clickedPokemons.includes(pokemonId)) {
            if (score > bestScore) {
                setBestScore(score);
            }

            setScore(score => score - score);
            setClickedPokemons([]);
        } else {
            setScore(score => score + 1);
            setClickedPokemons(prevState => [...prevState, pokemonId]);
        }
    }

    const triggerShuffle = (pokemonId) => {
        shuffleArray(pokemons);
        setPokemons([...pokemons]);

        handleClickedCard(pokemonId);
    }

    useEffect(() => {
        localStorage.setItem('bestscore', bestScore);
    }, [bestScore]);

    useEffect(() => {
        async function fetchPokemons() {
            const queryURL = "https://pokeapi.co/api/v2/pokemon/";
            const fetchedPokemons = [];

            try {
                for (let i = 1; i <= 25; i++) {
                    const response = await fetch(`${queryURL}${i}`);

                    if (!response.ok) {
                        throw new Error("Error fetching data");
                    }

                    const data = await response.json();
                    fetchedPokemons.push({
                        name: data.name,
                        id: data.id,
                        imgSrc: data.sprites.front_default
                    });
                }

                setPokemons(fetchedPokemons);
            } catch (error) {
                setError(error.message);
            }

            setIsLoading(false);
        }

        fetchPokemons();
    }, [])


    if (isLoading) {
        return <div className={"fetching-loading"}>
                    <p>Loading ...</p>
                </div>
    }

    if (error) {
        return (
            <div className={"fetching-error"}>{`Error occurred: ${error.message}`}</div>
        )
    }

    return (
        <div className={"wrapper"}>
            <div className={"score-board"}>
                <p>Current score: {score}</p>
                <p>Best result: {bestScore}</p>
            </div>

            <div className={"hr-tag"}>
                <hr />
            </div>

            <div className={"pokemons"}>
                {pokemons.map(pokemon => (
                    <div className={"card"} key={pokemon.id} onClick={() => triggerShuffle(pokemon.id)}>
                        <img src={pokemon.imgSrc} width={"150px"} height={"150px"} alt={pokemon.name}/>
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default PokemonList;