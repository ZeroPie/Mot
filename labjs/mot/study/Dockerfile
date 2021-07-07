FROM mhart/alpine-node:12

WORKDIR /study

COPY package.json package-lock.json ./

RUN npm install

CMD npx parcel --public-url ./ study/index.html

EXPOSE 1234