class Vendor {
    constructor(id,
        service_id,first_name, last_name, email, password, phone, businness_name, selected_country, city, businness_address, postal_code, location, open_time, close_time, star_rating,
        plan, bool_customer, vendor_type, featured, how_did_you_know, size_of_business, size_of_staff, facility, category) {
        this.id = id;
        this.service_id = service_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.businness_name = businness_name;
        this.selected_country = selected_country;
        this.city = city;
        this.businness_address = businness_address;
        this.location = location;
        this.open_time = open_time;
        this.close_time = close_time;
        this.star_rating = star_rating;
        this.plan = plan;
        this.postal_code = postal_code;
        this.bool_customer = bool_customer;
        this.vendor_type = vendor_type;
        this.featured = featured;
        this.how_did_you_know = how_did_you_know;
        this.size_of_business = size_of_business;
        this.size_of_staff = size_of_staff;
        this.facility = facility;
        this.category = category;
    }
}

module.exports = Vendor;