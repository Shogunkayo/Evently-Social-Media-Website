# Evently

Evently is a social media website designed to promote events. We make it easier to search, host and join events. It serves as a common platform for people with shared interests to interact with each other, and also enables event organizers to host their events, significantly reducing their advertising costs. This was our MERN stack project in 3rd semester.

## Features
### Implemented
- Signup page: Start you journey by creating a profile for yourself. Passwords are hashed before storing using bcrypt package
- JWT Authentication: All the inner endpoints are secured and require JWT access token
- Create Events page: Create your event by providing the necessary details. Upload your own cover photo or use one of our stock photos
- Explore page: Search for events created by other users, with sort and filter options. Comment on posts to interact with the community. Like posts to show that you are interested. Liked posts are saved in your profile page
- Profile page: Update your profile photo and your user bio. See all the events you have created as well as the events you have saved.

### Pending
- Implement JWT refresh tokens to enhance security
- Update the navigation bar and make the search bar functional
- Enable users to follow each other
- Create a dashboard page
- Add a private messaging feature

## Installation

- Please ensure that you have Node and MongoDB installed before proceeding. To use the stock database, please install MongoDB Compass.

- (OPTIONAL) Create a new database called 'evently' (or any name of your choice)

- (OPTIONAL) Create the following collections: 'events', 'users' and 

- (OPTIONAL) Import the respective stock collections by clicking on Add Data -> Import File -> Select the collections downloaded from stock-collection directory -> Select import file type as JSON

- Ensure that the URL of the database correctly set up in 'index.js' file in the server directory

```
mongoose.connect('mongodb://127.0.0.1:27017/evently')
```
- Navigate to both the client and server directories and run the following command to install the required packages
```
npm install
```
- Create a .env file inside the server repository and add the following lines
```
ACCESS_TOKEN_SECRET = '4DD_4CC355_T0K3N_H3R3'
REFRESH_TOKEN_SECRET = '4DD_R3FR35H_T0K3N_H3R3'
```


- Replace the access token and refresh token secrets. To generate one easily, run the following commands in your terminal
```
node
```

```
require('crypto').randomBytes(64).toString('hex')
```

## Usage

- Navigate to the server directory in your terminal and run the following command
```
npm start
```
- Navigate to the client directory in a new terminal and run the following command
```
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
