const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("DB connected successfully");
    } catch (err) {
        console.log("Can't connect");
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
};
