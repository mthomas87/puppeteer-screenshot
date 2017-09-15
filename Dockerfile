FROM node:8.4

# Install latest chrome (dev) package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
    sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' &&\
    apt-get update && apt-get install -y google-chrome-unstable

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app/
COPY ./ ./

RUN yarn install

RUN chmod +x ./screenshot.js
ENTRYPOINT ["node", "./screenshot.js"]
