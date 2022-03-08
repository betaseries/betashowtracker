translation:
	npm run translation
build:
	make translation
	yarn build
deploy:
	yarn install
	make build
	make package
package :
	rm -rf ./betaseriesExtension.zip
	cp -R ./dist betaseriesExtension
	zip -r betaseriesExtension ./betaseriesExtension
	rm -rf ./betaseriesExtension
