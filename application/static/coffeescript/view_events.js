// Generated by CoffeeScript 1.6.3
(function() {
  var ViewEvents, ViewEventsAccount, ViewEventsApplication, ViewEventsDocument, ViewEventsSwitchApplicationi, ViewEventsUser;

  ViewEventsApplication = (function() {
    /*
    event of views about applications.
    */

    function ViewEventsApplication() {
      this.show_modal_for_add_application();
      this.update_application();
      this.delete_application();
      this.invite_user();
      this.delete_viewer();
    }

    ViewEventsApplication.prototype.show_modal_for_add_application = function() {
      /*
      show adding application modal.
      */

      $(document).on('keypress', 'input.appended_input_application', function(e) {
        if (e.keyCode === 13) {
          $(this).parent().find('a').click();
          return false;
        }
      });
      return $(document).on('shown', '#form_add_application', function() {
        $('#name').val($('.appended_input_application').val());
        return $('#name').focus();
      });
    };

    ViewEventsApplication.prototype.update_application = function() {
      /*
      update the application.
      :param url: $(this).attr('action')
      :param data: $(this).serialize()
      */

      return $(document).on('submit', 'form.form_application', function() {
        if (!core.validation($(this).find('.modal-body'))) {
          return false;
        }
        $.ajax({
          type: 'put',
          url: $(this).attr('action'),
          dataType: 'json',
          cache: false,
          data: $(this).serialize(),
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function(e) {
            var _ref;
            core.loading_off();
            if ((_ref = e.status) === 400 || _ref === 417) {
              return $.av.pop({
                title: 'Error',
                message: 'Please check again.',
                template: 'error'
              });
            } else {
              return core.error_message();
            }
          },
          success: function() {
            core.loading_off();
            return core.miko({
              href: location.href
            }, false);
          }
        });
        $($(this).closest('.modal')).modal('hide');
        return false;
      });
    };

    ViewEventsApplication.prototype.delete_application = function() {
      /*
      delete the application.
      :param url: $(this).attr('href')
      :param application_id: $(this).attr('application_id')
      :param application_name: $(this).attr('application_name')
      */

      return $(document).on('click', 'a.delete_application', function() {
        $.ajax({
          type: 'delete',
          url: $(this).attr('href'),
          dataType: 'json',
          cache: false,
          data: {
            id: $(this).attr('document_id')
          },
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function(e) {
            var _ref;
            core.loading_off();
            if ((_ref = e.status) === 400 || _ref === 417) {
              return $.av.pop({
                title: 'Error',
                message: 'Please check again.',
                template: 'error'
              });
            } else {
              return core.error_message();
            }
          },
          success: function() {
            core.loading_off();
            return core.miko({
              href: location.href
            }, false);
          }
        });
        $($(this).closest('.modal')).modal('hide');
        return false;
      });
    };

    ViewEventsApplication.prototype.invite_user = function() {
      /*
      invite a user with the application.
      :param url: $(this).attr('href')
      :param email: $(this).closest('.input-append').find('input[type=text]')
      */

      $(document).on('click', 'a.invite', function() {
        var $application_form, $invite_email;
        if (!core.validation($(this).closest('.input-append'))) {
          return false;
        }
        $application_form = $(this).closest('form');
        $invite_email = $(this).closest('.input-append').find('input[type=text]');
        $.ajax({
          type: 'post',
          url: $(this).attr('href'),
          dataType: 'json',
          cache: false,
          data: {
            email: $invite_email.val()
          },
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function(e) {
            var _ref;
            core.loading_off();
            if ((_ref = e.status) === 400 || _ref === 403 || _ref === 417) {
              return $invite_email.closest('.control-group').addClass('error');
            } else {
              return core.error_message();
            }
          },
          success: function() {
            core.loading_off();
            $application_form.modal('hide');
            $.av.pop({
              title: 'Successful!',
              message: $invite_email.val() + ' will get a invited email.'
            });
            return core.miko({
              href: location.href
            }, false);
          }
        });
        return false;
      });
      return $(document).on('keypress', 'input.invite', function(e) {
        if (e.keyCode === 13) {
          $('a.invite').click();
          return false;
        }
      });
    };

    ViewEventsApplication.prototype.delete_viewer = function() {
      /*
      delete a viewer in an application.
      :param url: $(this).attr('href')
      */

      return $(document).on('click', 'a.delete_viewer', function() {
        var $member_div;
        $member_div = $(this).closest('div');
        $.ajax({
          type: 'delete',
          url: $(this).attr('href'),
          dataType: 'json',
          cache: false,
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function() {
            core.loading_off();
            return core.error_message();
          },
          success: function(r) {
            core.loading_off();
            if (r.success) {
              return $member_div.remove();
            }
          }
        });
        return false;
      });
    };

    return ViewEventsApplication;

  })();

  ViewEventsSwitchApplicationi = (function() {
    /*
    switch application then update nav link href.
    */

    function ViewEventsSwitchApplicationi() {
      this.change_nav();
    }

    ViewEventsSwitchApplicationi.prototype.change_nav = function() {
      return $(document).on('click', '.change_nav', function() {
        var app_id;
        app_id = $(this).attr('application_id');
        $('#nav_bar a[href^="/crash_groups"]').attr('href', '/crash_groups/' + app_id);
        $('#nav_bar a[href^="/exception_groups"]').attr('href', '/exception_groups/' + app_id);
        $('#nav_bar a[href^="/log_groups"]').attr('href', '/log_groups/' + app_id);
      });
    };

    return ViewEventsSwitchApplicationi;

  })();

  ViewEventsUser = (function() {
    /*
    event of views about users.
    */

    function ViewEventsUser() {
      this.delete_user();
    }

    ViewEventsUser.prototype.delete_user = function() {
      /*
      delete the user.
      :param url: $(this).attr('href')
      */

      return $(document).on('click', 'a.delete_user', function() {
        if (!core.validation($(this))) {
          return false;
        }
        $.ajax({
          type: 'delete',
          url: $(this).attr('href'),
          dataType: 'json',
          cache: false,
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function() {
            core.loading_off();
            return core.error_message();
          },
          success: function(r) {
            if (r.success) {
              return core.miko({
                href: location.href
              }, false);
            } else {
              return $.av.pop({
                title: 'Error',
                message: 'Please check again.',
                template: 'error'
              });
            }
          }
        });
        return false;
      });
    };

    return ViewEventsUser;

  })();

  ViewEventsAccount = (function() {
    /*
    event of views about account.
    */

    function ViewEventsAccount() {
      this.update_profile();
    }

    ViewEventsAccount.prototype.update_profile = function() {
      /*
      update profile.
      :param url: $(this).attr('action')
      :param data: $(this).serialize()
      */

      return $(document).on('submit', 'form#form_profile', function() {
        if (!core.validation($(this))) {
          return false;
        }
        $.ajax({
          type: 'put',
          url: $(this).attr('action'),
          dataType: 'json',
          cache: false,
          data: $(this).serialize(),
          beforeSend: function() {
            return core.loading_on(core.text_loading);
          },
          error: function() {
            core.loading_off();
            return core.error_message();
          },
          success: function(r) {
            core.loading_off();
            if (r.success) {
              $.av.pop({
                title: 'Successful!',
                message: 'Data had be Saved.',
                mode: 'alert'
              });
              $('#name').val(r.name);
              return $($('.profile p')[0]).text(r.name);
            } else {
              return $.av.pop({
                title: 'Error',
                message: 'Please check again.',
                template: 'error'
              });
            }
          }
        });
        return false;
      });
    };

    return ViewEventsAccount;

  })();

  ViewEventsDocument = (function() {
    /*
    event of views about documents.
    */

    function ViewEventsDocument() {
      this.click_document_group();
    }

    ViewEventsDocument.prototype.click_document_group = function() {
      /*
      click document group then go to documents view.
      :param url: $(this).attr('href')
      */

      return $(document).on('click', 'tr.document_group', function() {
        core.miko({
          href: $(this).attr('href')
        }, true);
        return false;
      });
    };

    return ViewEventsDocument;

  })();

  ViewEvents = (function() {
    function ViewEvents() {
      new ViewEventsApplication();
      new ViewEventsSwitchApplicationi();
      new ViewEventsUser();
      new ViewEventsAccount();
      new ViewEventsDocument();
    }

    return ViewEvents;

  })();

  $(function() {
    core.setup();
    new ViewEvents();
    return core.after_page_loaded();
  });

}).call(this);
