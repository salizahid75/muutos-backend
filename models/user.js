class User {
    constructor(id,role,name, number, email, password, dob, uid, gender, language_selected, address, profile_picture, orders, payment_details, status){
            this.id = id;
            this.role = role;
            this.name = name;
            this.number = number;
            this.email = email;
            this.password = password;
            this.dob = dob;
            this.uid = uid;
            this.gender = gender;
            this.language_selected = language_selected;
            this.address = address;
            this.profile_picture = profile_picture;
            this.orders = orders;
            this.payment_details = payment_details;
            this.status = status; 
        }
}

module.exports = User;