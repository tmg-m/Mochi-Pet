# Project's name

Project M2

## Description

instagram/tinder prototype

## USER STORIES

**404** - 404 page when page doesn’t exist.

**500** - error page for devs.

**Initial page** - The homepage to see what the app is all about with login and signup.

**Sign up** - A user can sign up with email.



**Login** - A user is able to log in on the webpage so user can get back to their account

**Logout** - A user is able to log out from the webpage/account



**Profile** - A user is able to see their profile and edit it



**Index** - A user is able to see others profile which user can skip or store in favourites by likeing it. 



**Edit pet profile** - A user is able to edit information of their pets to my profile based on a type/color/age/breed/etc catalog

**About us** - A user can read information about our app.

**Preferences** - A user can search a profile with more specific values.

**Favourites** - A user can recopilate the profiles.

**Delete profile** - A use is able to delete pet profile from their profile

**Update discription** - A user is able to update the information of their pets

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Index           | GET    | /                               See the main page                                |                                       |                 |
| Log out         | GET    | /logout                       | Log out a user                                   |                                       | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /profilepet
| Profile  pet    | GET    | /profile                      | See the profile page with editable form          |                                       |                 |
| About us        | GET    | /about                        | Information about the app                        |                                       | /
| Profile edited  | POST   | /profile                      | Send user's data changed                         | {user_email, password}                | /profilepet     |
| Favourites      | GET    | /favourite/pet_id             | All liked photos/profiles                        |                                       | /list           |
| Preferences     | POST   | /search                       | Specify search                                   | {random values}                       | /
| Profile pet delete    | POST   | /pet_id/pet/pet_id/delete| Delete profile pet from user's photo colection  |                                       | /profilepet   |

## Models

-User model

```javascript
 { username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nif: String,
  Date Birthday: Date,
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },}
```  

-Pet model 
```javascript
 { category: [dog, cat, others],
  gender: [male, female],
  name: String,
  Age: Number,
  Race: String,
  Colour: String,
  Location: [array con los diferentes barrios de Bcn]
  }
```
