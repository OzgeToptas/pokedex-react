import { IPokemon } from "@/types/global";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async () => {
      const pokeList: IPokemon[] = [];
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');

      await Promise.all(response.data.results.map(async ({ name }: { name: string }) => {
        try {
          const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
          let speciesData = {};
          if (pokemonResponse.data.species && pokemonResponse.data.species.url) {
            const speciesResponse = await axios.get(pokemonResponse.data.species.url);
            speciesData = speciesResponse.data;
          }
          pokeList.push({...pokemonResponse.data, species: speciesData});
        } catch (error) {
          console.error(`Error fetching data for ${name}:`, error);
        }
      }));

      return pokeList;
    }
  );

export default fetchPokemon
