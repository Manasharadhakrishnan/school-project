
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
        let id = $('#id1').val();
        let studentName = $('input[name=studentName]').val();
        let fatherName = $('input[name=fatherName]').val();
        let email = $('input[name=email]').val();
        let dob = $('input[name=dob]').val();
        let gender = $('input[name="gender"]:checked').val();
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
                    studentName: {
                        required: true,
                    },
                    fatherName: {
                        required: true,
                    },
                    email: {
                        required: true,
                        customEmail: true
                    },
                    dob: {
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
                    studentName: {
                        required: 'Please enter username!'
                    },
                    fatherName: {
                        required: 'Please enter father name!'
                    },
                    email: {
                        required: 'Please enter email!',
                        email: 'Please enter valid email!'
                    },
                    dob: {
                        required: 'Please enter dateofbirth!'
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
            'studentName': studentName, 'fatherName': fatherName, 'dob': dob, 'gender': gender, 'email': email, 'phoneNumber': phoneNumber, 'address': address
        };
        console.log(result);

        if (studentName && fatherName && dob && gender && email && phoneNumber && address) {
            list.push(result);
        }
        if (id == "") {
            $.ajax({
                type: "POST",
                url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable",
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function (e) {
                    window.location.href = "studenttable.html"

                    //  buildTable1()
                    // location.reload()
                    console.log(e)
                }

            })
        }
        else {
            $.ajax({
                type: "PUT",
                url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable/" + student.id,
                data: result,
                dataType: "JSON",
                endcode: true,
                success: function () {
                    window.location.href = "studenttable.html"

                    // console.log(response)
                }

            })
        }
    });
})



function buildTable() {

    $.ajax({
        type: "GET",
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable",
        dataType: "JSON",
        success: function (response) {
            let list = response

            // list = JSON.parse(localStorage.getItem("registrationvalue"));
            // console.log(list)
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].studentName + "</td>"
                    + "<td>" + list[i].fatherName + "</td>"
                    + "<td>" + list[i].dob + "</td>"
                    + "<td>" + list[i].gender + "</td>"
                    + "<td>" + list[i].email + "</td>"
                    + "<td>" + list[i].phoneNumber + "</td>"
                    + "<td>" + list[i].address + "</td>"
                    + "<td>" + "<button type='button' class='getEditWin text-white btn btn-primary' onclick='edit2(" +

                    list[i].id + ")'>Edit</button><button type='button' class=' deleteRow btn btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'>Delete</button> " + "</td>"


                document.getElementById("myTable").innerHTML += row;
            }
        }

    })
}
function edit2(id) {
    window.location.href = "studentform.html?id=" + id

}

function edit(id) {

    $.ajax({
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable/" + id,
        type: "GET",
        success: function (response) {
            $("#id1").val(response.id);
            $("#studentName").val(response.studentName);
            $("#fatherName").val(response.fatherName);
            $("#dob").val(response.dob);
            $("#gender").val(response.gender);
            $("#email").val(response.email);
            $("#phoneNumber").val(response.phoneNumber);
            $("#address ").val(response.address);
            student = response;

        }
    })
}

// function redirectToTable(id) {
//     if ($registrationForm.validate);
// }

function updateStudentData(id) {
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
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/studenttable/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()

        }
    })
}





