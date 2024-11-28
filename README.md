# nodejs-project documentation

# To install npm and its pacakages and dependencies, use:
# apt install npm -y
# npm install express mongoose bcrypt

# To install database in another server, use the following commands:
# apt install -y gnupg curl
# curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
# echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
# apt update
# apt install -y mongodb-org
# systemctl start mongod.service
# systemctl enable mongod.service
# systemctl status mongod.service

# Now, configure the mongodb in /etc/mongod.conf path, like:
# Add the server ip where mongodb is installed. ex: 127.0.0.1,<server-ip>

# Now login to the mongo shell, using 'mongosh'.
# create a database using, 'use users'

# Now go to main js file(here server.js) and add the serverip in mongoose connect to establish the connectivity for app and db.

# To run the code, use:
# node server.js

# To login to the mongo command line use:
# mongosh

# To switch to the database, use:
# use users; #here users is the database

# To list the users in the particular database, use:
# db.users.find()

# To delete a particular user in the database, use:
# db.users.deleteOne({ name: "username" });

# To delete all the users in the database, use:
# db.users.deleteMany({});

# PM2 is a production process manager for Node.js applications with a built-in load balancer. 
# It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

# To install pm2, use:
# npm install pm2 -g 
# g means globally

# To start an application in the backend, use:
# pm2 start server.js

# To list all running applications, use:
# pm2 list

# To view more details on a specific application,use:
# pm2 describe id|server.js

# To stop the specific application, use:
# pm2 stop id|server.js

# To restart the specific application, use:
# pm2 restart id|server.js

# To delete the specific application, use:
# pm2 delete id|server.js

# To monitor logs, custom metrics, application information, use:
# pm2 monit

# To create the mongodb container using mongodb image, pull the image from my dockerhub:
# docker run -d --name mongodb mongo

# Once container was created, login to the container using:
# docker exec -it mongodb /bin/bash

