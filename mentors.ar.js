---
lang: ar
---
{% assign mentors=site.mentors | where:"lang", page.lang %}
let mentors = [
    {% for mentor in mentors %}
      {% include search.json %}{% unless forloop.last %},{% endunless %}
    {% endfor %}
]