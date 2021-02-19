

ps aux | grep mysql
sudo lsof -i :3306
sudo lsof -i -P -n | grep LISTEN

DOCKER

IMAGE
Docker search “image”
Docker pull “”image”:”version”
Docker images rm id 
Docker image history id

CONTAINER
Docker run -it id —name “name”

docker run -dp 3000:3000 ‘name’

docker rm ‘id’

Docker start id
Docker attach Id
Docker exec id command
Docker rm -f container_id 
Docker diff container_id

CONTAINER—> IMAGE
Docker commit id name:version
Docker save —output file.tar id_images 
Docker load -I ile.tar
Docker tag f nameimage:version 

Docker run -it -v path/in/local  path/in/docker id 
Docker run -it --name “name2” —volumes-from id id_image 

PERSIST
Docker volume ls 
Docker volumn create todo-db
docker run -dp 3000:3000 -v todo-db:/etc/todos “container”
—> save database
Docker volumn rm “”name”
docker volume inspect “name”

TO UPDATE CODE
 docker run -dp 3000:3000 -w /app -v "$(pwd):/app" node:12-alpine sh -c "yarn install && yarn run dev"

—> then build to create image: 
docker build -t getting-started .
\\ getting-started is name-tag

MULTI-CONTAINER:
 docker network create todo-app
docker run -d \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=todos \
     mysql:5.7
docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=todos \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"
