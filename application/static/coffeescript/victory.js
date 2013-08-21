// Generated by CoffeeScript 1.6.3
(function() {
  var user_agent, victory;

  victory = {
    userLevel: {
      root: 0,
      normal: 1
    },
    loginUrl: '',
    isIE: false,
    isSafari: false,
    user: {
      userId: 0,
      level: 1,
      name: null,
      email: null,
      isLogin: false,
      isRoot: function() {
        return victory.user.level === victory.userLevel.root;
      }
    },
    ajax: function(args) {
      if (args == null) {
        args = {};
      }
      if (args.type == null) {
        args.type = 'get';
      }
      if (args.cache == null) {
        args.cache = false;
      }
      if (args.data == null) {
        args.data = '';
      }
      return $.ajax({
        url: args.url,
        type: args.type,
        cache: args.ache,
        data: args.data,
        beforeSend: function(xhr) {
          victory.loading.on('Loading...');
          if (args.beforeSend) {
            return args.beforeSend();
          }
        },
        success: function(r, status, xhr) {
          victory.loading.off();
        }
      });
    },
    loading: {
      on: function(message) {
        /*
        loading
        */

        var loading, loading_height;
        $('body, a, .table-pointer tbody tr').css({
          cursor: 'wait'
        });
        if (victory.isIE) {
          return;
        }
        if ($('#loading').length > 0) {
          $('#loading .message').html(message);
          return;
        }
        loading = $('<div id="loading"><div class="spin"></div><div class="message">' + message + '</div><div class="clear"></div></div>');
        $('body').append(loading);
        loading_height = $('#loading').height();
        $('#loading').css({
          bottom: -loading_height
        });
        $('#loading').animate({
          bottom: '+=' + (loading_height + 10)
        }, 400, 'easeOutExpo');
        return Spinner({
          color: '#444',
          width: 2,
          length: 4,
          radius: 4
        }).spin($('#loading .spin')[0]);
      },
      off: function() {
        var loading_height;
        $('body').css({
          cursor: 'default'
        });
        $('a, .table-pointer tbody tr').css({
          cursor: 'pointer'
        });
        if (victory.isIE) {
          return;
        }
        $('#loading').dequeue();
        loading_height = $('#loading').height() + 10;
        return $('#loading').animate({
          bottom: '-=' + loading_height
        }, 400, 'easeInExpo', function() {
          return $(this).remove();
        });
      }
    },
    setup: {
      all: function() {
        var key;
        for (key in this) {
          if (key !== 'all') {
            this[key]();
          }
        }
      },
      tooltip: function() {
        /*
        tool tip
        */

        return $('[rel="tooltip"]').tooltip();
      }
    },
    getUserProfile: function() {
      /*
      update login status
      */

      var _this = this;
      $.ajax({
        url: '/me',
        type: 'get',
        dataType: 'json',
        cache: false,
        async: false,
        error: function(r) {
          return _this.user.isLogin = false;
        },
        success: function(r) {
          return _this.user = r;
        }
      });
      return this.user;
    }
  };

  window.victory = victory;

  user_agent = navigator.userAgent.toLowerCase();

  victory.isIE = user_agent.indexOf('msie') !== -1;

  victory.isSafari = user_agent.indexOf('safari') !== -1 && user_agent.indexOf('chrome') === -1;

}).call(this);
