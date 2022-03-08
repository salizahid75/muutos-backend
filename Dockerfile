FROM node:14-alpine
ENV NODE_ENV=production
ENV PORT 8080
ENV HOST 34.135.90.162
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
