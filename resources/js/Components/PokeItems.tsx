import { useAppSelector } from "@/Redux/hook"
import { PokemonTypeColors, pokeNum } from "@/Utils/utils";
import { Link } from "@inertiajs/react";


function PokeItems({ pokeName }: { pokeName: string }) {
  const { pokeList } = useAppSelector((state) => state.poke)
  const poke  = pokeList.find(({ name }) => name === pokeName)
  if (!poke) return null;
  const { id, name, types, sprites } = poke

  const backgroundColors = types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  })

  return (
    <Link href={route('detail', name)}>
      <div className="pokeItemContainer" style={{  backgroundColor: backgroundColors[0].medium, }}>
        <div>
          <span className="poke-no"># {pokeNum(id, 3)}</span>
          <img src={sprites.other.dream_world.front_default} alt="" />
        </div>
        <div className="detail">
          <span className="poke-name">{name}</span>
          <div className="attributes">
          {types.map(({ type }, index) => (
            <p
              key={`${id}-${type.name}`}
              className={(index !== types.length - 1 ? " mr-6" : "")}
              style={{ color: backgroundColors[index].medium }}
            >
              {type.name}
            </p>
          ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PokeItems
