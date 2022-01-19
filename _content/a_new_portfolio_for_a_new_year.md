---
title: "A New Portfolio For A New Year"
layout: "post"
date: "2021-12-27T22:02:06.006Z"
summary: "Why I decided to rebuild my portfolio site. Take a peek into my thinking process for the Tech Stack this site is built with."
hero: "/blog_heros/japan-530347.jpg"
hero_alt: "Torii Gate at Dusk"
tags: ["next", "javascript", "react", "blog"]
---

### What was wrong with the last one?:

There wasn't anything wrong with the original portfolio website but I felt it needed a little of my touch in it. My original portfolio site was a Bootstrap template site that while it looked pleasing, didn't show any of my skills in my tool box. I was able to show things I had built but it didn't leave me feeling all warm and fuzzy since I had not built any of it myself.

## Basic React, Gatsby, or NextJS

I briefly considered building the site completly from scratch but I already have a site that I have built with React/Redux and it works well. It does have a blog and is built on a MERN stack.
I thought that I would move everything over into Gatsby since I had heard great things about it. I split the static HTML from the Bootstrap site into small sections and made components out of them since Gatsby builds on React under the hood. Everything went well until I removed Bootstrap and tried set out to style the site with CSS like the original Bootstrap template but with my own tweaks. This did not go so well.
I had a little trouble replicating the layout of the Bootstrap site in my CSS. Everything devolved fairly quickly and I decided to try and integrate TailwindCSS into Gatsby to try to fix my issues with CSS. I was able to get some of the components to look similar but not quite right. I made an executive decision to toss the project and start over.
I then found NextJS and I thought hard on this one as it was a new foundation for me. Still built on top of React but with some of it's own quirky features. I still used TailwindCSS since I wanted to give it a fair shake down to see if it was all that I heard it was cracked up to be.

## TailwindCSS and NextJS

There were a couple of integration steps to build the site with Tailwind and Next. I kept my original React components from the Gatsby site and removed all mention of any CSS classes in them. Starting with the Nav-Bar, I slowly built up the site how I thought it should look for this iteration. No more trying to duplicate the Bootstrap template look.
There were a few stumbling blocks along the way that I was able to work through. There were a few spots where I added Tailwind class names to a couple of different parts in the code that caused me a few headaches. I'm sad to say that I spent quite a bit of time trying to track down what was causing my CSS to not work properly. But, I finally tracked down the issue and removed the offending class names or even some divs that were un-needed.

## Adding a blog with MDX

I had decided early on that I wanted to build a tech blog into my portfolio. I had thought about using a database like I did in my other personal site but I quickly nixed that idea in favor of MDX. The only requirement I had was I wanted it to have syntax highlighted code blocks. I was able to drop in the blog design fairly easily.
I then had a little difficulty sprinkling in the MDX into the existing setup. I had a couple of issues with the package `next-mdx-remote`.
What I had found was that `next-mdx-remote` underwent some breaking changes earlier this year. That package's documents leave a lot to be desired as they didn't help with the integration that I needed and wanted. I looked at tutorials for using MDX with that package and was sorely disappointed even the newest ones utilized the old format for working with `next-mdx-remote`.  
I looked through StackOverflow with no help in sight for my problems. I think chose to throw a hail mary at Github and I was able to search through repositories that used the syntax that I was using and finally found valid piece of code that lead me to the aha moment and made everything click.
I then integrated `remark-prism` and `prism-tmemes` in to my code so that I could have my code block syntax highlighting. It worked very nicely. That was the easiest part of this build by far.

The final portion that took a little researching and building of new Ubuntu Server running iRedMail so that I had my own personal e-mail server. I then integrated a contact form with `sanitize-html`, `react-google-recaptcha` and `nodemailer` to have an easy way for people to contact me without publicly posting any email or contact details.

## Conclusion

I hope to be able to provide a little more information on my particular pain points during this project in an upcoming post.
