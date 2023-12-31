---
layout: post
title: PyData London 39<sup>th</sup> Meetup 🐍
tags:
  - PyData
  - London
permalink: /blog/pydata-london-39th-meetup
---

<center><img src="/assets/misc/pydata-london.jpeg" width="200"></center>

Last week I got the opportunity to attend and speak at [PyData London's 39<sup>th</sup> Meetup](https://www.meetup.com/PyData-London-Meetup/events/244401841/) at [AHL's](https://www.ahl.com) office.
Our Backend lead at work Prashant is a co-organiser of the meetup.
One of the speakers turned away few days before the meetup, then Prashant asked
me if I could deliver a talk. I realised that I could deliver the talk I proposed
at PyData Delhi which unfortunately didn't got accepted, so I said yes to it and
moreover I love attending and speaking at meetups as it's an awesome way to share
something and also helps in improving your public speaking skills.

I thought it would be like just another python meetup, then I realised that
this meetup gets a huge number of RSVP's than it can accomodate, hence the organisers
do a lottery for finding whose rsvp request will be accepted. This lottery is done 
via a Python script, which uses Meetup.com's API to randomly select participants.
Prashant is the guy responsible for running the script few days before the meetup.

I turned up at the meetup at around 6:30 with Prashant and Federico (my colleague),
We got in at around 6:40 PM, thanks to AHL for sponsoring pizzas and drinks. It was a
house full of around 200 people. It seemed like a mini python conference. I was supposed
to speak first at 7 but had to shift the talk to second slot due to missing usb-c connector.
Meanwhile Dhruv Ghulati delivered a talk on Automated fact checking - technical approaches
and challenges.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Approaches &amp; challenges 4 <a href="https://twitter.com/hashtag/Automated?src=hash&amp;ref_src=twsrc%5Etfw">#Automated</a> <a href="https://twitter.com/hashtag/FactChecking?src=hash&amp;ref_src=twsrc%5Etfw">#FactChecking</a> <a href="https://twitter.com/pydatalondon?ref_src=twsrc%5Etfw">@pydatalondon</a> <a href="https://twitter.com/hashtag/meetup?src=hash&amp;ref_src=twsrc%5Etfw">#meetup</a> using <a href="https://twitter.com/hashtag/MachineLearning?src=hash&amp;ref_src=twsrc%5Etfw">#MachineLearning</a> <a href="https://twitter.com/hashtag/ML?src=hash&amp;ref_src=twsrc%5Etfw">#ML</a> by <a href="https://twitter.com/dhruvghulati?ref_src=twsrc%5Etfw">@dhruvghulati</a> from <a href="https://twitter.com/factmata?ref_src=twsrc%5Etfw">@factmata</a><a href="https://twitter.com/hashtag/PyData?src=hash&amp;ref_src=twsrc%5Etfw">#PyData</a> <a href="https://t.co/uMbNyC5A1Y">pic.twitter.com/uMbNyC5A1Y</a></p>&mdash; Florian Rathgeber (@frathgeber) <a href="https://twitter.com/frathgeber/status/927982157359960065?ref_src=twsrc%5Etfw">November 7, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Then we had a short break and fortunately I got the connector for my
laptop. My talk was based on an introduction to building data pipelines with
[Luigi](https://github.com/spotify/luigi). It was a result of my experiences
working with the Image quality prediction pipeline at [Zomato](https://www.zomato.com/).
I was introduced to luigi by [Shubham Chaudhary](http://shubham.chaudhary.xyz) in one
of our Team Learning sessions at [Zomato](https://www.zomato.com/). The content for
the talk can be found here:

[Data Pipelining with luigi @ PyData London Meetup](https://github.com/aktech/luigi-talk)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/data?src=hash&amp;ref_src=twsrc%5Etfw">#data</a> <a href="https://twitter.com/hashtag/pipelines?src=hash&amp;ref_src=twsrc%5Etfw">#pipelines</a> &amp; <a href="https://twitter.com/hashtag/workflow?src=hash&amp;ref_src=twsrc%5Etfw">#workflow</a> <a href="https://twitter.com/hashtag/management?src=hash&amp;ref_src=twsrc%5Etfw">#management</a> in <a href="https://twitter.com/hashtag/python?src=hash&amp;ref_src=twsrc%5Etfw">#python</a> with <a href="https://twitter.com/hashtag/Luigi?src=hash&amp;ref_src=twsrc%5Etfw">#Luigi</a> by <a href="https://twitter.com/iaktech?ref_src=twsrc%5Etfw">@iaktech</a> <a href="https://twitter.com/pydatalondon?ref_src=twsrc%5Etfw">@pydatalondon</a> <a href="https://twitter.com/hashtag/meetup?src=hash&amp;ref_src=twsrc%5Etfw">#meetup</a> including <a href="https://twitter.com/hashtag/live?src=hash&amp;ref_src=twsrc%5Etfw">#live</a> <a href="https://twitter.com/hashtag/demo?src=hash&amp;ref_src=twsrc%5Etfw">#demo</a>!<a href="https://twitter.com/PyData?ref_src=twsrc%5Etfw">@PyData</a> <a href="https://twitter.com/hashtag/PyData?src=hash&amp;ref_src=twsrc%5Etfw">#PyData</a> <a href="https://t.co/N45jkujwCr">pic.twitter.com/N45jkujwCr</a></p>&mdash; Florian Rathgeber (@frathgeber) <a href="https://twitter.com/frathgeber/status/927999680344154112?ref_src=twsrc%5Etfw">November 7, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I ❤ pipelines! Great intro to Luigi <a href="https://twitter.com/pydatalondon?ref_src=twsrc%5Etfw">@pydatalondon</a> <a href="https://twitter.com/hashtag/DataScience?src=hash&amp;ref_src=twsrc%5Etfw">#DataScience</a> <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a> <a href="https://twitter.com/hashtag/livedemo?src=hash&amp;ref_src=twsrc%5Etfw">#livedemo</a></p>&mdash; Leila Powell (@lc_powell) <a href="https://twitter.com/lc_powell/status/927996746256535552?ref_src=twsrc%5Etfw">November 7, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

After the talks we had some quick lightning talks by Parul Sethi on Visualizing
Topic Models with gensim and another talk by Chenfu Wang on pyexcel.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">⚡ talks <a href="https://twitter.com/pydatalondon?ref_src=twsrc%5Etfw">@pydatalondon</a> <a href="https://twitter.com/hashtag/meetup?src=hash&amp;ref_src=twsrc%5Etfw">#meetup</a>: Chenfu Wang on <a href="https://t.co/TlleDOHrxK">https://t.co/TlleDOHrxK</a> &amp; <a href="https://twitter.com/parul1sethi?ref_src=twsrc%5Etfw">@parul1sethi</a> on <a href="https://twitter.com/hashtag/visual?src=hash&amp;ref_src=twsrc%5Etfw">#visual</a> <a href="https://twitter.com/hashtag/analysis?src=hash&amp;ref_src=twsrc%5Etfw">#analysis</a> of <a href="https://twitter.com/hashtag/topic?src=hash&amp;ref_src=twsrc%5Etfw">#topic</a> <a href="https://twitter.com/hashtag/models?src=hash&amp;ref_src=twsrc%5Etfw">#models</a> with <a href="https://twitter.com/gensim_py?ref_src=twsrc%5Etfw">@gensim_py</a> <a href="https://t.co/HvXBQMG0s6">pic.twitter.com/HvXBQMG0s6</a></p>&mdash; Florian Rathgeber (@frathgeber) <a href="https://twitter.com/frathgeber/status/928003379523149825?ref_src=twsrc%5Etfw">November 7, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

After the talks we went to a bar nearby for socialising and drinks. I met a lot
of people including Lev (developer of gensim) and Parul who came to UK for
PyCon UK and got the chance to sneak into the meetup. It was an amazing evening
spent with people from different domains. I highly recommend this meetup who has
an appetite for Data Science. I am looking forward to the next meetup.

