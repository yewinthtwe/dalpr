(this["webpackJsonpalpr-client"] = this["webpackJsonpalpr-client"] || []).push([
	[0],
	{
		116: function (e, t, a) {},
		118: function (e, t, a) {},
		121: function (e, t, a) {
			"use strict";
			a.r(t);
			var n = a(0),
				r = a.n(n),
				c = a(28),
				o = a.n(c),
				s = (a(89), a(5)),
				l = a(6),
				i = a(8),
				u = a(7),
				m = a(16),
				d = a(34),
				p = a(14),
				h = a(76),
				b = a.n(h),
				v = a(72),
				f = a.n(v),
				g = a(70),
				E = a.n(g),
				y = a(71),
				O = a.n(y),
				w = a(69),
				k = a.n(w),
				j = a(73),
				C = a.n(j),
				S = a(75),
				N = a.n(S),
				P = a(74),
				x = a.n(P),
				A = a(155),
				I = a(122),
				_ = function (e) {
					var t = e.user;
					return r.a.createElement(
						"nav",
						{ className: "navbar navbar-expand-lg navbar-light bg-light" },
						r.a.createElement(
							p.b,
							{ className: "navbar-brand", to: "/" },
							r.a.createElement(
								"span",
								{ className: "material-icons" },
								"control_camera"
							),
							"dalpr"
						),
						r.a.createElement(
							"button",
							{
								className: "navbar-toggler",
								type: "button",
								"data-toggle": "collapse",
								"data-target": "#navbarNavAltMarkup",
								"aria-controls": "navbarNavAltMarkup",
								"aria-expanded": "false",
								"aria-label": "Toggle navigation",
							},
							r.a.createElement("span", { className: "navbar-toggler-icon" })
						),
						r.a.createElement(
							"div",
							{
								className: "collapse navbar-collapse",
								id: "navbarNavAltMarkup",
							},
							r.a.createElement(
								"div",
								{ className: "navbar-nav" },
								r.a.createElement(
									p.c,
									{ className: "nav-item nav-link", to: "/inOutRecord" },
									r.a.createElement(A.a, {
										icon: r.a.createElement(k.a, null),
										label: "InOut",
										clickable: !0,
									})
								),
								r.a.createElement(
									p.c,
									{ className: "nav-item nav-link", to: "/members" },
									r.a.createElement(A.a, {
										icon: r.a.createElement(E.a, null),
										label: "Member",
										clickable: !0,
									})
								),
								r.a.createElement(
									p.c,
									{ className: "nav-item nav-link", to: "/users" },
									r.a.createElement(A.a, {
										icon: r.a.createElement(O.a, null),
										label: "SystemUser",
										clickable: !0,
									})
								),
								r.a.createElement(
									p.c,
									{ className: "nav-item nav-link", to: "/lanes" },
									r.a.createElement(A.a, {
										icon: r.a.createElement(f.a, null),
										label: "LaneControl",
										clickable: !0,
									})
								),
								!t &&
									r.a.createElement(
										r.a.Fragment,
										null,
										r.a.createElement(
											p.c,
											{ className: "nav-item nav-link", to: "/login" },
											r.a.createElement(A.a, {
												icon: r.a.createElement(C.a, null),
												label: "Login",
												clickable: !0,
											})
										)
									),
								t &&
									r.a.createElement(
										r.a.Fragment,
										null,
										r.a.createElement(
											p.c,
											{
												className: "nav-item nav-link",
												to: "/users/".concat(t._id),
											},
											r.a.createElement(A.a, {
												icon: r.a.createElement(x.a, null),
												label: t.username,
												clickable: !0,
											})
										),
										r.a.createElement(
											p.c,
											{ className: "nav-item nav-link", to: "/logout" },
											r.a.createElement(A.a, {
												icon: r.a.createElement(N.a, null),
												label: "Logout",
												clickable: !0,
											})
										)
									)
							)
						),
						r.a.createElement(
							"span",
							{ className: "navbar-text" },
							r.a.createElement(
								I.a,
								{ style: { fontSize: 10 }, component: "p" },
								"Evaluation Copy. Build.20200923002 | ",
								r.a.createElement(b.a, { fontSize: "small" }, " "),
								" 2020 | Q-Free ASA"
							)
						)
					);
				},
				D = a(4),
				M = a.n(D),
				T = a(46),
				B = a(11),
				L = a(77),
				U = a(27),
				R = a(35),
				z = a.n(R);
			var Q = {
				init: function () {
					console.log("Logservice is called");
				},
				log: function (e) {
					console.error(e);
				},
			};
			z.a.interceptors.response.use(null, function (e) {
				return (
					(e.response && e.response.status >= 400 && e.response.status < 500) ||
						(Q.log(e), d.b.error("An unexpected error occured.")),
					Promise.reject(e)
				);
			});
			var q = {
				get: z.a.get,
				post: z.a.post,
				put: z.a.put,
				delete: z.a.delete,
				setJwt: function (e) {
					z.a.defaults.headers.common["x-auth-token"] = e;
				},
			};
			function V() {
				return (V = Object(B.a)(
					M.a.mark(function e(t, a) {
						var n, r;
						return M.a.wrap(function (e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(e.next = 2),
											q.post(U.a + "/auth", { username: t, password: a })
										);
									case 2:
										(n = e.sent),
											(r = n.data),
											localStorage.setItem("token", r);
									case 5:
									case "end":
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			function W() {
				try {
					var e = localStorage.getItem("token");
					return Object(L.a)(e);
				} catch (t) {
					return null;
				}
			}
			function F() {
				return localStorage.getItem("token");
			}
			q.setJwt(F());
			var J = {
					login: function (e, t) {
						return V.apply(this, arguments);
					},
					loginWithjwt: function (e) {
						localStorage.setItem("token", e);
					},
					logout: function () {
						localStorage.removeItem("token");
					},
					getJwt: F,
					getCurrentUser: W,
				},
				G = a(24),
				H = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, c = new Array(n), o = 0; o < n; o++)
							c[o] = arguments[o];
						return (
							((e = t.call.apply(t, [this].concat(c))).raiseSort = function (
								t
							) {
								var a = Object(G.a)({}, e.props.sortColumn);
								a.path === t
									? (a.order = "asc" === a.order ? "desc" : "asc")
									: ((a.path = t), (a.order = "asc")),
									e.props.onSort(a);
							}),
							(e.renderSortIcon = function (t) {
								var a = e.props.sortColumn;
								return t.path !== a.path
									? null
									: "asc" === a.order
									? r.a.createElement("i", { className: "fa fa-sort-asc" })
									: r.a.createElement("i", { className: "fa fa-sort-desc" });
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									var e = this;
									return r.a.createElement(
										"thead",
										null,
										r.a.createElement(
											"tr",
											null,
											this.props.columns.map(function (t) {
												return r.a.createElement(
													"th",
													{
														className: "clickable",
														key: t.path || t.key,
														onClick: function () {
															return e.raiseSort(t.path);
														},
													},
													t.label,
													" ",
													e.renderSortIcon(t)
												);
											})
										)
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				K = a(25),
				Y = a.n(K),
				Z = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).renderCell = function (
								e,
								t
							) {
								return t.content ? t.content(e) : Y.a.get(e, t.path);
							}),
							(e.createKey = function (e, t) {
								return e._id + (t.path || t.key);
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									var e = this,
										t = this.props,
										a = t.data,
										n = t.columns;
									return r.a.createElement(
										"tbody",
										null,
										a.map(function (t) {
											return r.a.createElement(
												"tr",
												{ key: t._id },
												n.map(function (a) {
													return r.a.createElement(
														"td",
														{ key: e.createKey(t, a) },
														e.renderCell(t, a)
													);
												})
											);
										})
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				$ = function (e) {
					var t = e.columns,
						a = e.sortColumn,
						n = e.onSort,
						c = e.data;
					return r.a.createElement(
						"table",
						{ className: "table" },
						r.a.createElement(H, { columns: t, sortColumn: a, onSort: n }),
						r.a.createElement(Z, { columns: t, data: c })
					);
				},
				X = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a),
							((e = t.call(this)).columns = [
								{
									path: "lp",
									label: "License Plate",
									content: function (e) {
										return r.a.createElement(
											p.b,
											{ to: "/members/".concat(e._id) },
											e.lp
										);
									},
								},
								{ path: "memberName", label: "Member Name" },
								{ path: "address", label: "Address" },
								{ path: "registrationDate", label: "Registration Date" },
								{ path: "obuId", label: "OBU" },
							]),
							(e.deleteColumn = {
								key: "delete",
								content: function (t) {
									return r.a.createElement(
										"button",
										{
											onClick: function () {
												return e.props.onDelete(t);
											},
											className: "btn btn-danger btn-sm",
										},
										"Delete"
									);
								},
							});
						var n = J.getCurrentUser();
						return n && n.isAdmin && e.columns.push(e.deleteColumn), e;
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									var e = this.props,
										t = e.members,
										a = e.onSort,
										n = e.sortColumn;
									return r.a.createElement($, {
										columns: this.columns,
										data: t,
										sortColumn: n,
										onSort: a,
									});
								},
							},
						]),
						a
					);
				})(n.Component),
				ee = function (e) {
					var t = e.itemsCount,
						a = e.pageSize,
						n = e.currentPage,
						c = e.onPageChange,
						o = Math.ceil(t / a);
					if (1 === o) return null;
					var s = Y.a.range(1, o + 1);
					return r.a.createElement(
						"nav",
						null,
						r.a.createElement(
							"ul",
							{ className: "pagination" },
							s.map(function (e) {
								return r.a.createElement(
									"li",
									{
										key: e,
										className: e === n ? "page-item active" : "page-item",
									},
									r.a.createElement(
										"p",
										{
											className: "page-link",
											onClick: function () {
												return c(e);
											},
										},
										e
									)
								);
							})
						)
					);
				},
				te = U.a + "/members";
			function ae(e) {
				return "".concat(te, "/").concat(e);
			}
			function ne(e) {
				if (e._id) {
					var t = Object(G.a)({}, e);
					return delete t._id, q.put(ae(e._id), t);
				}
				return q.post(te, e);
			}
			function re(e) {
				return q.delete(ae(e));
			}
			function ce(e, t, a) {
				var n = t - 1 * a;
				return Y()(e).slice(n).take(a).value();
			}
			var oe = function (e) {
					var t = e.value,
						a = e.onChange;
					return r.a.createElement("input", {
						type: "text",
						name: "query",
						className: "form-control my-3",
						placeholder: "Search...",
						value: t,
						onChange: function (e) {
							return a(e.currentTarget.value);
						},
					});
				},
				se = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								members: [],
								currentPage: 1,
								pageSize: 10,
								searchQuery: "",
								sortColumn: { path: "lp", order: "asc" },
							}),
							(e.handleAdd = Object(B.a)(
								M.a.mark(function t() {
									var a, n, r;
									return M.a.wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (t.next = 2), ne();
												case 2:
													(a = t.sent),
														(n = a.data),
														(r = [n].concat(Object(T.a)(e.state.members))),
														e.setState({ members: r });
												case 6:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)),
							(e.handleDelete = (function () {
								var t = Object(B.a)(
									M.a.mark(function t(a) {
										var n, r;
										return M.a.wrap(
											function (t) {
												for (;;)
													switch ((t.prev = t.next)) {
														case 0:
															return (
																(n = e.state.members),
																(r = n.filter(function (e) {
																	return e._id !== a._id;
																})),
																e.setState({ members: r }),
																(t.prev = 3),
																(t.next = 6),
																re(a._id)
															);
														case 6:
															t.next = 12;
															break;
														case 8:
															(t.prev = 8),
																(t.t0 = t.catch(3)),
																t.t0.response &&
																	404 === t.t0.response.status &&
																	d.b.error(
																		"This member may have been deleted already"
																	),
																e.setState({ members: n });
														case 12:
														case "end":
															return t.stop();
													}
											},
											t,
											null,
											[[3, 8]]
										);
									})
								);
								return function (e) {
									return t.apply(this, arguments);
								};
							})()),
							(e.handlePageChange = function (t) {
								e.setState({ currentPage: t });
							}),
							(e.handleSearch = function (t) {
								e.setState({ searchQuery: t, currentPage: 1 });
							}),
							(e.handleSort = function (t) {
								e.setState({ sortColumn: t });
							}),
							(e.getPagedData = function () {
								var t = e.state,
									a = t.pageSize,
									n = t.currentPage,
									r = t.sortColumn,
									c = t.searchQuery,
									o = t.members,
									s = o;
								c &&
									(s = o.filter(function (e) {
										return e.lp
											.toString()
											.toLowerCase()
											.startsWith(c.toLowerCase());
									}));
								var l = ce(Y.a.orderBy(s, [r.path], [r.order]), n, a);
								return { totalCount: s.length, data: l };
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), q.get(te);
															case 2:
																(t = e.sent),
																	(a = t.data),
																	this.setState({ members: a });
															case 5:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "render",
								value: function () {
									var e = this.state.members.length,
										t = this.state,
										a = t.pageSize,
										n = t.currentPage,
										c = t.sortColumn,
										o = t.searchQuery,
										s = this.props.user;
									if (0 === e)
										return r.a.createElement(
											"div",
											null,
											r.a.createElement(
												I.a,
												{ component: "p" },
												"There is no member registered."
											),
											";",
											r.a.createElement(
												p.b,
												{
													to: "/members/new",
													className: "btn btn-primary m-2",
													style: { marginBottom: 20 },
												},
												"New Member ",
												r.a.createElement("i", {
													className: "fa fa-plus-circle",
													"aria-hidden": "true",
												})
											)
										);
									var l = this.getPagedData(),
										i = l.totalCount,
										u = l.data;
									return r.a.createElement(
										"div",
										{ className: "row" },
										r.a.createElement(
											"div",
											{ className: "col" },
											r.a.createElement(
												I.a,
												{ variant: "h5", component: "h5" },
												"Registered Members"
											),
											r.a.createElement(
												I.a,
												{ component: "p" },
												"Total ",
												i,
												" member."
											),
											r.a.createElement(oe, {
												value: o,
												onChange: this.handleSearch,
											}),
											r.a.createElement(X, {
												members: u,
												sortColumn: c,
												onDelete: this.handleDelete,
												onSort: this.handleSort,
											}),
											s &&
												r.a.createElement(
													p.b,
													{
														to: "/members/new",
														className: "btn btn-primary m-2",
														style: { marginBottom: 20 },
													},
													"New Member ",
													r.a.createElement("i", {
														className: "fa fa-plus-circle",
														"aria-hidden": "true",
													})
												),
											r.a.createElement(ee, {
												itemsCount: i,
												pageSize: a,
												currentPage: n,
												onPageChange: this.handlePageChange,
											})
										)
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				le = a(20),
				ie = a.n(le),
				ue = a(44),
				me = a(78),
				de = a(37),
				pe = function (e) {
					var t = e.name,
						a = e.label,
						n = e.error,
						c = Object(de.a)(e, ["name", "label", "error"]);
					return r.a.createElement(
						"div",
						{ className: "form-group" },
						r.a.createElement("label", { htmlFor: t }, a),
						r.a.createElement(
							"input",
							Object.assign({}, c, {
								name: t,
								id: t,
								className: "form-control",
							})
						),
						n &&
							r.a.createElement("div", { className: "alert alert-danger" }, n)
					);
				},
				he = function (e) {
					var t = e.name,
						a = e.label,
						n = e.options,
						c = e.error,
						o = Object(de.a)(e, ["name", "label", "options", "error"]);
					return r.a.createElement(
						"div",
						{ className: "form-group" },
						r.a.createElement("label", { htmlFor: t }, a),
						r.a.createElement(
							"select",
							Object.assign({ name: t, id: t }, o, {
								className: "form-control",
							}),
							r.a.createElement("option", { value: "" }),
							n.map(function (e) {
								return r.a.createElement(
									"option",
									{ key: e._id, value: e._id },
									e.name
								);
							})
						),
						c &&
							r.a.createElement("div", { className: "alert alert-danger" }, c)
					);
				},
				be = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								data: {},
								errors: {},
							}),
							(e.validate = function () {
								var t = ie.a.validate(e.state.data, e.schema, {
									abortEarly: !1,
								}).error;
								if (!t) return null;
								var a,
									n = {},
									r = Object(me.a)(t.details);
								try {
									for (r.s(); !(a = r.n()).done; ) {
										var c = a.value;
										n[c.path[0]] = c.message;
									}
								} catch (o) {
									r.e(o);
								} finally {
									r.f();
								}
								return n;
							}),
							(e.validateProperty = function (t) {
								var a = t.name,
									n = t.value,
									r = Object(ue.a)({}, a, n),
									c = Object(ue.a)({}, a, e.schema[a]),
									o = ie.a.validate(r, c).error;
								return o ? o.details[0].message : null;
							}),
							(e.handleSubmit = function (t) {
								t.preventDefault();
								var a = e.validate();
								e.setState({ errors: a || {} }), a || e.doSubmit();
							}),
							(e.handleChange = function (t) {
								var a = t.currentTarget,
									n = Object(G.a)({}, e.state.errors),
									r = e.validateProperty(a);
								r ? (n[a.name] = r) : delete n[a.name];
								var c = Object(G.a)({}, e.state.data);
								(c[a.name] = a.value), e.setState({ data: c, errors: n });
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "renderButton",
								value: function (e) {
									return r.a.createElement(
										"button",
										{ disabled: this.validate(), className: "btn btn-primary" },
										e
									);
								},
							},
							{
								key: "renderSelect",
								value: function (e, t, a) {
									var n = this.state,
										c = n.data,
										o = n.errors;
									return r.a.createElement(he, {
										name: e,
										value: c[e],
										label: t,
										options: a,
										onChange: this.handleChange,
										error: o[e],
									});
								},
							},
							{
								key: "renderInput",
								value: function (e, t) {
									var a =
											arguments.length > 2 && void 0 !== arguments[2]
												? arguments[2]
												: "text",
										n = this.state,
										c = n.data,
										o = n.errors;
									return r.a.createElement(pe, {
										type: a,
										autoComplete: e,
										name: e,
										value: c[e],
										label: t,
										onChange: this.handleChange,
										error: o[e],
									});
								},
							},
						]),
						a
					);
				})(n.Component),
				ve = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								data: {
									lp: "",
									memberName: "",
									address: "",
									obuId: 123456789012,
								},
								errors: {},
							}),
							(e.schema = {
								_id: ie.a.string(),
								lp: ie.a.string().required().label("License Plate"),
								memberName: ie.a
									.string()
									.required()
									.min(6)
									.label("Member Name"),
								address: ie.a.string().required().min(6).label("Address"),
								obuId: ie.a.number().required().label("OBU"),
							}),
							(e.doSubmit = Object(B.a)(
								M.a.mark(function t() {
									return M.a.wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (t.next = 2), ne(e.state.data);
												case 2:
													e.props.history.push("/members");
												case 3:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "populateMember",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a, n;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																if (
																	((e.prev = 0),
																	"new" !== (t = this.props.match.params.id))
																) {
																	e.next = 4;
																	break;
																}
																return e.abrupt("return");
															case 4:
																return (e.next = 6), (r = t), q.get(ae(r));
															case 6:
																(a = e.sent),
																	(n = a.data),
																	this.setState({
																		data: this.mapToViewModel(n),
																	}),
																	(e.next = 14);
																break;
															case 11:
																(e.prev = 11),
																	(e.t0 = e.catch(0)),
																	e.t0.response &&
																		404 === e.t0.response.status &&
																		this.props.history.replace("/not-found");
															case 14:
															case "end":
																return e.stop();
														}
													var r;
												},
												e,
												this,
												[[0, 11]]
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), this.populateMember();
															case 2:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "mapToViewModel",
								value: function (e) {
									return {
										_id: e._id,
										lp: e.lp,
										memberName: e.memberName,
										address: e.address,
										obuId: e.obuId,
									};
								},
							},
							{
								key: "render",
								value: function () {
									return r.a.createElement(
										"div",
										null,
										r.a.createElement("h4", null, " Member "),
										r.a.createElement(
											"form",
											{ onSubmit: this.handleSubmit },
											this.renderInput("lp", "License Plate"),
											this.renderInput("memberName", "Member Name"),
											this.renderInput("address", "Address"),
											this.renderInput("obuId", "OBU"),
											this.renderButton("Save")
										)
									);
								},
							},
						]),
						a
					);
				})(be),
				fe = function (e) {
					var t = "fa fa-check";
					return (
						e.isAdmin || (t = "fa fa-times"),
						r.a.createElement("i", { className: t, "aria-hidden": "true" })
					);
				},
				ge = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a),
							((e = t.call(this)).columns = [
								{
									path: "username",
									label: "Username",
									content: function (e) {
										return r.a.createElement(
											p.b,
											{ to: "/users/".concat(e._id) },
											e.username
										);
									},
								},
								{ path: "password", label: "Password", type: "password" },
								{ path: "reg_date", label: "RegistrationDate" },
								{
									path: "role",
									label: "Admin",
									key: "role",
									content: function (t) {
										return r.a.createElement(fe, {
											isAdmin: t.isAdmin,
											onClick: function () {
												return e.props.onIsAdmin(t);
											},
										});
									},
								},
							]),
							(e.deleteColumn = {
								key: "delete",
								content: function (t) {
									return r.a.createElement(
										"button",
										{
											onClick: function () {
												return e.props.onDelete(t);
											},
											className: "btn btn-danger btn-sm",
										},
										"Delete"
									);
								},
							});
						var n = J.getCurrentUser();
						return n && n.isAdmin && e.columns.push(e.deleteColumn), e;
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									var e = this.props,
										t = e.users,
										a = e.onSort,
										n = e.sortColumn;
									return r.a.createElement($, {
										columns: this.columns,
										data: t,
										sortColumn: n,
										onSort: a,
									});
								},
							},
						]),
						a
					);
				})(n.Component),
				Ee = U.a + "/users";
			function ye(e) {
				return "".concat(Ee, "/").concat(e);
			}
			function Oe(e) {
				return q.get(ye(e));
			}
			function we(e) {
				if (e._id) {
					var t = Object(G.a)({}, e);
					return delete t._id, q.put(ye(e._id), t);
				}
				return q.post(Ee, e);
			}
			function ke(e) {
				return q.delete(ye(e));
			}
			var je = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								users: [],
								currentPage: 1,
								pageSize: 10,
								searchQuery: "",
								sortColumn: { path: "username", order: "asc" },
							}),
							(e.handleAdd = Object(B.a)(
								M.a.mark(function t() {
									var a, n, r;
									return M.a.wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (t.next = 2), we();
												case 2:
													(a = t.sent),
														(n = a.data),
														(r = [n].concat(Object(T.a)(e.state.users))),
														e.setState({ users: r });
												case 6:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)),
							(e.handleDelete = (function () {
								var t = Object(B.a)(
									M.a.mark(function t(a) {
										var n, r;
										return M.a.wrap(
											function (t) {
												for (;;)
													switch ((t.prev = t.next)) {
														case 0:
															return (
																(n = e.state.users),
																(r = n.filter(function (e) {
																	return e._id !== a._id;
																})),
																e.setState({ users: r }),
																(t.prev = 3),
																(t.next = 6),
																ke(a._id)
															);
														case 6:
															t.next = 12;
															break;
														case 8:
															(t.prev = 8),
																(t.t0 = t.catch(3)),
																t.t0.response &&
																	404 === t.t0.response.status &&
																	d.b.error(
																		"This user may have been deleted already"
																	),
																e.setState({ users: n });
														case 12:
														case "end":
															return t.stop();
													}
											},
											t,
											null,
											[[3, 8]]
										);
									})
								);
								return function (e) {
									return t.apply(this, arguments);
								};
							})()),
							(e.handleIsAdmin = function (t) {
								var a = Object(T.a)(e.state.users),
									n = a.indexOf(t);
								(a[n] = Object(G.a)({}, a[n])),
									(a[n].isAdmin = !a[n].isAdmin),
									e.setState({ users: a });
							}),
							(e.handlePageChange = function (t) {
								e.setState({ currentPage: t });
							}),
							(e.handleSearch = function (t) {
								e.setState({ searchQuery: t, currentPage: 1 });
							}),
							(e.handleSort = function (t) {
								e.setState({ sortColumn: t });
							}),
							(e.getPagedData = function () {
								var t = e.state,
									a = t.pageSize,
									n = t.currentPage,
									r = t.sortColumn,
									c = t.searchQuery,
									o = t.users,
									s = o;
								c &&
									(s = o.filter(function (e) {
										return e.username
											.toString()
											.toLowerCase()
											.startsWith(c.toLowerCase());
									}));
								var l = ce(Y.a.orderBy(s, [r.path], [r.order]), n, a);
								return { totalCount: s.length, data: l };
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), q.get(Ee);
															case 2:
																(t = e.sent),
																	(a = t.data),
																	this.setState({ users: a });
															case 5:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "render",
								value: function () {
									var e = this.state.users.length,
										t = this.state,
										a = t.pageSize,
										n = t.currentPage,
										c = t.sortColumn,
										o = t.searchQuery;
									if (0 === e)
										return r.a.createElement(
											"div",
											null,
											" ",
											r.a.createElement(
												I.a,
												{ component: "p" },
												"There is no System user."
											),
											"; ",
											r.a.createElement(
												p.b,
												{
													to: "/users/new",
													className: "btn btn-primary m-2",
													style: { marginBottom: 20 },
												},
												"New User ",
												r.a.createElement("i", {
													className: "fa fa-plus-circle",
													"aria-hidden": "true",
												})
											),
											" "
										);
									var s = this.getPagedData(),
										l = s.totalCount,
										i = s.data;
									return r.a.createElement(
										"div",
										{ className: "row" },
										r.a.createElement(
											"div",
											{ className: "col" },
											r.a.createElement(
												I.a,
												{ variant: "h5", component: "h5" },
												"System Users"
											),
											r.a.createElement(
												I.a,
												{ component: "p" },
												"Total ",
												l,
												" system user."
											),
											r.a.createElement(oe, {
												value: o,
												onChange: this.handleSearch,
											}),
											r.a.createElement(ge, {
												users: i,
												sortColumn: c,
												onDelete: this.handleDelete,
												onSort: this.handleSort,
											}),
											r.a.createElement(
												p.b,
												{
													to: "/users/new",
													className: "btn btn-primary m-2",
													style: { marginBottom: 20 },
												},
												"New User ",
												r.a.createElement("i", {
													className: "fa fa-plus-circle",
													"aria-hidden": "true",
												})
											),
											r.a.createElement(ee, {
												itemsCount: l,
												pageSize: a,
												currentPage: n,
												onPageChange: this.handlePageChange,
											})
										)
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				Ce = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								data: { username: "", password: "", name: "", isAdmin: !1 },
								errors: {},
							}),
							(e.schema = {
								_id: ie.a.string(),
								username: ie.a.string().required().min(6).label("Username"),
								password: ie.a.string().required().min(6).label("Password"),
								name: ie.a.string().required().min(6).label("Name"),
								isAdmin: ie.a.boolean(),
							}),
							(e.doSubmit = Object(B.a)(
								M.a.mark(function t() {
									return M.a.wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (t.next = 2), we(e.state.data);
												case 2:
													e.props.history.push("/users");
												case 3:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "populateUser",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a, n;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																if (
																	((e.prev = 0),
																	"new" !== (t = this.props.match.params.id))
																) {
																	e.next = 4;
																	break;
																}
																return e.abrupt("return");
															case 4:
																return (e.next = 6), Oe(t);
															case 6:
																(a = e.sent),
																	(n = a.data),
																	this.setState({
																		data: this.mapToViewModel(n),
																	}),
																	(e.next = 14);
																break;
															case 11:
																(e.prev = 11),
																	(e.t0 = e.catch(0)),
																	e.t0.response &&
																		404 === e.t0.response.status &&
																		this.props.history.replace("/not-found");
															case 14:
															case "end":
																return e.stop();
														}
												},
												e,
												this,
												[[0, 11]]
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), this.populateUser();
															case 2:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "mapToViewModel",
								value: function (e) {
									return {
										_id: e._id,
										username: e.username,
										password: e.password,
										name: e.name,
										isAdmin: e.isAdmin,
									};
								},
							},
							{
								key: "render",
								value: function () {
									return r.a.createElement(
										"div",
										null,
										r.a.createElement("h4", null, "System user"),
										r.a.createElement(
											"form",
											{ onSubmit: this.handleSubmit },
											this.renderInput("username", "Username"),
											this.renderInput("password", "Password"),
											this.renderInput("name", "Name"),
											this.renderInput("isAdmin", "IsAdmin"),
											this.renderButton("Save")
										)
									);
								},
							},
						]),
						a
					);
				})(be),
				Se = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								data: { username: "", password: "" },
								errors: {},
							}),
							(e.schema = {
								username: ie.a.string().required().label("Username"),
								password: ie.a.string().required().label("Password"),
							}),
							(e.doSubmit = Object(B.a)(
								M.a.mark(function t() {
									var a, n, r;
									return M.a.wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															(t.prev = 0),
															(a = e.state.data),
															(t.next = 4),
															J.login(a.username, a.password)
														);
													case 4:
														(n = e.props.location.state),
															(window.location = n ? n.from.pathname : "/"),
															(t.next = 11);
														break;
													case 8:
														(t.prev = 8),
															(t.t0 = t.catch(0)),
															t.t0.response &&
																400 === t.t0.response.status &&
																(((r = Object(G.a)(
																	{},
																	e.state.errors
																)).username = t.t0.response.data),
																e.setState({ errors: r }));
													case 11:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[0, 8]]
									);
								})
							)),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									return J.getCurrentUser()
										? r.a.createElement(m.a, { to: "/" })
										: r.a.createElement(
												"div",
												null,
												r.a.createElement("img", {
													src: "/diamond_logo.png",
													width: "80",
													height: "50",
													alt: "dip logo",
												}),
												r.a.createElement(
													"h6",
													null,
													"Vehicle Access Control System"
												),
												r.a.createElement("h4", null, "Login"),
												r.a.createElement(
													"form",
													{ onSubmit: this.handleSubmit },
													this.renderInput("username", "Username"),
													this.renderInput("password", "Password", "password"),
													this.renderButton("Login")
												)
										  );
								},
							},
						]),
						a
					);
				})(be),
				Ne = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(s.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: "componentDidMount",
								value: function () {
									J.logout(), (window.location = "/");
								},
							},
							{
								key: "render",
								value: function () {
									return null;
								},
							},
						]),
						a
					);
				})(n.Component),
				Pe = a(79),
				xe = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, c = new Array(n), o = 0; o < n; o++)
							c[o] = arguments[o];
						return (
							((e = t.call.apply(t, [this].concat(c))).columns = [
								{
									path: "lp",
									label: "License Plate",
									content: function (e) {
										return r.a.createElement(
											p.b,
											{ to: "/inOutRecord/".concat(e._id) },
											" ",
											e.lp,
											" "
										);
									},
								},
								{ path: "Time", label: "Time" },
								{
									path: "Photo",
									label: "Photo",
									content: function (e) {
										return r.a.createElement(Pe.Img, {
											alt: "",
											src: "".concat(U.b).concat(e.Photo),
											width: "80",
											height: "50",
										});
									},
								},
								{ path: "CameraId", label: "Camera ID" },
								{ path: "direction", label: "direction" },
							]),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "render",
								value: function () {
									var e = this.props,
										t = e.inOutRecords,
										a = e.onSort,
										n = e.sortColumn;
									return r.a.createElement($, {
										columns: this.columns,
										data: t,
										sortColumn: n,
										onSort: a,
									});
								},
							},
						]),
						a
					);
				})(n.Component),
				Ae = U.a + "/inOutRecord";
			function Ie(e) {
				return q.get(((t = e), "".concat(Ae, "/").concat(t)));
				var t;
			}
			var _e = a(147),
				De = a(152),
				Me = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								inOutRecords: [],
								currentPage: 1,
								pageSize: 10,
								searchQuery: "",
								sortColumn: { path: "Time", order: "desc" },
							}),
							(e.handlePageChange = function (t) {
								e.setState({ currentPage: t });
							}),
							(e.handleSearch = function (t) {
								e.setState({ searchQuery: t, currentPage: 1 });
							}),
							(e.handleSort = function (t) {
								e.setState({ sortColumn: t });
							}),
							(e.getPagedData = function () {
								var t = e.state,
									a = t.pageSize,
									n = t.currentPage,
									r = t.sortColumn,
									c = t.searchQuery,
									o = t.inOutRecords,
									s = o;
								c &&
									(s = o.filter(function (e) {
										return e.lp
											.toString()
											.toLowerCase()
											.startsWith(c.toLowerCase());
									}));
								var l = ce(Y.a.orderBy(s, [r.path], [r.order]), n, a);
								return { totalCount: s.length, data: l };
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "convertTimezone",
								value: function (e) {
									return (
										Y.a.forEach(e, function (e, t) {
											var a = Object(_e.a)(e.Time, "Asia/Yangon");
											(a = Object(De.a)(a, "yyyy-MM-dd HH:mm:ss", {
												timeZone: "Asia/Yangon",
											})),
												(e.Time = a);
										}),
										e
									);
								},
							},
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), q.get(Ae);
															case 2:
																(t = e.sent),
																	(a = t.data),
																	(a = this.convertTimezone(a)),
																	this.setState({ inOutRecords: a });
															case 6:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "render",
								value: function () {
									var e = this.state.inOutRecords.length,
										t = this.state,
										a = t.pageSize,
										n = t.currentPage,
										c = t.sortColumn,
										o = t.searchQuery;
									if (0 === e)
										return r.a.createElement(
											I.a,
											{ component: "p" },
											"There is no InOut record."
										);
									var s = this.getPagedData(),
										l = s.totalCount,
										i = s.data;
									return r.a.createElement(
										"div",
										{ className: "row" },
										r.a.createElement(
											"div",
											{ className: "col" },
											r.a.createElement(
												I.a,
												{ variant: "h5", component: "h5" },
												"InOut records"
											),
											r.a.createElement(
												I.a,
												{ component: "p" },
												"Showing ",
												l,
												" InOut record."
											),
											r.a.createElement(oe, {
												value: o,
												onChange: this.handleSearch,
											}),
											r.a.createElement(xe, {
												inOutRecords: i,
												sortColumn: c,
												onSort: this.handleSort,
											}),
											r.a.createElement(ee, {
												itemsCount: l,
												pageSize: a,
												currentPage: n,
												onPageChange: this.handlePageChange,
											})
										)
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				Te = function () {
					return r.a.createElement("h1", null, "Not Found");
				},
				Be = function (e) {
					e.path;
					var t = e.component,
						a = e.render,
						n = Object(de.a)(e, ["path", "component", "render"]);
					return r.a.createElement(
						m.b,
						Object.assign({}, n, {
							render: function (e) {
								return W()
									? t
										? r.a.createElement(t, e)
										: a(e)
									: r.a.createElement(m.a, {
											to: { pathname: "/login", state: { from: e.location } },
									  });
							},
						})
					);
				},
				Le =
					(a(116),
					function (e) {
						return r.a.createElement(
							"div",
							{ className: "card text-center shadow" },
							r.a.createElement(
								"div",
								{ className: "overflow" },
								r.a.createElement("img", {
									src: e.imgsrc,
									alt: "imageOne",
									className: "card-img-top",
								})
							),
							r.a.createElement(
								"div",
								{ className: "card-body text-dark" },
								r.a.createElement("h4", { className: "card-title" }, e.title),
								r.a.createElement(
									"dl",
									{ className: "row" },
									r.a.createElement("dt", { className: "col-sm-4" }, "Time"),
									r.a.createElement(
										"dd",
										{ className: "col-sm-20" },
										e.data.Time
									)
								),
								r.a.createElement(
									"button",
									{ onClick: e.onSubmit, className: "btn btn-outline-success" },
									"GoBack"
								)
							)
						);
					}),
				Ue = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								data: { _id: "", lp: "", photo: "", Time: "", CameraId: 0 },
								errors: {},
							}),
							(e.doSubmit = function () {
								e.props.history.push("/inOutRecord");
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "populateInOutRecord",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a, n;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (
																	(t = this.props.match.params.id),
																	(e.next = 3),
																	Ie(t)
																);
															case 3:
																(a = e.sent),
																	(n = a.data),
																	this.setState({
																		data: this.mapToViewModel(n),
																	});
															case 6:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), this.populateInOutRecord();
															case 2:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "mapToViewModel",
								value: function (e) {
									return {
										_id: e._id,
										lp: e.lp,
										Photo: e.Photo,
										Time: e.Time,
										CameraId: e.CameraId,
									};
								},
							},
							{
								key: "render",
								value: function () {
									var e = this.state.data.Photo,
										t = ""
											.concat("http://localhost:30000/plateimages/")
											.concat(e);
									return r.a.createElement(
										"div",
										null,
										r.a.createElement(Le, {
											data: this.state.data,
											imgsrc: t,
											title: this.state.data.lp,
											onSubmit: this.doSubmit,
										})
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				Re = a(148),
				ze = a(156),
				Qe = a(149),
				qe = a(150),
				Ve = a(154),
				We = a(151),
				Fe = U.a + "/lane";
			function Je(e) {
				return q.get("".concat(Fe, "/").concat(e));
			}
			var Ge = (function (e) {
					Object(i.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						var e;
						Object(s.a)(this, a);
						for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
							r[c] = arguments[c];
						return (
							((e = t.call.apply(t, [this].concat(r))).state = {
								gate1lanes: [],
								gate2lanes: [],
								camera1_url:
									"http://192.168.100.101/video.mjpg?user=root&pw=koye6477",
								camera2_url:
									"http://192.168.100.103/video.mjpg?user=root&pw=koye6477",
								camera3_url:
									"http://192.168.100.110/video.mjpg?user=root&pw=koye6477",
								camera4_url:
									"http://192.168.100.101/video.mjpg?user=root&pw=koye6477",
							}),
							(e.handleClick = function () {
								e.state.gate1lanes[0].DO.map(function (e) {
									return e.VLAUE;
								});
							}),
							e
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: "componentDidMount",
								value: (function () {
									var e = Object(B.a)(
										M.a.mark(function e() {
											var t, a, n, r;
											return M.a.wrap(
												function (e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (e.next = 2), Je("1");
															case 2:
																return (
																	(t = e.sent),
																	(a = t.data),
																	(e.next = 6),
																	Je("2")
																);
															case 6:
																(n = e.sent),
																	(r = n.data),
																	(a[0].DO.length = 2),
																	(r[0].DO.length = 2),
																	this.setState({
																		gate1lanes: a,
																		gate2lanes: r,
																	});
															case 11:
															case "end":
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function () {
										return e.apply(this, arguments);
									};
								})(),
							},
							{
								key: "render",
								value: function () {
									return r.a.createElement(
										"div",
										null,
										r.a.createElement(
											Re.a,
											{ container: !0, spacing: 2, justify: "center" },
											r.a.createElement(
												Re.a,
												{ item: !0, xs: 3, sm: 3 },
												r.a.createElement(
													I.a,
													{ align: "center", variant: "h5" },
													" East Gate "
												),
												r.a.createElement(
													ze.a,
													{ onClick: this.handleClick },
													r.a.createElement(
														I.a,
														{ align: "center", variant: "subtitle1" },
														" IN "
													),
													r.a.createElement(Qe.a, {
														component: "img",
														title: "Camera 1",
														image: this.state.camera1_url,
													}),
													r.a.createElement(
														qe.a,
														null,
														r.a.createElement(
															I.a,
															{ variant: "subtitle2" },
															" ALB status"
														),
														r.a.createElement(We.a, {
															disabled: !0,
															control: r.a.createElement(Ve.a, {
																color: "primary",
															}),
															label: "Control ALB",
														})
													)
												)
											),
											r.a.createElement(
												Re.a,
												{ item: !0, xs: 3, sm: 3 },
												r.a.createElement(
													I.a,
													{ align: "center", variant: "h5" },
													" East Gate "
												),
												r.a.createElement(
													ze.a,
													null,
													r.a.createElement(
														I.a,
														{ align: "center", variant: "subtitle1" },
														" OUT "
													),
													r.a.createElement(Qe.a, {
														component: "img",
														title: "Camera 2",
														image: this.state.camera2_url,
													}),
													r.a.createElement(
														qe.a,
														null,
														r.a.createElement(
															I.a,
															{ variant: "subtitle2" },
															" ALB status"
														),
														r.a.createElement(We.a, {
															disabled: !0,
															control: r.a.createElement(Ve.a, {
																color: "primary",
															}),
															label: "Control ALB",
														})
													)
												)
											),
											r.a.createElement(
												Re.a,
												{ item: !0, xs: 3, sm: 3 },
												r.a.createElement(
													I.a,
													{ align: "center", variant: "h5" },
													" West Gate "
												),
												r.a.createElement(
													ze.a,
													null,
													r.a.createElement(
														I.a,
														{ align: "center", variant: "subtitle1" },
														" IN "
													),
													r.a.createElement(Qe.a, {
														component: "img",
														title: "Camera 3",
														image: this.state.camera3_url,
													}),
													r.a.createElement(
														qe.a,
														null,
														r.a.createElement(
															I.a,
															{ variant: "subtitle2" },
															" ALB status"
														),
														r.a.createElement(We.a, {
															disabled: !0,
															control: r.a.createElement(Ve.a, {
																color: "primary",
															}),
															label: "Control ALB",
														})
													)
												)
											),
											r.a.createElement(
												Re.a,
												{ item: !0, xs: 3, sm: 3 },
												r.a.createElement(
													I.a,
													{ align: "center", variant: "h5" },
													" West Gate "
												),
												r.a.createElement(
													ze.a,
													null,
													r.a.createElement(
														I.a,
														{ align: "center", variant: "subtitle1" },
														" OUT"
													),
													r.a.createElement(Qe.a, {
														component: "img",
														title: "Camera 4",
														image: this.state.camera4_url,
													}),
													r.a.createElement(
														qe.a,
														null,
														r.a.createElement(
															I.a,
															{ variant: "subtitle2" },
															" ALB status"
														),
														r.a.createElement(We.a, {
															disabled: !0,
															control: r.a.createElement(Ve.a, {
																color: "primary",
															}),
															label: "Control ALB",
														})
													)
												)
											)
										)
									);
								},
							},
						]),
						a
					);
				})(n.Component),
				He =
					(a(117),
					a(118),
					(function (e) {
						Object(i.a)(a, e);
						var t = Object(u.a)(a);
						function a() {
							var e;
							Object(s.a)(this, a);
							for (
								var n = arguments.length, r = new Array(n), c = 0;
								c < n;
								c++
							)
								r[c] = arguments[c];
							return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
						}
						return (
							Object(l.a)(a, [
								{
									key: "componentDidMount",
									value: function () {
										var e = J.getCurrentUser();
										this.setState({ user: e });
									},
								},
								{
									key: "render",
									value: function () {
										var e = this,
											t = this.state.user;
										return r.a.createElement(
											r.a.Fragment,
											null,
											r.a.createElement(d.a, null),
											r.a.createElement(_, { user: t }),
											r.a.createElement(
												"main",
												{ className: "container" },
												r.a.createElement(
													m.d,
													null,
													r.a.createElement(Be, {
														path: "/users/:id",
														component: Ce,
													}),
													r.a.createElement(m.b, {
														path: "/users",
														component: je,
													}),
													r.a.createElement(m.b, {
														path: "/login",
														component: Se,
													}),
													r.a.createElement(m.b, {
														path: "/logout",
														component: Ne,
													}),
													r.a.createElement(m.b, {
														path: "/lanes",
														component: Ge,
													}),
													r.a.createElement(Be, {
														path: "/members/:id",
														component: ve,
													}),
													r.a.createElement(m.b, {
														path: "/members",
														render: function (t) {
															return r.a.createElement(
																se,
																Object.assign({}, t, { user: e.state.user })
															);
														},
													}),
													r.a.createElement(Be, {
														path: "/inOutRecord/:id",
														component: Ue,
													}),
													r.a.createElement(m.b, {
														path: "/inOutRecord",
														render: function (t) {
															return r.a.createElement(
																Me,
																Object.assign({}, t, { user: e.state.user })
															);
														},
													}),
													r.a.createElement(m.b, {
														path: "/not-found",
														component: Te,
													}),
													r.a.createElement(m.a, {
														from: "/",
														exact: !0,
														to: "/inOutRecord",
													}),
													r.a.createElement(m.a, { to: "/not-found" })
												)
											)
										);
									},
								},
							]),
							a
						);
					})(n.Component));
			a(119),
				a(120),
				Boolean(
					"localhost" === window.location.hostname ||
						"[::1]" === window.location.hostname ||
						window.location.hostname.match(
							/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
						)
				);
			o.a.render(
				r.a.createElement(
					r.a.StrictMode,
					null,
					r.a.createElement(p.a, null, r.a.createElement(He, null))
				),
				document.getElementById("root")
			),
				"serviceWorker" in navigator &&
					navigator.serviceWorker.ready
						.then(function (e) {
							e.unregister();
						})
						.catch(function (e) {
							console.error(e.message);
						});
		},
		27: function (e) {
			e.exports = JSON.parse(
				'{"a":"http://localhost:30000/api","b":"http://localhost:30000/plateimages/"}'
			);
		},
		84: function (e, t, a) {
			e.exports = a(121);
		},
		89: function (e, t, a) {},
	},
	[[84, 1, 2]],
]);
//# sourceMappingURL=main.f2c0f172.chunk.js.map
