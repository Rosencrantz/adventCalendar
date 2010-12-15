(function($) { 
  	var app = $.sammy('#calendar > .group', function() {
    this.use(Sammy.Template);

    this.swap = function(content) {
      $(this.$element()).append(content);
    };
  
    //Wraps around each request. Load up the data
    this.around(function(callback) {
		var context = this;
		this.load('assets/data/advent.json').then(function(items) {
	    	context.items = items;
	  	}).then(function() {
	    	if(!$('#calendar > .group').contents().length) {
	    		this.renderEach('assets/templates/item.template', context.items)
				.appendTo(context.$element())
				.then(callback);
	    	}	
			callback();
	  	});
    });

	//Only really used when the application is first started
    this.get('#/', function(context) {
      this.trigger('closeModal');
    });
    
	//Display the advent item
    this.get('#/:id', function(context) {
      this.trigger('hideSlide');
	  this.trigger('openAdvent', {id: this.params.id, path: this.path});
    });

	//Load the data for the slide and trigger display
    this.get('#/:id/slide', function(context) {
		this.trigger('hideSlide');
		var appContext = this;
		this.render('assets/templates/slide.template', {id: this.params.id, close: this.path.replace('/slide','')})
		.appendTo($('#modal #content'))
		.then(function() { 
			appContext.trigger('showSlide', {id: appContext.params.id, path: context.items[appContext.params.id].slide})
		});
    });

	//display the slide
	this.bind('showSlide', function(e, data) {
		this.load(data['path']).then(function(content) {
			$('#slide' + data['id'] + ' .slideContent').html(content);
			$('#slide' + data['id']).addClass('view');
			$('#modal').show();			
		});
	});
	
	//hides a slide from view
	this.bind('hideSlide', function(e, data) {
		$('#modal').hide();
		$('#modal #content').html('');
	});

	//opens the door on an advent calendar
    this.bind('openAdvent', function(e, data) {
      var item = $('a[href=' + data['path'] + ']').parents('.item');
      item.addClass('open');
    });

	//displays a slide once a door is opened
    this.bind('webkitTransitionEnd', function(e, data) {
		if($(e.target).hasClass('adventContent')) {
	  		this.redirect($(e.target).children('a').attr('href'));
		}
    }); 
  });

  $(function() {   
    app.run('#/');
  });

})(jQuery);
