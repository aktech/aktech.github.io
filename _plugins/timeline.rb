# http://tech.pro/tutorial/1299/getting-started-with-jekyll-plugins
# I changed to use reversed data so that latest(by time) is rendered first

module Jekyll
  class ArchivesGenerator < Generator
    def generate(site)
      years = {}
      site.posts.docs.each do |post|
        if years.has_key?(post.date.year)
          years[post.date.year] << {"url"=>post.url, "title"=>post['title']}
        else
          years[post.date.year] = [{"url"=>post.url, "title"=>post['title']}]
        end
      end

      site.pages <<  ArchivesPage.new(site, site.source, "timeline", "index.html", years)
    end
  end

  class ArchivesPage < Page
    def initialize(site, base, dir, name, years)
      super(site, base, dir, name)
      self.data['years'] = years
    end
  end
end
