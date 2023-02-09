
var list = [];
var student = {};
$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get("id");
    if (param != null) {
        edit(param);
    }
    else{

    }
    $("#btn").click(function (e) {
        e.preventDefault()
        let id = $('#id2').val();
        let firstName = $('input[name=firstname]').val();
        let lastName = $('input[name=lastName]').val();
        let Qualification = $('input[name=Qualification]').val();
        let gender = $('input[name="gender"]:checked').val();
        let email = $('input[name=email]').val();
        let phoneNumber = $('input[name=phoneNumber]').val();
        let address = $('textarea[name=address]').val();


        jQuery.validator.addMethod("customEmail", function (value, element) {
            return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
        }, "Please enter valid email address!");

        jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        }, "Please specify a valid phone number");
        $('input[name=gender]').change(function () {
            $('.error-message').remove();
        });

        $('form').submit(function () {
            if (!$('input[name=gender]:checked').length) {
                $('<p class="error-message">Please select a gender</p>').insertAfter('.d-flex');
                return false;
            }
        });
        var $registrationForm = $('#registration');
        if ($registrationForm.length) {
            $registrationForm.validate({
                rules: {
                    firstname: {
                        required: true,
                    },
                    lastName: {
                        required: true,
                    },
                    email: {
                        required: true,
                        customEmail: true
                    },
                    Qualification: {
                        required: true,
                    },
                    phoneNumber: {
                        required: true,
                        phoneUS: true
                    },
                    address: {
                        required: true,
                    },
                    // gender:{
                    //     required:true,
                    // }
                },
                messages: {
                    firstname: {
                        required: 'Please enter username!'
                    },
                    lastName: {
                        required: 'Please enter father name!'
                    },
                    email: {
                        required: 'Please enter email!',
                        email: 'Please enter valid email!'
                    },
                    Qualification: {
                        required: 'Please enter Qualification!'
                    },
                    phoneNumber: {
                        required: 'Please enter phonenumber!'
                    },
                    address: {
                        required: 'Please enter address!'
                    },
                    // gender:{
                    //     required: 'Please select gender!'
                    // }
                },
            }
            )
        }

        var result = {
            'firstName': firstName, 'lastName': lastName, 'Qualification': Qualification, 'gender': gender, 'email': email, 'phoneNumber': phoneNumber, 'address': address
        };
        console.log(result);

        if (firstName && lastName && Qualification && gender && email && phoneNumber && address) {
            list.push(result);
        }
        if (id == "") {
            $.ajax({
                type: "POST",
                url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user",
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function (e) {
                   
                    // buildForm()
                    console.log(e)
                    // location.reload()
                    window.location.href = "teacherlist.html"
                }

            })
        }
        else {
            $.ajax({
                type: "PUT",
                url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + student.id,
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function () {
                    
                    // console.log(response)
                    location.reload()
                    window.location.href = "teacherlist.html"
                }

            })
        }

    });
});


function buildForm() {

    $.ajax({
        type: "GET",
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/",
        dataType: "JSON",
        success: function (response) {
             list = response
           
            // list = JSON.parse(localStorage.getItem("registrationvalue"));
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].firstName + "</td>"
                    + "<td>" + list[i].lastName + "</td>"
                    + "<td>" + list[i].Qualification + "</td>"
                    + "<td>" + list[i].gender + "</td>"
                    + "<td>" + list[i].email + "</td>"
                    + "<td>" + list[i].phoneNumber + "</td>"
                    + "<td>" + list[i].address + "</td>"
                    + "<td>" + "<button type='button' class='getEditWin text-white btn btn-primary' onclick='edit1(" +

                    list[i].id + ")'>Edit</button><button type='button' class=' deleteRow btn btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'>Delete</button> " + "</td>"

                document.getElementById("myTable1").innerHTML += row;
            }
        }

    })
    
}

function edit1(id) {
    window.location.href = "teacherform.html?id=" + id
}
function edit(id) {
    $.ajax({
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + id,
        type: "GET",
        success: function (response) {
            $("#id2").val(response.id);
            $("#firstName").val(response.firstName);
            $("#lastName").val(response.lastName);
            $("#Qualification").val(response.Qualification);
            $("#gender").val(response.gender);
            $("#email").val(response.email);
            $("#phoneNumber").val(response.phoneNumber);
            $("#address ").val(response.address);
            student = response;
        }
    })
}

function updateStudentData1(id) {
    $.ajax({
        type: "PUT",
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable/" + id,
        data: result,
        dataType: "JSON",
        endcode: true,
        success: function (response) {
            // console.log(response)
            //  location.reload()

        }
    });
}
$(document).on('click', '.getEditWin', function () {
    var id = $(this).data('id');


})
function deleteRow(id) {
    $.ajax({
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()

        }
    })
}




