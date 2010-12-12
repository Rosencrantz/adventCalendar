(function($) { 

  var app = $.sammy('#calendar', function() {
    this.use(Sammy.Template);
    var that = this;

    this.swap = function(content) {
      $(this.$element().children('.group')[0]).append(content);
    };
  
    //Wraps around each request. Load up the data
    this.around(function(callback) {
      var context = this;
	this.load('assets/data/advent.json')
	  .then(function(items) {
	    context = this;
	    context.wait();
	    context.items = items;
	  })
	  .then(function() {
	    if($('#calendar > .group').contents().length == 0) {
	      this.renderEach('assets/templates/item.template', context.items).appendTo($('#calendar > .group')[0])
		  .then(function() {
		    if(~this.event_context.path.indexOf('slides')) {
		      this.trigger('multiOpen', {id: this.event_context.params.id});
		      this.renderEach('assets/templates/slide.template', this.items[this.event_context.params.id].slides).appendTo($('#modal #content'))
			  .then(callback);
		    } else {
		      callback();
		    }
		  });
	    } else {
	      if(~this.event_context.path.indexOf('slides')) {
		this.renderEach('assets/templates/slide.template', this.items[this.event_context.params.id].slides).appendTo($('#modal #content'))
		    .then(callback);
	      } else {
		callback();
	      }
	    }
	  })
    });

    this.get('#/', function(context) {
      this.trigger('closeModal');
    });
    
    this.get('#/:id', function(context) {
      $('#modal').hide();
      var item = $('a[href=' + this.path + ']').parents('.item');
      item.addClass('open');
    });

    this.get('#/:id/slides', function(context) {
      $('#modal #content').html('');
      this.redirect(context.path + '/0');
    });
    
    this.get('#/:id/slides/:slide', function(context) {
      $('#slide' + this.params.slide + ' ~ .view').removeClass('view');
      $('#slide' + this.params.slide).addClass('view');
      $('#modal').show();
    });

    this.bind('show', function(e, data) {
      
      $(data['item'].selector).prevAll().addClass('view');
      data['item'].addClass('view');
      $(data['item'].selector).nextAll().removeClass('view');

    });

    this.bind('hide', function(e, data) {
      data['item'].removeClass('view');
    });

    this.bind('closeModal', function(e, data) {
      $('#modal').hide();
      $('#modal .slide').html('');
      $('#modal .codeExample').html('');
    });

    this.bind('open', function(e, data) {
      var item = $('a[href=' + data['adventId'] + ']').parents('.item');
      item.addClass('open');
    });

    this.bind('multiOpen', function(e, data) {
      for(var i =0; i <= Number(data['id']); i++) {
	this.trigger('open', {adventId: '#/' + i});
      }
    });
    
  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
