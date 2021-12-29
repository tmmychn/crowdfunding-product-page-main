var goal = 100000;
var current = 89914;
var backers = 5007;

var bambooStock = 101;
var blackStock = 64;
var mahoganyStock = 1;

export function toggleMobileNav() {
    $(".mobile-menu-btn").find("img").toggle();
    // $(".nav").toggle();
    // $('.nav-bg').css('visibility', $('.nav-bg').css('visibility') == 'hidden' ? 'visible' : 'hidden');
    // $('.nav-bg').css('opacity', $('.nav-bg').css('opacity') == '0' ? '1' : '0');

    if ($(".menu-open").length > 0){
        $(".nav").removeClass("menu-open");
        $(".nav").addClass("menu-close");
    } else {
        $(".nav").removeClass("menu-close");
        $(".nav").addClass("menu-open");
    }
}

export function toggleModal(modal) {
    modal.toggle();
    $(".selected:eq(0)").removeClass("selected");
}

export function selectProduct() {
    // Highlight checkbox when selected
    for (var i = 0; i < $(".selection-modal-card").length; i++){
        $(".selection-modal-card:eq(" + i + ")").on("click", function() {
            if ($(".selected").length > 0) {
                $(".selected:eq(0)").removeClass("selected");
                $(this).addClass("selected");
            } else {
                $(this).addClass("selected");
            }
        });
    }
}

$.fn.toggleText = function(t1, t2){
    if($(this).html() == t1){
        $(this).html(t2);
   }else{                   
    $(this).html(t1);
   }
    return $(this);
};

export function toggleBookmark() {
    $("#bookmark-btn").on("click", function(){
        $("#bookmark-btn").toggleClass("bookmarked");
        $("#bookmark-text").toggleText("Bookmarked", "Bookmark");

        $("#bookmark-btn").find("img").toggle();
    })
}

export function makePledge(index) {
    var pledge = $(".selected").find("input").val();
    var minimumPledge;
    var minimumPledgeWarning;

    switch(index) {
        case 0:
            minimumPledge = 0;
            break;
        case 1:
            minimumPledge = 25;
            minimumPledgeWarning = "Please pledge $25 or more";
            break;
        case 2:
            minimumPledge = 75;
            minimumPledgeWarning = "Please pledge $75 or more";
            break;
        case 3:
            minimumPledge = 200;
            minimumPledgeWarning = "Please pledge $200 or more";
            break;
        default:
            minimumPledge = 0;
    }

    if (pledge >= minimumPledge){
        current += parseInt(pledge);
        backers += parseInt(1);
        calculateProgress();
        console.log(backers);

        switch(index) {
            case 1:
                bambooStock--;
                break;
            case 2:
                blackStock--;
                break;
            case 3:
                mahoganyStock--;
                break;
        }

        updateUnitsLeft();
        return 1;

    } else {
        console.log(minimumPledgeWarning);
        return 0;
    }

}

export function calculateProgress() {
    var thisGoal = parseInt(goal);
    var thisCurrent = parseInt(current);

    var percentage = ((thisCurrent/thisGoal)*100).toFixed(2);

    displayProgress(percentage);
}

function displayProgress(percentage) {
    $("#progress").css("width", percentage + "%");
    $("#total-pledge").html(current.toLocaleString());
    $("#total-backers").html(backers.toLocaleString());
}

// Updates units left and disables card if units is 0
export function updateUnitsLeft() {
    $(".normal-units").children(".figure-text").html(bambooStock);
    $(".black-units").children(".figure-text").html(blackStock);
    $(".mohagony-units").children(".figure-text").html(mahoganyStock);
    
    // If units-left is 0, add class "out-of-stock" to the product card and selection modal card
    // Change button to out of stock
    for (var i = 0; i < $(".units-left").length; i++){
        if ($(".units-left:eq(" + i + ")").children(".figure-text").html() === "0"){
            $(".units-left:eq(" + i + ")").parents(".product-card").addClass("out-of-stock");
            $(".units-left:eq(" + i + ")").parents(".selection-modal-card").addClass("out-of-stock");
            $(".out-of-stock").find("button").html("Out of Stock");
        } else {
            $(".units-left:eq(" + i + ")").parents(".product-card").removeClass("out-of-stock");
            $(".units-left:eq(" + i + ")").parents(".selection-modal-card").removeClass("out-of-stock");
            $(".out-of-stock").find("button").html("Select Reward");
        }
    }
}