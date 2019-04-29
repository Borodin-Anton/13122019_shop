class Product {
    constructor (name, price, pic) {
        this.name = name;
        this.price = price;
        this.pic = pic;
        this.el = document.querySelector('.goods');
    }
    renderProduct() {
        let newProductBlock = document.createElement('div');
        newProductBlock.classList.add('goods__item');
        newProductBlock.innerHTML = `
        <div class="goods__item-photo" style="background-image: url(../images/catalog/${this.pic})"></div>
        <div class="goods__item-name">${this.name}</div>
        <div class="goods__item-price">${this.price} руб.</div>
        `;
        this.el.appendChild(newProductBlock)
    }
}

class Catalog {
    constructor () {
        this.el = document.querySelector('.goods');
    }
    cleanCatalog() {
        this.el.innerHTML = '';
    }
    preloaderOn() {
        let preloader = document.createElement('div');
        preloader.classList.add('preloader');
        this.el.appendChild(preloader);
    }

    preloaderOff() {
        this.cleanCatalog();
    }
    renderCatalog(id) {

        this.cleanCatalog();
        this.preloaderOn();

        let xhr = new XMLHttpRequest;
        xhr.open('GET', `/heandlers/catalogHeandler.php${id}`);
        xhr.send();

        xhr.addEventListener('load', () => {
            this.preloaderOff();
            let data = JSON.parse(xhr.responseText);
            
            data.forEach(function(value) {
                let newProduct = new Product (value.name, value.price, value.pic);
                newProduct.renderProduct();
            });
        })
    }
}

let catalog = new Catalog();

let cats = (window.location.search != '') ? window.location.search : '?id=1';

catalog.renderCatalog(cats);

let subCats = document.querySelector('[name="cat_name"]');

subCats.addEventListener('change', function(){
    let subCatsId = subCats.value;
    subCatsId = `?id=${subCatsId}`;
    catalog.renderCatalog(subCatsId)
})