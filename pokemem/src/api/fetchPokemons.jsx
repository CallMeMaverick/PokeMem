import { useState, useEffect } from "react";

function PokemonList() {
    // State for pokemons to further work with
    const [pokemons, setPokemons] = useState([]);
    // State for loading phase
    const [isLoading, setIsLoading] = useState(true);
    // State for handling error cases
    const [error, setError] = useState(null);

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
        <div className={"fetched-data"}>
            <ul>
                {pokemons.map((pokemon) => (
                    <li className={"card"} key={pokemon.id}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default PokemonList;