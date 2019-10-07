'use strict';

var imgDivTag = document.getElementById('div-images');
var img01Tag = document.getElementById('img01');
var img02Tag = document.getElementById('img02');
var img03Tag = document.getElementById('img03');

var totalClicks = 0;

var img01OnThePage = null;
var img02OnThePage = null;
var img03OnThePage = null;

var ProductImage = function(name, imgURL){
  this.name = name;
  this.clicks = 0;
  // number of times the image appears during the process (will need this in order to calculate percentage)
  this.timesShown = 0;
  this.imgURL = imgURL;

  ProductImage.allImages.push(this);

};

ProductImage.allImages = [];

//Helper functions - These are not part of object or the constructor
var renderNewImages = function(img01Index, img02Index, img03Index){
  img01Tag.src = ProductImage.allImages[img01Index].imgURL;
  img02Tag.src = ProductImage.allImages[img02Index].imgURL;
  img03Tag.src = ProductImage.allImages[img03Index].imgURL;
};

// Randomly pick new images
var pickNewImages = function(){
  var img01Index = Math.ceil(Math.random() * ProductImage.allImages.length -1);

  //TODO: Figure out how to add a third item into this cycle
  do {
    var img02Index = Math.ceil(Math.random() * ProductImage.allImages.length-1);
  } while(img01Index === img02Index);

  do {
    var img03Index = Math.ceil(Math.random() * ProductImage.allImages.length-1);
  } while(img01Index === img03Index);

  img01OnThePage = ProductImage.allImages[img01Index];
  img02OnThePage = ProductImage.allImages[img02Index];
  img03OnThePage = ProductImage.allImages[img03Index];

  renderNewImages(img01Index, img02Index, img03Index);
};

// Event Handler
var handleClickOnImg = function(event){

  if(totalClicks < 26) {
    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'img01' || id === 'img02' || id === 'img03'){
      if (id === 'img01'){
        img01OnThePage.clicks ++
      }
      if (id === 'img02'){
        img02OnThePage.clicks ++;
      }
      if (id === 'img03'){
        img03OnThePage.clicks ++;
      }

      img01OnThePage.timesShown ++;
      img02OnThePage.timesShown ++;
      img03OnThePage.timesShown ++;

      pickNewImages();
    }
  }
  totalClicks ++;
};

imgDivTag.addEventListener('click', handleClickOnImg);

new ProductImage('R2-D2', '../img/bag.jpg');
new ProductImage('Banana Slicer', '../img/banana.jpg');
new ProductImage('Bathroom iPad TP Stand', '../img/bathroom.jpg');
new ProductImage('Open-Toe Rain Boots', '../img/boots.jpg');
new ProductImage('All-in-One Breakfast Center', '../img/breakfast.jpg');
new ProductImage('Meatball Bubble Gum', '../img/bugglegum.jpg');
new ProductImage('Bubble Chair', '../img/chair.jpg')
new ProductImage('Cthulhu Figurine', '../img/cthulhu.jpg');
new ProductImage('Puppy Duckbill', '../img/dog-duck.jpg');
new ProductImage('Dragon Meat', '../img/dragon.jpg');
new ProductImage('Utensil Pen Cap', '../img/pen.jpg')
new ProductImage('Pet Paw Sweeper', '../img/pet-sweep.jpg');
new ProductImage('Pizza Serving Scissors', '../img/scissors.jpg');
new ProductImage('Shark Sleeping Bag', '../img/shark.jpg');
new ProductImage('Baby Sweeper Onesie', '../img/sweep.png');
new ProductImage('Tauntaun Sleeping Bag', '../img/tauntaun.jpg');
new ProductImage('Unicorn Meat', '../img/unicorn.jpg');
new ProductImage('USB Tenticle', '../img/usb.gif');
new ProductImage('Self-Watering Can', '../img/water-can.jpg');
new ProductImage('Wine Pod Glass', '../img/wine-glass.jpg');

pickNewImages();
