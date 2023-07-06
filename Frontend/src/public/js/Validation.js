

export class validations {



    //Sign Up Validation function
    SignUpvalidator(userName, fName, lName, email, contactNo, psw, repsw) {
        //Validating inputs
        if (userName.length < 3) {

            return 'Username must have more than 3 letters';
        }

        if (userName.includes("...")) {

            return 'Username cannot contain "..." character. Please select another user name';
        }

        if (fName === '') {

            return 'Please enter your first name';
        }

        if (lName === '') {

           return 'Please enter your last name';
        }

        if (email === '') {

            return 'Please enter your email';
        }

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            return 'Please enter a valid email';
        }

        if (contactNo.length < 10) {

            return 'Please enter your correct contact number';
        }

        if (!/^[0-9]+$/.test(contactNo)) {

            return 'Please enter a valid contact number';
        }

        if (psw.length < 8) {

            return 'Password must have atleast 8 characters';
        }

        if (psw !== repsw) {

            return 'Passwords do not match';
        }

        return null;
    }

    AddAdminValidator(adminUserName, adminPsw, adminRePsw){

        if (adminUserName.length < 3) {

            return 'Admin Username must have more than 3 letters';
        }

        if (!adminUserName.includes("...")) {

            return 'Admin Username must contain "..." character';
        }

        
        if (adminPsw !== adminRePsw) {

            return 'Passwords do not match';
        }
        return null;
    }

   
}