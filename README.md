# ChatProject - API

### About the project

This project is an chat webapplication that I built as a training project.
You can create an account, create channels, add friends from the list of users and chat with them in real time.
For this project I didn't use Socket for the real time chat. The function that get the messages is updated every second.

### Built With

This app is developped with Django Rest FrameWork and React.

HTML and CSS Inspired from :
- https://codepen.io/Devel0per95/pen/rjOpdx

## Getting Started

### Prerequisites

You will need Python >= 3.11 and Node
> https://www.python.org/downloads/
> https://nodejs.org/en/download/

### Installation

Clone the repo at

> https://github.com/VincentAbensour/ChatBox.git

In your folder create a virtual environment:

`py -m venv env `

and activate it

`env\Scripts\activate`

Install the required packages

`pip install -r requirements.txt`

Make the necessaries migrations

`py manage.py migrate`

Then you will need to install the React packages by runnin

`npm install`

in the frontend directory

### Usage

First of all you might want to create several accounts to test the application by clicking on register.
Then login, create a Channel, invite other users by selecting one and clicking on "Ajouter". Finally send a few message.

You can then open an other browser and launch the app. You might need to logout first. Then you can login with an other account and start chatting on the channels that you previsouly created.

### About the Code

For this project I didn't use Socket for the real time chat. The function that get the messages is updated every second.

Authentification is done with JWT Authentification that is managed in "api" app.
