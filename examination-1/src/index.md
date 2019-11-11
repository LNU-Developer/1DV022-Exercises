---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: defaults
---

<h2>Welcome to {{ site.title }} personal space</h2>

<h3>This is a {{ site.description }} </h3>
<p>Below you will see a few blogg posts and will be able to comment on what you think</p>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.date | date: "%-d %B %Y"}}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>