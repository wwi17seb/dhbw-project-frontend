# dhbw-project-frontend

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

# Build a new docker image

build the docker container
```
docker build -t felixwaage/dhbw-project-frontend .
```

start your docker container
```
docker run -p 80:3000 -d felixwaage/dhbw-project-frontend
```