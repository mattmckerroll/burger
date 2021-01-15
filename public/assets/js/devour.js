/*document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

    const devourbtn = document.getElementsByid("eatingbtn");

    if (devourbtn){
        devourbtn.addEventListener('click', (e) =>{
            e.preventDefault();
            const id = e.target.getAttribute('data-id');

            fetch(`/burgers/${id}`, {
                method: 'PUT',                
            }).then((res) => {
                console.log(res); 

                location.reload();
            })
        });
    }
});*/
$(function() {


$(".eatburger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
        devoured: 1
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
        type: "PUT",
        data: devouredState
    }).then(function() {
        console.log("Burger devoured");
        location.reload();
    });
})
});
