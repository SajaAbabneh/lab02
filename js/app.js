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
                
            })

            keywordOption();
            $('#photo-template').first().remove();
        })
}
anyPage();

let keydowrds=[];
function Animal(val) {
    this.title = val.title;
    this.image_url = val.image_url;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;
    Animal.all.push(this);

    if(!keydowrds.includes(this.keyword)){
        keydowrds.push(this.keyword);
    }
}
Animal.all = [];




Animal.prototype.toHtml = function () {
    let template = $('#template2').html();
    let dataSet = Mustache.render(template, this);
    $('main').append(dataSet);

}

function keywordOption(){
    for( let i = 0 ; i<keydowrds.length ; i++){
         let keywordsList = $('option').first().clone().text(keydowrds[i]);
         keywordsList.attr('value',keydowrds[i])
         $('.select1').append(keywordsList);
    }
}


$('select').on('change', function () {
    let itemSelect = this.value;
    console.log('f', itemSelect);
    $('section').hide();
    $(`.${itemSelect}`).show();
});

//sort
$('.select2').on('change',function(){
    let sortValue=$(this).val();

    if(sortValue == 'Title'){
        Animal.all.sort(function(a,b){
            if(a.title.toLowerCase()< b.title.toLowerCase()) return -1;
            else if (a.title.toLowerCase()< b.title.toLowerCase()) return 1;
            else return 0 ;
        })
        Animal.all.forEach(val => {
            val.toHtml();
        });

    }else if (sortValue == 'Horns'){
        Animal.all.sort(function(a,b){
            if(a.horns< b.horns) return -1;
            else if (a.horns < b.horns) return 1;
            else return 0 ;
    })
        Animal.all.forEach(val => {
        val.toHtml();
    });
}
    
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

