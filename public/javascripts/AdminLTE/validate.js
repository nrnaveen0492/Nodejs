$(document).ready(function() {
	$("#usernew").validate({
		rules:{
			firstname: 'required',
			lastname: 'required',
			email: { required: true, email: true, },
			password: { required: true, minlength: 8, },
			confirmpassword: { required: true, minlength: 8, equalTo: "#id_password", },
		},
		messages:{
			firstname: 'Please Enter First Name Field',
			lastname: 'Please Enter Last Name Field',
			email: { required: "Please Enter email Field", email: "Please Enter Valid Email", },
			password:{ required: "Please Enter Password Field", minlength: "Your Password Must be Atleast 8 Characters Long", },
			confirmpassword:{ required: "Please Enter Confirm Password Field", minlength: "Your Conform Password Must be Atleast 8 Characters Long", equalTo: "Password and Conform Password does not Match", },
		},
	});
	$("#reset").validate({
		rules:{
			password: { required: true, minlength: 8, },
			confirm: { required: true, minlength: 8, equalTo: "#id_password", },
		},
		messages:{
			password:{ required: "Please Enter Password Field", minlength: "Your Password Must be Atleast 8 Characters Long", },
			confirm:{ required: "Please Enter Confirm Password Field", minlength: "Your Conform Password Must be Atleast 8 Characters Long", equalTo: "Password and Conform Password does not Match", },
		},
	});
	$("#profile").validate({
		rules:{
			first_name: 'required',
			last_name: 'required',
			email: { required: true, email: true, },
			image: { extension: "jpg|JPEG|jpeg|png", },
		},
		messages:{
			first_name: 'Please Enter First Name Field',
			last_name: 'Please Enter Last Name Field',
			email: { required: "Please Enter email Field", email: "Please Enter Valid Email", },
			image: { extension: "Please upload image only with extension (jpg|JPEG|jpeg|png)", },
		},
	});
});