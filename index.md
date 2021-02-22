---
# In dev mode, border around slides are not shown.
# Also, disqus will be hidden for faster reloading.
dev: true
---

<!-- TITLE SLIDE -->
{% include_relative sections/title-slide.md %}

<!-- Dissertation Projects -->
{% include_relative sections/fam.md %}
{% include_relative sections/rfam.md %}
{% include_relative sections/zinf.md %}

<!-- REFERENCES -->
<section>
  <h1>References</h1>
  <div bibliography="assets/data/bib.json"></div>
</section>

<!-- BACKUP SLIDES-->
<div class="backup-slides">
  {% include_relative sections/fam-backup.md %}
  {% include_relative sections/rfam-backup.md %}
  {% include_relative sections/zinf-backup.md %}
</div>

<!-- TODO: 
  - code syntax highlight
  - Handle printing. 
  - set a url parameter?
-->
