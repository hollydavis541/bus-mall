'use strict';

var rounds = 7;
var imgDivTag = document.getElementById('div-images');
var img01Tag = document.getElementById('img01');
var img02Tag = document.getElementById('img02');
var img03Tag = document.getElementById('img03');
var totalClicks = 0;
var img01OnThePage = null;
var img02OnThePage = null;
var img03OnThePage = null;

var ProductImage = function(name, imgURL){
  this.imgURL = imgURL;
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.previouslyShown = false;
  ProductImage.allImages.push(this);
};

ProductImage.allImages = [];

var renderNewImages = function(img01Index, img02Index, img03Index){
  img01Tag.src = ProductImage.allImages[img01Index].imgURL;
  img02Tag.src = ProductImage.allImages[img02Index].imgURL;
  img03Tag.src = ProductImage.allImages[img03Index].imgURL;
};

var pickNewImages = function(){
  var img01Index = Math.ceil(Math.random() * ProductImage.allImages.length -1);
  do {
    var img02Index = Math.ceil(Math.random() * ProductImage.allImages.length-1);
    var img03Index = Math.ceil(Math.random() * ProductImage.allImages.length-1);
  } while(img01Index === img03Index || img01Index === img02Index || img03Index === img02Index);

  // we want to caputre these 3 indexes in an array previousImagesArray
  // next time you come around, you have that in store, so before randomization do...
  // var newSetToRandomize = [ArrayofObjects-3--a set sans the 3 you just used]
  // we'll look at a solution tomorrow

  img01OnThePage = ProductImage.allImages[img01Index];
  img02OnThePage = ProductImage.allImages[img02Index];
  img03OnThePage = ProductImage.allImages[img03Index];
  // Store in Array for comparison next time
  var imagesArray = [img01OnThePage, img02OnThePage, img03OnThePage];
  console.log(imagesArray);

  renderNewImages(img01Index, img02Index, img03Index);
};

/*

  for (var i = 0; i < Product.allImages.length; i++) {
    Product.allImages[i].previouslyShown = false;
  }

  leftImgOnThePage = Product.allImages[leftIndex];
  rightImgOnThePage = Product.allImages[rightIndex];
  middleImgOnThePage = Product.allImages[middleIndex];

  Product.allImages[leftIndex].previouslyShown = true;
  Product.allImages[rightIndex].previouslyShown = true;
  Product.allImages[middleIndex].previouslyShown = true;

  renderNewImages(leftIndex, rightIndex, middleIndex);
};
*/

var handleClickOnImg = function(event){
  var ul = document.getElementById('ul-voteresults');
  if(totalClicks < rounds) {
    var imageClicked = event.target;
    var id = imageClicked.id;
    if(id === 'img01' || id === 'img02' || id === 'img03'){
      if (id === 'img01'){
        img01OnThePage.clicks ++;
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

  if(totalClicks === rounds) {
    for (var i = 0; i < ProductImage.allImages.length; i++) {
      var liData = document.createElement('li');
      liData.setAttribute('class', 'li-results');
      liData.textContent = `${ProductImage.allImages[i].name}: Appearances ${ProductImage.allImages[i].timesShown} | Clicks ${ProductImage.allImages[i].clicks}`;
      ul.appendChild(liData);
    }
    alert('Thank you for participating!');
    imageClicked.removeEventListener('click', handleClickOnImg);
    makeChart();
  }
};

imgDivTag.addEventListener('click', handleClickOnImg);

new ProductImage('R2-D2 Suitcase', './img/bag.jpg');
new ProductImage('Banana Slicer', './img/banana.jpg');
new ProductImage('iPad TP Stand', './img/bathroom.jpg');
new ProductImage('Open-Toe Boots', './img/boots.jpg');
new ProductImage('Breakfast Center', './img/breakfast.jpg');
new ProductImage('Meatball Gum', './img/bubblegum.jpg');
new ProductImage('Bubble Chair', './img/chair.jpg');
new ProductImage('Cthulhu Figurine', './img/cthulhu.jpg');
new ProductImage('Puppy Duckbill', './img/dog-duck.jpg');
new ProductImage('Dragon Meat', './img/dragon.jpg');
new ProductImage('Utensil Pen Cap', './img/pen.jpg');
new ProductImage('Pet Paw Sweeper', './img/pet-sweep.jpg');
new ProductImage('Pizza Scissors', './img/scissors.jpg');
new ProductImage('Shark Sleeping Bag', './img/shark.jpg');
new ProductImage('Baby Sweeper', './img/sweep.png');
new ProductImage('Tauntaun Sleeping', './img/tauntaun.jpg');
new ProductImage('Unicorn Meat', './img/unicorn.jpg');
new ProductImage('USB Tenticle', './img/usb.gif');
new ProductImage('Self-Watering Can', './img/water-can.jpg');
new ProductImage('Wine Pod Glass', './img/wine-glass.jpg');

pickNewImages();

var genLabels = function(images) {
  var labelsArr = [];
  for (var i=0; i < images.length; i++){
    labelsArr.push([images[i].name + ' votes']);
  }
  return labelsArr;
};

var genData01 = function(images) {
  var dataArr = [];
  for (var i=0; i < images.length; i++){
    dataArr.push(images[i].clicks);
  }
  return dataArr;
};

var genData02 = function(images) {
  var dataArr = [];
  for (var i=0; i < images.length; i++){
    dataArr.push(images[i].timesShown);
  }
  return dataArr;
};

function makeChart(){

  var ctx = document.getElementById('canvas-chart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: genLabels(ProductImage.allImages),
      datasets: [{
        label: 'Votes',
        data: genData01(ProductImage.allImages),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Appearances',
        data: genData02(ProductImage.allImages),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}
