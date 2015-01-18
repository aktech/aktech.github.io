<div class="projector">

	<div class="projector-middle-side">
		{% for element in site.data.cursor reversed %}
		<div class="element-title">
			{{element.title}}
		</div>
		<hr>

		<div class="element-info">
			{{element.info}}
		</div>

		<div class="element-data">
			<img src="images/{{element.image}}">
		</div>

		<div class="element-meta-data">
			<div class="meta-data-date">
				{{element.date}}
			</div>

			<div class="meta-data-tags">
				{{element.tags}}
			</div>
		</div>

		<hr>
		</br>
		</br>
		{% endfor %}
	</div>

</div>