//<---function to render random images for all breeds--->
function renderRandomDog() {
 axios.get('https://dog.ceo/api/breeds/image/random/3')
   .then(function(renderDog){
       renderDog.data.message.forEach(function(obj) {
       let img = document.createElement('img');
       img.src = obj;
       let allImages = document.querySelector('.allImages');
       allImages.appendChild(img);
       img.style.height = '200px';
   });
 });
 refresh();
}

//<---Function to refresh the whole page when you click on refresh button--->
function refresh() {
 let refreshButton = document.querySelector('input');
 refreshButton.addEventListener('click', function() {
 let key = document.querySelector('h2').textContent;
 window.location.reload();
 });
}

//<---function to render all breeds on the red field in the footer--->
function renderBreeds() {
  axios.get('https://dog.ceo/api/breeds/list/all')
    .then(function(response){
       let obj = response.data.message;
       let keys = Object.keys(obj);
       for(let key of keys) {

       let divmenu = document.createElement('div');
       divmenu.className='breeds';
       divmenu.textContent = key;

       let menu = document.querySelector('.menu');
       menu.appendChild(divmenu);
       divmenu.addEventListener('click', function(e){
       renderSubBreeds(key);
       renderBreedImg(e);
     });
   }
 });
 }


//<---function to render sub-breeds on the red field in the header--->
function renderSubBreeds(key) {
  axios.get('https://dog.ceo/api/breed/' + key + '/list')
    .then(function(response){
        let obj = response.data.message;
        let keys = Object(obj);
        let subMenu = document.querySelector('.subMenu');
        subMenu.innerHTML='';

         for(let key of keys) {
         let dropDownForSub = document.createElement('div');
         dropDownForSub.className = 'mydroppdown';
         dropDownForSub.textContent = key;

         subMenu.appendChild(dropDownForSub);
         dropDownForSub.addEventListener('click', function(e) {
         renderSubBreedImg(e)
        })
      }
    });
  }

//<---function to render image for the breed you click on--->
function renderBreedImg(e) {
      document.querySelector('.allImages').innerHTML = '';
      let value = e.target.textContent;
      let hash = window.location.hash = value;
      value2 = value;
      setTitle(value);
      axios.get(`https://dog.ceo/api/breed/${value}/images/random/3`)
        .then(function(renderDog){
            renderDog.data.message.forEach(function(obj) {
              let img = document.createElement('img');
              img.src = obj;
              let allImages = document.querySelector('.allImages');
              allImages.appendChild(img);
              img.style.height = '200px';
          });
        });
        }

let value2 = '';

//<---function to render image for the sub-breed you click on--->
function renderSubBreedImg(e) {
      document.querySelector('.allImages').innerHTML = '';
      let value = e.target.textContent;
      setTitle(value2 + ' ' + value);
      window.location.hash = value2 + '-' + value;
      axios.get('https://dog.ceo/api/breed/' + value2 + '/' + value + '/images/random/3')
        .then(function(renderDog){
          let array = renderDog.data.message;
          renderDog.data.message.forEach(function(obj) {
          console.log(obj);
          let img = document.createElement('img');
          img.src = obj;
          let allImages = document.querySelector('.allImages');
          allImages.appendChild(img);
          img.style.height = '200px';
        });
      });
    }

// <--- function to get the hash--->
function getHash() {
  let locateHash = window.location.hash.substring(1);
  let breedArr = locateHash.split('-');
  if(breedArr[1]) {
    renderSubBreedHash(breedArr[0], breedArr[1]);
  }else {
    renderBreedHash(locateHash);
  }
}


// <---function to render breed images depending on what the hash in url is--->
function renderBreedHash(e) {
    document.querySelector('.allImages').innerHTML = '';
    setTitle(e);
    axios.get('https://dog.ceo/api/breed/' + e + '/images/random/3')
      .then(function(renderDog){
          refresh();
          renderDog.data.message.forEach(function(obj) {
            let img = document.createElement('img');
            img.src = obj;
            let allImages = document.querySelector('.allImages');
            allImages.appendChild(img);
            img.style.height = '200px';
        });
      });
      }

// <---function to render sub-breed images depending on what the hashes in url is--->
function renderSubBreedHash(b, sb) {
     refresh();
     document.querySelector('.allImages').innerHTML = '';
     setTitle(b + ' ' + sb);
     axios.get('https://dog.ceo/api/breed/' + b + '/' + sb + '/images/random/3')
       .then(function(renderDog){
           let array = renderDog.data.message;
           renderDog.data.message.forEach(function(obj) {
           let img = document.createElement('img');
           img.src = obj;
           let allImages = document.querySelector('.allImages');
           allImages.appendChild(img);
           img.style.height = '200px';
        });
      });
    }

// <---if window.location.hash is true then run function getHash otherwise run function renderRandomDog--->
if(window.location.hash) {
  getHash();
}else{
  renderRandomDog()
}
renderBreeds();
renderBreeds();

// <--- Function for the title of different kind of breeds and sub-breeds that appear when you click on any kind of breed or sub-breed--->
function setTitle(title) {
   document.querySelector('h2').innerHTML = title;
}
