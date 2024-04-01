const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            // `mongodb+srv://psd:psd@cluster0.gvygig3.mongodb.net/?retryWrites=true&w=majority`,
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
