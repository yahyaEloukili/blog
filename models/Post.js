const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema(
    {
        name: {

        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);



module.exports = mongoose.model('Post', PostSchema);
