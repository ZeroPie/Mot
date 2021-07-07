If using Docker

```
docker run -d -p 9000:9000 jatos/jatos:latest
```

Create a new Study with the gui

Copy study files your local jatos

```
docker cp dist/. container_name:/opt/docker/study_assets_root/testname
```

TODO:

docker compose

```
docker build --tag jatosmot .
docker-compose up
```

if css is included by script or for deving on jatos

```
npx parcel --public-url ./ study/index.html
```

if only on local

```
npx parcel study/index.html
```

```
docker run \
    --name mot \
    -t \
    -d \
    -e ENV_VAR=test \
    -p 1234:1234 \
    -v `pwd`:/ \
    mot npx parcel --public-url ./ study/index.html
```
