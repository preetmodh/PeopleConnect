# TASK-MANAGER
A Social Media Web application made using the Django rest framework
(for API endpoints) and reactjs where users can chat in real-time(using
channels and signals), post their updates, like, comment and view other
users’ posts & profiles, search users & follow-unfollow them and get
notified about activities on their profile.
## Requirements:
* Python Installed
* npm Installed
## Process:
1. Clone this project on your local system
2. Open terminal
3. Go to the **Django** directory
4. Now in terminal type:
    * pip install -r requirements.txt
    * python manage.py makemigrations
    * python manage.py migrate
    * python manage.py runserver
 5. Go to frontend directory
 6. Now in terminal type:
    * npm install
    * npm build
 
 The React server will start in chrome and it's done.


### Technologies Used:
* Python3
* django framework
   * django rest framework
   * django signals
   * django channels
   * django models
   * django user models
   * django-googledrive-storage
   * django urls
   * django sqlite3
* React-js
   * material ui
   * axios
   * react-router-dom
