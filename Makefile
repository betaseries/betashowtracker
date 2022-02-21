translation:
	npm run translation
build:
	make translation
	yarn build
package :
	cp -R ./dist betaseriesExtension
	zip -r betaseriesExtension ./betaseriesExtension
	rm -rf ./betaseriesExtension
