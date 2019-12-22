#/usr/bin/env bash
# Bash script for deploying CRA to now.sh & uploading sourcemaps to sentry
BUILD_DIRECTORY=./build
DEPLOY_DIRECTORY=./deploy

# Run checks & create production build
yarn run check
yarn test:ci
yarn build

# Copy bundled files into `deploy` directory
# - exclude sourcemaps due to free tier's file size limit (1MB)
rm -rf deploy
cp -R build ${DEPLOY_DIRECTORY}
cp now.json ${DEPLOY_DIRECTORY}
rm ${DEPLOY_DIRECTORY}/static/**/*.map

# Deploy files in `deploy` directory
now ${DEPLOY_DIRECTORY} --public --prod
now alias

# Upload sourcemaps to sentry
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT new $REACT_APP_VERSION
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT files $REACT_APP_VERSION \
  upload-sourcemaps --url-prefix $REACT_APP_DOMAIN $BUILD_DIRECTORY
