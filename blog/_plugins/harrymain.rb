# Plugin to have :smiley: in your jekyll blogs
# it uses the famous Emoji-Cheat-Sheet : 'http://www.emoji-cheat-sheet.com/'
#


require 'net/http'

module Jekyll
  module Harry
    # returns an image tag, having image source as local image file
    def ImageTag(smiley)
      '<img src="/public/smileys/'+smiley+'.png" title=":'+smiley+':" height="20px" width="20px" style="display:inline;margin:0;vertical-align:middle"/>'
    end

    # stores an image locally, by default it store in '/public/smileys'
    def ImageStore(smiley)
      Net::HTTP.start('www.emoji-cheat-sheet.com') do |http|
        res = http.get('/graphics/emojis/'+smiley+'.png')
        File.open('public/smileys/'+smiley+'.png', 'wb') { |file| file.write(res.body) }
      end
    end

    # checks, if a smiley actually exists or not
    def SmileyExist(smiley)
      uri = URI('http://www.emoji-cheat-sheet.com/graphics/emojis/'+smiley+'.png')
      res = Net::HTTP.get_response(uri)

      if res.code == '200'
        return true
      else
        return false
      end
    end

    def Harry(text)
      # matches all :smiley: style text in content
      text.to_str.gsub(/:([a-z0-9]+):/) do |match|

        # proposed image path, if image is locally available
        local_image = File.join(Dir.pwd, 'public', 'smileys', $1+'.png')

        # returns image tag, if image locally exists
        if File.exist?(local_image)
          ImageTag($1)

        # image doesn't exists locally
        else
          # stores the image and returns image tag, if smiley is valid
          if SmileyExist($1)
            ImageStore($1)
            ImageTag($1)
          else
            ':'+$1+':'
          end
        end

      end
    end
  end
end

# registers this custom filter globally
Liquid::Template.register_filter(Jekyll::Harry)
