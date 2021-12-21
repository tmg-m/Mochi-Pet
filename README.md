# Project's name

Project M2

## Description

instagram/tinder prototype

## USER STORIES

**404** - 404 page when s page doesn’t exist.

**500** - error page for devs.

**Initial page** - The homepage to see what the app is all about with login and signup.

**Sign up** - A user can sign up with email.

**Login** - A user is able to log in on the webpage so user can get back to their account

**Logout** - A user is able to log out from the webpage/account

**Profile** - A user is able to see their profile and edit it

**Home** - A user is able to see others profile which user can skip or store in favourites by likeing it. 

**Add pet photo** - A user is able to add photos of their pets to my profile based on a type/color/age/breed/etc catalog

**See profile** - A user is able to see other user's profile

**Delete photos** - A use is able to delete photos from their profile

**Update discription** - A user is able to update the information of their photos

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /profile        |
| Log out         | GET   | /logout                        | Log out a user                                   |                                       | /               |
| Profile         | GET    | /profile                      | See the profile page with editable form          |                                       |                 |
| Profile edited  | POST   | /profile                      | Send user's data changed                         | {user_email, password                 | /profile}       |
| Favourites      | GET    | /favourite/user_id            | All liked photos/profiles                        |                                       |                 |
| Photo add form  | POST    | /new/photo_id                | See form to upload a new plant                   |                                       |                 |
| Photo delete    | POST   | /userid/photos/photo_id/delete| Delete photo from user's photo colection         |                                       | /profile        |

## Models

-User model

-photo model
