import {calculateProgress, makePledge, progressBar, selectProduct, toggleBookmark, toggleCheckbox, toggleMobileNav, toggleModal, updateUnitsLeft} from './func';

var selectionModal = $("#selection-modal");
var successModal = $("#success-modal");

$(".mobile-menu-btn").click(function(){
    toggleMobileNav();
})


// SELECTION MODAL
$("#back-project-btn").click(function(){
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    toggleModal(selectionModal);
});

$("#modal-close-icon").click(function(){
    toggleModal(selectionModal);
});

for (var i = 0; i < $(".product-card-bottom").children("button").length; i++){
    $(".product-card-bottom:eq(" + i + ")").on("click", function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        toggleModal(selectionModal);
    });
}

// SUBMIT PLEDGE
for (var i = 0; i < $(".pledge-amount").length; i++){
    $(".pledge-amount:eq(" + i + ")").children("button").on("click", function() {
        var index = $(".pledge-amount").children("button").index(this);

        if(makePledge(index)){
            toggleModal(selectionModal);
            toggleModal(successModal);
        }
    });
}

successModal.find("button").click(function(){
    toggleModal(successModal);
})

toggleBookmark();
selectProduct();

calculateProgress();
updateUnitsLeft();
