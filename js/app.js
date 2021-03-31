'use strict';

let numOfpage = 'page-1';

$('.page1').click(function () {
    numOfpage = 'page-1';
    $('main').html('');
    anyPage(numOfpage);
});

$('.page2').click(function () {
    numOfpage = 'page-2';
    $('main').html('');
    anyPage(numOfpage);
});



function anyPage() {
    $.ajax(`./data/${numOfpage}.json`)
        .then(data => {
            console.log(data);
            data.forEach(val => {

                let newOne = new Animal(val);
                // console.log(newOne);
                newOne.toHtml();
                // newOne.noMore();
            })
            noMore();
            $('#photo-template').first().remove();
        })
}
anyPage();

function Animal(val) {
    this.title = val.title;
    this.image_url = val.image_url;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;
    Animal.all.push(this);
}
Animal.all = [];




Animal.prototype.toHtml = function () {
    let template = $('#template2').html();
    let dataSet = Mustache.render(template, this);
    $('main').append(dataSet);

}
function titleImage() {

    Animal.all.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        }
        else if (a.title.toUpperCase() > b.title.toUpperCase())
            return 1;

        else
            return 0;
    });

    function hornsImage() {

        Animal.all.sort((a, b) => {
            if (a.horns < b.horns) {
                return -1;
            }
            else if (a.horns > b.horns)
                return 1;
            else
                return 0;
        });

    }


}

$('.select2').on('change', function () {
    let option = $(this).val();

});




// Animal.prototype.render = function () {
//     let animalClone = $('#photo-template').clone();
//     let moreOption = $('<option></option>').text(this.keyword);
//     $('select').append(moreOption);
//     console.log('t', this.title);

//     animalClone.addClass(this.keyword);
//     animalClone.find('h2').text(this.title);
//     animalClone.find('img').attr('src', this.image_url);
//     animalClone.find('p').text(this.description);

//     $('main').append(animalClone);


// }

function noMore() {
    let filterword = [];
    Animal.all.forEach(val => {
        if (!filterword.includes(val.keyword)) {
            filterword.push(val.keyword);
        }
    })
    filterword.forEach(val => {
        let option = `<option value="${val}">${val}</option>`;
        $('.select1').append(option);
    })

}

$('select').on('change', function () {
    let itemSelect = this.value;
    console.log('f', itemSelect);
    $('div').hide();
    $(`.${itemSelect}`).show(800);
});

