If using Docker

```
docker run -d -p 9000:9000 jatos/jatos:latest
```

Create a new Study

Copy study files your local jatos

```
docker cp mot container_name_here:/opt/docker/study_assets_root
```

TODO:

docker compose

```
docker build --tag jatosmot .
docker-compose up
```
