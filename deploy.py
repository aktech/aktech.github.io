"""
Code to deploy blog with just one command: $ ./deploy.py

Note: The code was written, when I was half concious during a 20 hour
layover at Doha international Airport & Yes its ugly though it works
probably.
"""

import os
import re
import subprocess

all_commands = [
    'cp blog-gen/_site/timeline/index.html timeline/',
    'cp blog-gen/_site/tags/index.html tags',
    'cp blog-gen/_site/index.html blog/',
    'cp blog-gen/_site/talks/index.html talks',
    'cp blog-gen/_site/about/index.html about',
    'cp -rf blog-gen/_site/feeds/ blog/feeds/',
    'cp -rf blog-gen/_site/assets/ assets/',
]


def run_commands(all_commands):
    for command in all_commands:
        subprocess.call(command.split())

def make_posts():
    blog_gen_dir = 'blog-gen/_site/blog/'
    all_blog_post_html = os.listdir(blog_gen_dir)

    # Delete and create blog folder
    subprocess.call(['rm', '-rf', 'blog'])
    subprocess.call(['mkdir', 'blog'])

    for post_html_file_name in all_blog_post_html:
        fp = open(blog_gen_dir + post_html_file_name, 'r')
        post_html = fp.read()
        found = re.findall("data-href=http://iamit.in/blog/(.*) data-action", post_html)

        if found:
            post_folder_name = found[0]
        else:
            continue

        subprocess.call(['mkdir', 'blog/' + post_folder_name])
        subprocess.call(['cp', 'blog-gen/_site/blog/' + post_html_file_name, 'blog/' + post_folder_name])

        post_folder_directory = 'blog/' + post_folder_name + '/'
        import ipdb;ipdb.set_trace()
        subprocess.call(['mv', post_folder_directory + post_html_file_name,
                         post_folder_directory + 'index.html'])


# run commands
make_posts()
run_commands(all_commands)

