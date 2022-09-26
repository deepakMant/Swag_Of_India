
//  edit profile function 




$(document).ready(function () {
    $('#editProfileMale').on("click", function () {
            this.innerHTML = ' <i class="fa fa-check"></i> Male';
            document.getElementById("editProfileFemale").innerHTML = "Female";
    });

    $('#editProfileFemale').on("click",function(){
        this.innerHTML = ' <i class="fa fa-check"></i> Female';
        document.getElementById("editProfileMale").innerHTML = "Male";
    })
})
