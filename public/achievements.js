webpackJsonp([0],{

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(368)
/* template */
var __vue_template__ = __webpack_require__(369)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Achievements.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-627777ca", Component.options)
  } else {
    hotAPI.reload("data-v-627777ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'achievements',
    data: function data() {
        return {
            opened: false,
            model: '',
            page: 1,
            max: 1,
            maxPages: 5,
            achievements: [],
            checked: [],
            selectOptions: [{
                label: '',
                value: ''
            }, {
                label: 'Bigfoot\'s Burden',
                value: 'Bigfoot\'s Burden'
            }, {
                label: 'Hive',
                value: 'Hive'
            }, {
                label: 'Mini W. Change',
                value: 'Mini W. Change'
            }, {
                label: 'Misc.',
                value: 'Misc.'
            }, {
                label: 'Mounts',
                value: 'Mounts'
            }, {
                label: 'Outfits',
                value: 'Outfits'
            }, {
                label: 'PaFS',
                value: 'PaFS'
            }, {
                label: 'Quest',
                value: 'Quest'
            }, {
                label: 'Umbral',
                value: 'Umbral'
            }, {
                label: 'World Quest',
                value: 'World Quest'
            }, {
                label: 'World Task',
                value: 'World Task'
            }],
            showOnlyOpt: [{
                label: 'All',
                value: 2
            }, {
                label: 'Earned',
                value: 1
            }, {
                label: 'Unearned',
                value: 0
            }],
            select: '',
            showOnly: 2,
            loader: false,
            params: {},
            total: 0
        };
    },

    methods: {
        sum: function sum(isActive, points) {
            console.log(isActive);
            if (!isActive) {
                this.total -= points;
            } else {
                this.total += points;
            }
        },
        isActive: function isActive(id) {
            return this.checked.indexOf(id) > -1;
        },
        getData: function getData() {
            var _this = this;

            this.loader = true;
            this.$axios.get('/api/v1/achievements', {
                params: this.params
            }).then(function (response) {
                _this.page = response.data.current_page;
                _this.max = response.data.last_page;
                _this.achievements = response.data.data;
                _this.loader = false;
            });
        },
        getChecked: function getChecked() {
            var _this2 = this;

            var tmp = Object.entries(document.getElementsByTagName('tr'))
            /*.filter((item) => {
                let name = item[1]
                console.log(name)
            })*/
            .filter(function (item) {
                var name = item[1].firstChild.firstChild.name;
                var isDisabled = item[1].firstChild.firstChild.disabled;

                return name === "achievementlist[]" && !isDisabled;
            });
            /*.filter((item)=>{
            let td = item[1].childNodes[1];
            return ! td.classList.contains('grey');
            });*/
            //console.log(tmp)

            var items = [];
            tmp.forEach(function (item) {
                var id = item[1].childNodes[0].firstChild.value;

                _this2.checked.push(parseInt(id));
            });
            this.calculateTotal();
            this.model = '';

            this.opened = false;
            this.$q.notify({
                message: this.checked.length + ' achievements added.',
                type: 'positive',
                color: 'positive'
            });

            //this.opened = false
            //console.log(this.checked.toString());
            //this.getAchievementsId(items);
        },
        save: function save() {
            this.$axios.post('/api/v1/user/achievements', {
                data: this.checked
            }).then(function (response) {
                console.log(response.data);
            });
        },
        getAchievementsId: function getAchievementsId(array) {
            var _this3 = this;

            this.$axios.post('/getIds', {
                data: array
            }).then(function (response) {
                _this3.checked = response.data;
                console.log(response);
            });
        },
        load: function load() {
            var _this4 = this;

            this.$axios.get('/api/v1/achievements/load').then(function (response) {
                _this4.checked = response.data;
            });

            this.getTotal();
        },
        calculateTotal: function calculateTotal() {
            var _this5 = this;

            //Para calculat el total al momento de Importar desde tibia
            this.$axios.post('/calculate', {
                data: this.checked
            }).then(function (response) {
                _this5.total = response.data;
                console.log(response);
            });
        },
        getTotal: function getTotal() {
            var _this6 = this;

            this.$axios.get('/api/v1/achievements/sum').then(function (response) {
                _this6.total = response.data;
            });
        }
    },
    computed: {
        filteredAchievements: function filteredAchievements() {
            var _this7 = this;

            return this.achievements.filter(function (item) {
                if (_this7.select != '') {
                    return item.type == _this7.select;
                } else {
                    return item;
                }
            });
        }
    },
    mounted: function mounted() {
        this.getData();
    },

    watch: {
        select: function select() {
            this.params.type = this.select;
            this.getData();
        },
        page: function page(val) {
            this.params.page = val;
            this.getData();
        },
        showOnly: function showOnly() {
            this.params.only = this.showOnly;
            console.log(this.checked);
            this.params.checked = this.checked;
            this.getData();
        }
    }
});

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "q-page",
    { staticClass: "row justify-center", attrs: { padding: "" } },
    [
      _c(
        "div",
        { staticClass: "row col-12 justify-end q-mb-md" },
        [
          _c("q-btn", {
            attrs: {
              flat: "",
              "icon-right": "import export",
              color: "blue-grey",
              label: "Import"
            },
            on: {
              click: function($event) {
                _vm.opened = true
              }
            }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: {
              flat: "",
              "icon-right": "sync",
              color: "blue-grey",
              label: "Load"
            },
            on: { click: _vm.load }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: {
              flat: "",
              "icon-right": "save",
              color: "blue-grey",
              label: "Save"
            },
            on: { click: _vm.save }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row col-12 justify-center q-mb-md" },
        [
          _c("q-select", {
            staticClass: "col-md-2 col-sm-12 q-mr-md",
            attrs: { options: _vm.selectOptions, "stack-label": "Category" },
            model: {
              value: _vm.select,
              callback: function($$v) {
                _vm.select = $$v
              },
              expression: "select"
            }
          }),
          _vm._v(" "),
          _c("q-btn-toggle", {
            attrs: { "toggle-color": "blue-grey", options: _vm.showOnlyOpt },
            model: {
              value: _vm.showOnly,
              callback: function($$v) {
                _vm.showOnly = $$v
              },
              expression: "showOnly"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "row col-12 justify-center q-mb-md" }, [
        _c("div", { staticClass: "q-item-sublabel col-12 text-center" }, [
          _vm._v("You have")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "q-headline" }, [
          _vm._v(_vm._s(_vm.total) + " achievement points")
        ])
      ]),
      _vm._v(" "),
      _c(
        "q-modal",
        {
          attrs: { "content-css": { padding: "10px", overflow: "hidden" } },
          model: {
            value: _vm.opened,
            callback: function($$v) {
              _vm.opened = $$v
            },
            expression: "opened"
          }
        },
        [
          _c("q-editor", {
            staticClass: "q-mb-sm",
            attrs: {
              toolbar: [],
              "content-style": {
                minWidth: "500px",
                maxWidth: "500px",
                maxHeight: "100px",
                overflow: "hidden"
              }
            },
            model: {
              value: _vm.model,
              callback: function($$v) {
                _vm.model = $$v
              },
              expression: "model"
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "row justify-center" },
            [
              _c("q-btn", {
                attrs: { color: "primary", label: "Import" },
                on: { click: _vm.getChecked }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-list",
        { staticClass: "row", attrs: { highlight: "", "no-border": "" } },
        _vm._l(_vm.filteredAchievements, function(achievement, index) {
          return _c(
            "q-item",
            {
              key: index,
              staticClass: "col-md-4 col-sm-12",
              class: { active: _vm.isActive(achievement.real_id) },
              attrs: { tag: "label" }
            },
            [
              _c(
                "q-item-side",
                [
                  _c("q-checkbox", {
                    attrs: {
                      color: "green",
                      val: achievement.real_id,
                      "checked-icon": "star",
                      "unchecked-icon": "star border"
                    },
                    nativeOn: {
                      click: function($event) {
                        _vm.sum(
                          _vm.isActive(achievement.real_id),
                          achievement.points
                        )
                      }
                    },
                    model: {
                      value: _vm.checked,
                      callback: function($$v) {
                        _vm.checked = $$v
                      },
                      expression: "checked"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item-main",
                [
                  _c(
                    "q-item-tile",
                    { attrs: { label: "" } },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(achievement.name) +
                          " \n            "
                      ),
                      achievement.type
                        ? _c(
                            "q-chip",
                            {
                              attrs: { small: "", square: "", color: "faded" }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(achievement.type) +
                                  "\n            "
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("q-item-tile", { attrs: { sublabel: "", lines: "2" } }, [
                    _vm._v(
                      "\n            " +
                        _vm._s(achievement.spoiler) +
                        "\n          "
                    )
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item-side",
                { attrs: { right: "" } },
                [
                  _c("q-item-tile", { attrs: { stamp: "" } }, [
                    _vm._v(_vm._s(achievement.points) + " pts")
                  ])
                ],
                1
              )
            ],
            1
          )
        })
      ),
      _vm._v(" "),
      _c("q-pagination", {
        staticClass: "justify-center",
        attrs: {
          max: _vm.max,
          "direction-links": "",
          "max-pages": _vm.maxPages,
          ellipses: "",
          disabled: _vm.loader
        },
        model: {
          value: _vm.page,
          callback: function($$v) {
            _vm.page = $$v
          },
          expression: "page"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-627777ca", module.exports)
  }
}

/***/ })

});