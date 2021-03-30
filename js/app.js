'use strict';

$.ajax('./data/page-1.json')
    .then(data => {
        console.log(data);
        data.forEach(val => {

            let newOne = new Animal(val);
            // console.log(newOne);
            newOne.render();
        })
        noMore();
        $('#photo-template').first().remove();
    })


function Animal(val) {
    this.title = val.title;
    this.image_url = val.image_url;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;
    Animal.all.push(this);
}
Animal.all=[];


Animal.prototype.render = function () {
    let animalClone = $('#photo-template').clone();
    // let moreOption = $('<option></option>').text(this.keyword);
    // $('select').append(moreOption);
    console.log('t', this.title);

    animalClone.addClass(this.keyword);
    animalClone.find('h2').text(this.title);
    animalClone.find('img').attr('src', this.image_url);
    animalClone.find('p').text(this.description);

    $('main').append(animalClone);


}

function noMore(){
    let filterword=[];
    Animal.all.forEach(val => {
        if(!filterword.includes(val.keyword)){
            filterword.push(val.keyword);
        }
    })
filterword.forEach(val => {
    let option = `<option value="${val}">${val}</option>`;
    $( 'select' ).append(option);
})

}

$('select').on('change', function () {
    let itemSelect = this.value;
    console.log('f', itemSelect);
    $('div').hide();
    $(`.${itemSelect}`).show(800);
});

