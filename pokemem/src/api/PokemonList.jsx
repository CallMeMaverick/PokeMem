import { useState, useEffect } from "react";
import shuffleArray from "../utils/shuffleArray.js";


function PokemonList() {
    // State for pokemons to further work with
    const [pokemons, setPokemons] = useState([]);
    // State for loading phase
    const [isLoading, setIsLoading] = useState(true);
    // State for handling error cases
    const [error, setError] = useState(null);


    const triggerShuffle = () => {
        const shuffled = [...pokemons];
        shuffleArray(shuffled);
        setPokemons(shuffled);
    }


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
        <div className={"pokemons"}>
            {pokemons.map(pokemon => (
                <div className={"card"} key={pokemon.id} onClick={triggerShuffle}>
                    <img src={pokemon.imgSrc} width={"150px"} height={"150px"} alt={pokemon.name} />
                    <h3>{pokemon.name}</h3>
                </div>
            ))}
        </div>
    )
}


export default PokemonList;