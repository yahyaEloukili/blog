const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Education = require('./models/Education');
const Experience = require('./models/Experience');
const Post = require('./models/Post');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files



const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8')
);
const educations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/educations.json`, 'utf-8')
);
const experiences = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/experiences.json`, 'utf-8')
);
// const posts = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/posts.json`, 'utf-8')
// );



// Import into DB
const importData = async () => {
  try {

    await User.create(users);
    await Profile.create(profiles);
    await Education.create(educations);
    await Experience.create(experiences);
    // await Post.create(posts);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {

    await User.deleteMany();
    await Profile.deleteMany();
    await Education.deleteMany();
    await Experience.deleteMany();
    await Post.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
