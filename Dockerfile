FROM node:alpine

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080

RUN mkdir -p /app
ADD .nuxt /app/.nuxt
ADD static /app/static
ADD package.json /app
WORKDIR /app
RUN npm install

CMD ["npm", "run", "start"]