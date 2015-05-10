all:	
	browserify main.js -o index.js
	git add .
	git commit -m fix
	git push origin gh-pages
