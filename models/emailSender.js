class Email {
    constructor(id,
        from, to, subject, body){
            this.id = id;
            this.from = from;   
            this.to = to;
            this.subject = subject;
            this.body = body;
        }
}

module.exports = Email; 