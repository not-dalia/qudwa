# Jekyll Test Site
This is a test repo


## Usage
To run this site: 
```
bundle exec jekyll serve --watch
```

## Notes to self
The index page uses the `landing.html` layout. The purpose of this is to redirect the user to the site with the right language. This is decided by checking whethere the `localStorage` is used and has a `lang` defined. If not, it checks the user's browser language. If it can't find anything it defaults to english.



