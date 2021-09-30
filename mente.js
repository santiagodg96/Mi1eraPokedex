const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');


const typeColors = {
electric: '#D7E132',
normal: '#FF9333',
fire:'#FF3333',
water: '#33CEFF ',
ice: '#29FEFB',
rock: '#654C26',
flying: '#ECEBEC',
grass: '#2DDF27',
psychic: '#C4DC2F',
ghost: '#540F9E',
bug: '#0F5809',
poison: '#CE33C2',
ground: '#5B5048',
dragon: '#DC782F',
steel: '#909090',
fighting: '#4B3525',
default: '#000000',
};

//creación de la función search pokemon

const searchPokemon = event => {
    event.preventDefault(); //para que no relodee la pagina
    const {value} = event.target.pokemon; //obtiene el valor ingresado en el input gracias a name=pokemon"
    fetch (`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //convoca a la api y convierte lo escrito a minusculas
    .then(data => data.json()) //la información obtenida se pasa a formato json
    .then(response => renderPokemonData(response)) //envia la data a la funcion renderPokemonData
}

//creación de la función que renderizará los datos obtenidos y los devolverá al html
const renderPokemonData = data => {
    const sprite = data.sprites.front_default; //datos que se eligen de la api; sprites es la imagen
    const {stats, types} = data; //crea dos constantes del mismo nombre que los datos en la api y los guarda en si mismas
    pokeName.textContent = data.name; //pasa al html el valor de data.name de la api
    pokeImg.setAttribute ('src', sprite); //setea atributo de imagen 'src' y obtiene el valor de la constante sprite
    pokeId.textContent = `N° ${data.id}`; //N° lo seteamos nos, pero tomamos de data.id el valor en si
    setCardColor (types); //Llama a aplicar el color de types mediante la funcion CardColor
    renderPokemonTypes(types); //convoca a la función type a ejecutarse
    renderPokemonStats(stats); //convoca a la función stats a ejecutarse
}

//función que setea el color de la carta

const setCardColor = types =>{ //la función recibe el parametro de types y setea el color de fondo
    const colorOne = typeColors [types[0].type.name]; // va a buscar el color la constante typeColors y lo hace coincidir con el nombre del pokemon - type 0 o 1 son obtenidos según la api
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default; 
    //pregunta si existe un segundo color y si esa así repite la acción de la función anterior, de lo contrario setea default
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`
    pokeImg.style.backgroundSize = '4px 4px';
  
}

const renderPokemonTypes = types => { //la función recibe el parametro de types y setea el color del texto
    pokeTypes.innerHTML = ''; //vuelve a nada el valor para una nueva busqueda
    types.forEach(type => { //funcion for each ejecuta todo a la vez dentro del bloque de código
        const typeTextElement = document.createElement("div"); //función anidada de crea un div
        typeTextElement.style.color = typeColors[type.type.name]; //copia el color de type y se lo da al texto
        typeTextElement.textContent = type.type.name; //copia el valor de type y se lo da al texto
        pokeTypes.appendChild(typeTextElement); //crea una copia de la función por si hay un segundo type
    });
}

const renderPokemonStats = stats => {
pokeStats.innerHTML = '';
stats.forEach(stat => {
    const statElement = document.createElement ("div");
    const statElementName = document.createElement ("div"); // nombre del estado
    const statElementAmount = document.createElement ("div"); // valor del estado
    statElementName.textContent = stat.stat.name; //asignación del nombre según la api
    statElementAmount.textContent = stat.base_stat; //asignación del value según la api
    statElement.appendChild(statElementName); //creación de la variable en el html
    statElement.appendChild(statElementAmount); //creación de la variable en el html
    pokeStats.appendChild(statElement); //impresión de la variable en el html
}
    )
}
