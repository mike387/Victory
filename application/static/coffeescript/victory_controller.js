// Generated by CoffeeScript 1.6.3
(function() {
  var c, pageSize;

  pageSize = 20;

  c = angular.module('victory.controller', []);

  c.controller('NavigationCtrl', function($scope) {
    /*
    Navigation Controller
    
    :scope select: selected ui-router node name
    */

    var delay;
    delay = function(ms, func) {
      return setTimeout(func, ms);
    };
    return $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $scope.select = toState.name;
      $('.modal.in').modal('hide');
      return delay(0, function() {
        return $('#js_navigation li.select').mouseover();
      });
    });
  });

  c.controller('IndexCtrl', function($scope) {
    /*
    /
    */

    $scope.title = victory.titleSuffix;
    if (!victory.user.isLogin) {
      return location.href = '#/login';
    }
  });

  c.controller('LoginCtrl', function($scope) {
    /*
    /login
    */

    return $scope.loginUrl = victory.loginUrl;
  });

  c.controller('SettingsMenuCtrl', function($scope, $state) {
    /*
    The controller of the settings menu
    */

    return $scope.active = $state.current.name;
  });

  c.controller('SettingsCtrl', function() {
    /*
    /settings
    */

    return location.href = '#/settings/applications';
  });

  c.controller('SettingsApplicationsCtrl', function($scope, $http) {
    /*
    /settings/applications
    
    :scope name: new application name
    :scope description: new application description
    :scope items: [{id, name, newName, description, newDescription
                        app_key, create_time, is_owner, members:[{id, name, email, is_owner}]
                        }]
    */

    $scope.getApplications = function() {
      /*
      Get applications.
      */

      return victory.ajax($http, {
        url: '/settings/applications',
        success: function(data) {
          var item, _i, _len, _ref;
          _ref = data.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.newName = item.name;
            item.newDescription = item.description;
          }
          return $scope.items = data.items;
        }
      });
    };
    $scope.addApplication = function() {
      /*
      Add an application.
      */

      return victory.ajax($http, {
        method: 'post',
        url: '/settings/applications',
        data: {
          name: $scope.name,
          description: $scope.description
        },
        error: function(data, status) {
          if (status === 400 && data) {
            return $scope.errors = data;
          }
        },
        success: function() {
          $scope.name = '';
          $scope.description = '';
          $('.modal.in').modal('hide');
          return $scope.getApplications();
        }
      });
    };
    $scope.updateApplication = function(id) {
      /*
      Update the application.
      */

      var updateItem, x;
      updateItem = ((function() {
        var _i, _len, _ref, _results;
        _ref = $scope.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          if (x.id === id) {
            _results.push(x);
          }
        }
        return _results;
      })())[0];
      return victory.ajax($http, {
        method: 'put',
        url: "/settings/applications/" + id,
        data: {
          name: updateItem.newName,
          description: updateItem.newDescription
        },
        error: function(data, status) {
          if (status === 400 && data) {
            return updateItem.errors = data;
          }
        },
        success: function() {
          $('.modal.in').modal('hide');
          return $scope.getApplications();
        }
      });
    };
    $scope.deleteApplication = function(id) {
      /*
      Delete the application.
      */

      return victory.ajax($http, {
        method: 'delete',
        url: "/settings/applications/" + id,
        success: function() {
          $('.modal.in').modal('hide');
          return $scope.getApplications();
        }
      });
    };
    $scope.inviteUser = function(id, email) {
      /*
      Invite an user into the application.
      */

      return victory.ajax($http, {
        method: 'post',
        url: "/settings/applications/" + id + "/members",
        data: {
          email: email
        },
        success: function() {
          $('.modal.in').modal('hide');
          return $scope.getApplications();
        }
      });
    };
    $scope.deleteMenter = function(applicationId, memberId) {
      /*
      Delete the member from the application.
      */

      return victory.ajax($http, {
        method: 'delete',
        url: "/settings/applications/" + applicationId + "/members/" + memberId,
        success: function() {
          var application, x;
          application = ((function() {
            var _i, _len, _ref, _results;
            _ref = $scope.items;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              if (x.id === applicationId) {
                _results.push(x);
              }
            }
            return _results;
          })())[0];
          return application.members = (function() {
            var _i, _len, _ref, _results;
            _ref = application.members;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              if (x.id !== memberId) {
                _results.push(x);
              }
            }
            return _results;
          })();
        }
      });
    };
    return $scope.getApplications();
  });

  c.controller('SettingsUsersCtrl', function($scope, $http) {
    /*
    /settings/users
    */

    $scope.getUsers = function() {
      /*
      Get users.
      */

      return victory.ajax($http, {
        url: '/settings/users',
        success: function(data) {
          return $scope.items = data.items;
        }
      });
    };
    $scope.addUser = function() {
      /*
      Add an user.
      */

      return victory.ajax($http, {
        method: 'post',
        url: '/settings/users',
        data: {
          email: $scope.email
        },
        success: function() {
          $scope.email = '';
          return $scope.getUsers();
        }
      });
    };
    $scope.deleteUser = function(id) {
      /*
      Delete the user.
      */

      return victory.ajax($http, {
        method: 'delete',
        url: "/settings/users/" + id,
        success: function() {
          var x;
          return $scope.items = (function() {
            var _i, _len, _ref, _results;
            _ref = $scope.items;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              if (x.id !== id) {
                _results.push(x);
              }
            }
            return _results;
          })();
        }
      });
    };
    return $scope.getUsers();
  });

  c.controller('SettingsProfileCtrl', function($scope, $http) {
    /*
    /settings/profile
    */

    $scope.getProfile = function() {
      return victory.ajax($http, {
        url: '/settings/profile',
        success: function(data) {
          return $scope.profile = data;
        }
      });
    };
    $scope.updateProfile = function() {
      return victory.ajax($http, {
        method: 'put',
        url: '/settings/profile',
        data: {
          name: $scope.profile.name
        },
        error: function(data, status) {
          if (status === 400 && data) {
            return $scope.errors = data;
          }
        },
        success: function() {
          return $scope.getProfile();
        }
      });
    };
    return $scope.getProfile();
  });

  c.controller('GroupedDocumentsCtrl', function($scope, $state, $stateParams, $http) {
    /*
    /crashes/grouped
    /exceptions/grouped
    /logs/grouped
    
    :scope documentMode: <crashes/exceptions/logs>
    :scope selectedApplicationId: application id
    :scope searchKeyword: search keywords
    :scope page: current page
    :scope applications: [{id, name, description,
                        app_key, create_time, is_owner}]
    :scope documents: [{group_tag, create_time, name, email, title, description, times}]
    :scope page: {total, index, max}
    */

    if ($state.current.name.indexOf('exception')) {
      $scope.documentMode = 'exceptions';
    } else if ($state.current.name.indexOf('log')) {
      $scope.documentMode = 'logs';
    } else {
      $scope.documentMode = 'crashes';
    }
    if (sessionStorage.selectedApplication) {
      $scope.selectedApplication = JSON.parse(sessionStorage.selectedApplication);
    }
    $scope.getApplications = function() {
      /*
      Get applications
      */

      return victory.ajax($http, {
        url: '/applications',
        hideLoadingAfterDone: false,
        success: function(data) {
          var x, _ref;
          $scope.applications = data.items;
          if (data.items.length > 0) {
            if (!$scope.selectedApplication || ((_ref = $scope.selectedApplication.id) !== (function() {
              var _i, _len, _ref1, _results;
              _ref1 = data.items;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                x = _ref1[_i];
                _results.push(x.id);
              }
              return _results;
            })())) {
              $scope.selectedApplication = data.items[0];
              sessionStorage.selectedApplication = JSON.stringify($scope.selectedApplication);
            }
            return $scope.getGroupedDocuments($scope.selectedApplication.id);
          } else {
            return victory.loading.off();
          }
        }
      });
    };
    $scope.getGroupedDocuments = function(id) {
      /*
      Get grouped documents by application id.
      */

      return victory.ajax($http, {
        url: "/applications/" + id + "/" + $scope.documentMode + "/grouped",
        success: function(data) {
          $scope.groupedDocuments = data.items;
          return $scope.page = {
            total: data.total,
            index: 0,
            max: (data.total - 1) / pageSize,
            hasPrevious: false,
            hasNext: pageSize < data.total
          };
        }
      });
    };
    $scope.searchGroupedDocuments = function(keyword) {
      /*
      Search grouped documents with keywords.
      */

      return victory.ajax($http, {
        url: "/applications/" + $scope.selectedApplication.id + "/" + $scope.documentMode + "/grouped/?q=" + keyword,
        success: function(data) {
          return console.log('success');
        }
      });
    };
    $scope.gotoSearchPage = function(keyword) {
      return location.href = "#/applications/" + $scope.selectedApplication.id + "/" + $scope.documentMode + "/grouped/q/" + keyword;
    };
    $scope.getGroupedDocumentHref = function(groupedDocument) {
      /*
      Get the href of the grouped document.
      :param groupedDocument: grouped document
      :return: "#/applications/{{application_id}}/{{documentMode}}/{{group_tag}}" / "#document_{{group_tag}}"
      */

      if (groupedDocument.times > 1) {
        return "#/applications/" + $scope.selectedApplication.id + "/" + $scope.documentMode + "/" + groupedDocument.group_tag;
      } else {
        return "#document_" + groupedDocument.group_tag;
      }
    };
    $scope.modal = function(groupedDocument) {
      /*
      Check the grouped document should show the bootstrap modal window.
      :param groupedDocument: grouped document
      :return: "modal" / ""
      */

      if (groupedDocument.times > 1) {
        return "";
      } else {
        return "modal";
      }
    };
    if ($stateParams.keyword) {
      $scope.keyword = $stateParams.keyword;
      return $scope.searchGroupedDocuments($stateParams.keyword);
    } else {
      return $scope.getApplications();
    }
  });

}).call(this);
