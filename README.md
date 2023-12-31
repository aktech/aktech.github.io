# Personal Blog and webpage on Github Pages

Webpage: http://iamit.in
Blog: http://iamit.in/blog

## Locally running the blog

* Make sure you have jekyll and bundle installed, then run the following, commands:

```bash
bundle install
bundle exec jekyll serve
```

## Updating tags and timeline

* Copy the tags and timeline generator into blog/

```bash
cp -r blog/tags_timeline_gen/* blog/
```

* Now make sure the jekyll serve is running (see the command above), then you'll have
the generated tags and timeline in the `_site/blog` folder, run the following to copy
them into `blog/` folder

```bash
cp -r _site/blog/timeline blog/
cp -r _site/blog/tags blog/
```

Now commit and push!


## Generating Html directory from html files

```bash
python scripts/generate_directory_index3.py folder_with_html_files
```

## RSS Feed

* Blog (All Posts) Feed: http://iamit.in/blog/feeds/atom.xml
* Blog (SymPy/GSoC Posts) Feed: http://iamit.in/blog/feeds/sympy.xml

## Writing a Post

* Change the `baseurl` in the `_config.url` from `https://iamit.in/` to `/` (Don't know of a better solution).
* If your post includes any media, add it into the assets folder.
* Create your blog post in the `_post` directory by copying any previous posts, notice the naming scheme, which corresponds to the publishing date.
* Run `./deploy.sh` and push to github.
