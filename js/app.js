'use strict';


function Animal(val) {
    this.title = val.title;
    this.image_url = val.image_url;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;

}

$.ajax('./data/page-1.json')
    .then(data => {
        console.log(data);
        data.forEach(val => {

            let newOne = new Animal(val);
            // console.log(newOne);
            newOne.render();
        })
        $('#photo-template').first().remove();
    })



Animal.prototype.render = function () {
    let animalClone = $('#photo-template').clone();
    let moreOption = $('<option></option>').text(this.keyword);
    $('select').append(moreOption);
    console.log('t', this.title);

    animalClone.find('h2').text(this.title);
    animalClone.find('img').attr('src', this.image_url);
    animalClone.find('p').text(this.description);
    animalClone.attr('class', this.keyword);

    $('main').append(animalClone);


}

$('select').on('change', function () {
    let itemSelect = this.value;
    console.log('f', itemSelect);
    $('div').hide();
    $(`.${itemSelect}`).show();
});

