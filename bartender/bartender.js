var data = { reviews: [{}], onShift: [], specialtyDrinks: [{}], };

// a data structure for storing information about the team
// *** Adapted from CS179 coding lab 1 ***
var tutorial_data = {
    reviews: [{
        item: "Hurricane",
        type: "beverage",
        text: "Great drink and fast service, will come again!",
        stars: 5,
        response: '',
    }, {
        item: "Negroni",
        type: "beverage",
        text: "This sucks and you sucks",
        stars: 2,
        response: '',	
    }, ],

    onShift: ['Juaquin', 'Connor', 'Ayo'],

    drinks: {
        beers: [
            { name: "Bud Light", price: 5 },
            { name: "Heineken", price: 6 },
            { name: "Mike's", price: 5.5 },
            { name: "PBR", price: 5 },
        ],
        cocktails: [
            { name: "Old Fashioned", price: 8.5 },
            { name: "Negroni", price: 9 }
        ]
    },

    specialtyDrinks: [{
        name: "Hurricane",
        desc: "sweet alcoholic drink made with rum, fruit juice, and syrup or grenadine",
        price: 13,
    }, {
        name: "Tequila Sunrise",
        desc: "cocktail made with tequila, orange juice, and grenadine syrup",
        price: 11,
    }],
};

// Usage: 
// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
String.prototype.format = function() {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};
// alert("{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET"));

function displayBarReviews() {
    //get data object from localStorage, else loads default
    data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
    if (!data) { data = tutorial_data; }

    // add reviews in data object to HTML, 
    // eg generating HTML to inject in page
    var reviewsHTML = "";
    for (var i = 0; i < data.reviews.length; i++) {
        reviewsHTML += '<div class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">';
        reviewsHTML += data.reviews[i].item;
        reviewsHTML += '</h5><h2>' + data.reviews[i].stars + '</h5</h2></div>';
        reviewsHTML += '<p class="mb-1">' + data.reviews[i].text + '</p>';
        // reviewsHTML += '<div class="d-flex w-100 justify-content-between"></div>';
        reviewsHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-index=' + i + ' id="exampleModal">Respond</button></div>';

        // if there is a response, want to display it
        var r = data.reviews[i].response;
        if (r) {
            reviewsHTML += '<div class="d-flex w-100 justify-content-between" id="review_response"><small>' + r + '</small></div>';
        }
    }
    // puts generated html in wrapper
    $("#insert_reviews").html(reviewsHTML);
}

function displayBartenderDrinks() {
    data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
    if (!data) { data = tutorial_data; }
    var barFavHTML = "<li>";

    var drink = "<div class='list-group-item'>" +
        "<label>Drink Name:</label><input type='text' class='drinkName form-control' placeholder='New Drink Name' value='{0}'>" +
        "<label>Drink Description:</label><input type='text' class='drinkDescription form-control' placeholder='New Drink Description' value='{1}'>" +
        "<label>Price:</label><input type='number' class='drinkPrice form-control' placeholder='0' min='0' value='{2}'>" +
        "<div class='input-group'><a tabindex='0' class='btn btn-primary float-right' role='button' data-toggle='popover' data-trigger='focus' onclick='saveDrink()' data-content='Saved'>Save</a>" +
        "<button class='btn btn-danger float-right' onclick='removeDrink(this)'>Delete</button></div></div>";

    if (data.specialtyDrinks[0].name == null) {
        $('#specialty_drink').html("<h3 class='text-center'>No Saved Drinks</h3>");
    }
    else {
        for (var i = 0; i < data.specialtyDrinks.length; i++) {
            var drinkObj = data.specialtyDrinks[i];
            barFavHTML += drink.format(drinkObj.name, drinkObj.desc, drinkObj.price);
        }
        barFavHTML += '</li>';
        $('#specialty_drink').html(barFavHTML);
    }
}

function saveDrink() {
    // update data.specialtyDrinks
    data.specialtyDrinks = [{}];
    var names = document.querySelectorAll('.drinkName');
    var descs = document.querySelectorAll('.drinkDescription');
    var prices = document.querySelectorAll('.drinkPrice');
    for (var i = 0; i < names.length; i++) {
        n = names[i].value;
        d = descs[i].value;
        p = prices[i].value;
        data.specialtyDrinks[i] = { name: n, desc: d, price: p };
    }
    // save to localStorage
    localStorage.setItem('data_spirit_webapp', JSON.stringify(data));
    displayBartenderDrinks();
}

function addDrink() {

    if (data.specialtyDrinks[0].name == null) {
        $('#specialty_drink').html("<p class='text-center text-muted'>You're adding your first drink...</p>");
    }

    var drink = "<div class='list-group-item'>" +
        "<label>Drink Name:</label><input type='text' class='drinkName form-control' placeholder='New Drink Name'>" +
        "<label>Drink Description:</label><input type='text' class='drinkDescription form-control' placeholder='New Drink Description'>" +
        "<label>Price:</label><input type='number' class='drinkPrice form-control' placeholder='0' min='0'>" +
        "<div class='input-group'><a tabindex='0' class='btn btn-primary float-right' role='button' data-toggle='popover' data-trigger='focus' onclick='saveDrink()' data-content='Saved'>Save</a>" +
        "<button class='btn btn-danger float-right' onclick='removeDrink(this)'>Delete</button></div></div>";

    document.getElementById("specialty_drink").insertAdjacentHTML('beforeend', drink);
}

function removeDrink(e) {
    e.parentNode.parentNode.remove();
    saveDrink();
}

function displayOnShiftHome() {
    data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
    if (!data) { data = tutorial_data; }
    var homeShiftHTML = "";
    homeShiftHTML += '<p class="text-center" style="margin-bottom: 0;">On Shift: ';
    for (var i = 0; i < data.onShift.length; i++) {
        homeShiftHTML += data.onShift[i] + ', ';
    }
    end = homeShiftHTML.length;
    homeShiftHTML = homeShiftHTML.slice(0, end - 2);
    homeShiftHTML += '</p>';
    $("#onShiftHome").html(homeShiftHTML);
}

function displayCheckedShifts() {
    data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
    if (!data) { data = tutorial_data; }
    for (var i = 0; i < data.onShift.length; i++) {
        $('#' + data.onShift[i])[0].checked = true;
    }
}

function addReview(text, index) {
    data.reviews[index].response = text;
    localStorage.setItem('data_spirit_webapp', JSON.stringify(data));
    displayBarReviews();
}

function barProfileSubmit() {
    // get checked items
    var all = $(":checkbox");
    data.onShift = [];
    for (var i = 0; i < all.length; i++) {

        if (all[i].checked) {
            data.onShift.push(all[i].id);
        }
    }
    localStorage.setItem('data_spirit_webapp', JSON.stringify(data));
    displayCheckedShifts();
}

function displayBarProfileDrinks() {
    data = JSON.parse(localStorage.getItem('data_spirit_webapp'));
    if (!data) { data = tutorial_data; }

    var barDrinksHTML = '<div class="col-sm-12"><h4 class="my-2">Beer - On Draft</h4><ul class="list-group">';
    for (var i = 0; i < data.drinks.beers.length; i++) {
        barDrinksHTML += '<li class="list-group-item justify-content-between active">';
        // barDrinksHTML += '<input class="form-check-input" type="checkbox">';
        barDrinksHTML += data.drinks.beers[i].name;
        barDrinksHTML += '<span class="badge badge-default badge-pill">';
        if (data.drinks.beers[i].price){
        	barDrinksHTML += data.drinks.beers[i].price;
        }
        barDrinksHTML += '</span></li>';
    }
    barDrinksHTML += "</ul></div>";

    barDrinksHTML += '<div class="col-sm-12"><h4 class="my-2">Cocktails</h4><ul class="list-group">';
    for (var k = 0; k < data.drinks.cocktails.length; k++) {
        barDrinksHTML += '<li class="list-group-item justify-content-between active">';
        // barDrinksHTML += '<input class="form-check-input" type="checkbox">';
        barDrinksHTML += data.drinks.cocktails[k].name;
        barDrinksHTML += '<span class="badge badge-default badge-pill">';
        if (data.drinks.cocktails[k].price){
        	barDrinksHTML += data.drinks.cocktails[k].price;
        }
        barDrinksHTML += '</span></li>';
    }
    barDrinksHTML += "</ul></div>";

    barDrinksHTML += '<div class="col-sm-12"><h4 class="my-2">My Specialty Drinks</h4><ul class="list-group">';
    for (var j = 0; j < data.specialtyDrinks.length; j++) {
        barDrinksHTML += '<li class="list-group-item justify-content-between active">';
        // barDrinksHTML += '<input class="form-check-input" type="checkbox">';
        barDrinksHTML += data.specialtyDrinks[j].name;
        barDrinksHTML += '<span class="badge badge-default badge-pill">';
        if (data.specialtyDrinks[j].price){
        	barDrinksHTML += data.specialtyDrinks[j].price;
        }
        barDrinksHTML += '</span></li>';
    }
    barDrinksHTML += "</ul></div>";

    $('#inject_drinks').html(barDrinksHTML);
}


$("body").on('click', '#saveBarProfile', function() {
    barProfileSubmit();
});

$("body").on('click', '#exampleModal', function() {
    $("#Modal").modal("show");
    global_index = $(this).attr("data-index");
});

$("body").on('click', '#close_modal #close', function() {
    $("#Modal").hide(); //modal("hide");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    displayBarReviews();
    location.reload();
});

$("body").on('click', '#save_changes', function() {
    text = $("#Modal #message-text")["0"].value;
    $("#Modal").hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    addReview(text, global_index);
    location.reload();
});



// and awaaaaay we go
$(function() {

    page = window.location.pathname.split("/").pop();
    if (page == "review.html") {
        displayBarReviews();
    }
    if (page == "bar_profile.html") {
        //displayCheckedShifts();
        displayBarProfileDrinks();
        $(".list-group-item").click(function() {
        	$(this).toggleClass("active");
    	});
    }
    if (page == "home.html") {
        displayOnShiftHome();
    }
    if (page == "favorites.html") {
        displayBartenderDrinks();
    }
});
