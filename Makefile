.PHONY: clean serve clean_serve

all: clean_serve

clean:
	rm -rf _site

serve:
	bundle exec jekyll serve --incremental --livereload

clean-serve: clean serve

update-gems:
	rm Gemfile.lock
	bundle install

install:
	bundle install
