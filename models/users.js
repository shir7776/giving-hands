const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        address: { type: String, required: true },
        age: { type: String, required: true },
        salery: { type: String, required: true },
        phone_number: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        type: { type: String, required: true },
        ststus:{ type: String, required: true },
        workToday:{ type: Boolean, required: false },
        area:{ type: String, required: false }

    }, { autoIndex: false });

    // custom method to add string to end of name
    // you can create more important methods like name validations or formatting
    // you can also do queries and find similar users
    // schema.methods.dudify = function() {
    //     // add some stuff to the users name
    //     this.name = this.name + '-dude';
    //     return this.name;
    // };

    schema.statics.CREATE = async function(user) {
        return this.create({
            fname: user[0],
            lname: user[1],
            address: user[2],
            age: user[3],
            salery: user[4],
            phone_number: user[5],
            email: user[6],
            password: user[7],
            type:user[8],
            ststus:user[9],
            workToday:user[10],
            area:user[11],
            
        });
    };

    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });

    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('users', schema); // if model name === collection name
    debug("User model created");
};
