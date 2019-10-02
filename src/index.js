const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API_DOS = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

 let localStorage = window.localStorage;
// localStorage.setItem('next_fetch'response.info.next);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results; 
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      localStorage.setItem('next_fetch', response.info.next);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  if(localStorage.getItem('next_fetch')) { 
    await getData(localStorage.getItem('next_fetch'));
  } 
  else{
    await getData(API);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

localStorage.clear();