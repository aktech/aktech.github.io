# Author : Pravendra Singh
# Twitter : @hackpravj
#
# map tags to posts and store generated data to site.pages variable
# here this data is being used to render all posts under each tags on a seperate page

module Jekyll
  # this plugin comes under 'Generator' category of jekyll plugins
  class TagGenerator < Generator
    def generate(site)
      # variable that will contain all mapping data
      tagdata = {}

      # loop over all posts
      site.posts.docs.each do |post|
        # loop over all tags for a post
        post['tags'].each do |tag|
          # add metadata about post to tagdata
          if tagdata.has_key?(tag)
            tagdata[tag] << {"url"=>post.url, "title"=>post['title']}
          else
            tagdata[tag] = [{"url"=>post.url, "title"=>post['title']}]
          end
        end
      end

      # add tagdata to site.pages variable for global use
      site.pages <<  TagPage.new(site, site.source, "blog/tags", "index.html", tagdata)
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, name, tagdata)
      super(site, base, dir, name)
      self.data['tagdata'] = tagdata
    end
  end
end
