all:
	~/bin/Sencha/Cmd/sencha app build production
public:
	chmod -R ogu+rX build/production/PegelOnline/
	rsync --exclude .git/ --delete -avHAX build/production/PegelOnline/ root@lukas.sluka.de:/srv/www/martin.sluka.de/htdocs/PegelOnline/
