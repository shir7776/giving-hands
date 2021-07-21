const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        id_daily:{type:String,required: true,unique: true, index: true},
        date: { type: Date, required: true },
        email: { type: String, required: true },
        id_addr: { type: String, required: true },//from the address table
        done:{type:String,required:true}
       

    }, { autoIndex: false });

    // custom method to add string to end of name
    // you can create more important methods like name validations or formatting
    // you can also do queries and find similar users
    // schema.methods.dudify = function() {
    //     // add some stuff to the users name
    //     this.name = this.name + '-dude';
    //     return this.name;
    // };

    schema.statics.CREATE = async function(dd) {
        return this.create({
            id_daily: dd[0],
            date: dd[1],
            email: dd[2],
            id_addr:dd[3],
            done:dd[4]
            
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
            let cursor, dd;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (dd = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(dd);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(dd);
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
    db.model('daily-distribution', schema); // if model name === collection name
    debug("daily-distribution model created");
};
