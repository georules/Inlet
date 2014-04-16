(function() {
    var e, t, r, n, o, i, s, a, l, u, c, h, d = [].slice;
    s = function(e, t, r) {
        r = r < 0 ? r + 1 : r > 1 ? r - 1 : r;
        if (r * 6 < 1) {
            return e + (t - e) * r * 6;
        }
        if (r * 2 < 1) {
            return t;
        }
        if (r * 3 < 2) {
            return e + (t - e) * (.66666 - r) * 6;
        }
        return e;
    };
    i = function(e, t, r) {
        var n, o;
        o = r <= .5 ? r * (t + 1) : r + t - r * t;
        n = r * 2 - o;
        return {
            r: s(n, o, e + .33333),
            g: s(n, o, e),
            b: s(n, o, e - .33333)
        };
    };
    c = function(e, t, r) {
        var n, o, i, s, a, l, u;
        s = Math.max(e, t, r);
        a = Math.min(e, t, r);
        n = s - a;
        u = s + a;
        o = a === s ? 0 : e === s ? (60 * (t - r) / n + 360) % 360 : t === s ? 60 * (r - e) / n + 120 : 60 * (e - t) / n + 240;
        i = u / 2;
        l = i === 0 ? 0 : i === 1 ? 1 : i <= .5 ? n / u : n / (2 - u);
        return {
            h: o,
            s: l,
            l: i
        };
    };
    o = function(e, t, r, o) {
        if (o != null) {
            return "hsla(" + n(Math.round(e * 180 / Math.PI), 360) + "," + Math.round(t * 100) + "%," + Math.round(r * 100) + "%," + o + ")";
        } else {
            return "hsl(" + n(Math.round(e * 180 / Math.PI), 360) + "," + Math.round(t * 100) + "%," + Math.round(r * 100) + "%)";
        }
    };
    r = function(e) {
        var t, r, n, o, i, s;
        s = document.createElement("span");
        document.body.appendChild(s);
        s.style.backgroundColor = e;
        i = getComputedStyle(s).backgroundColor;
        document.body.removeChild(s);
        n = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(i);
        if (!n) {
            n = /^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/.exec(i);
        }
        o = parseInt(n[1]);
        r = parseInt(n[2]);
        t = parseInt(n[3]);
        if (n[4]) {
            return {
                r: o / 255,
                g: r / 255,
                b: t / 255,
                a: parseFloat(n[4])
            };
        }
        return {
            r: o / 255,
            g: r / 255,
            b: t / 255
        };
    };
    a = function(e) {
        var t, r;
        r = document.createElement("span");
        document.body.appendChild(r);
        r.style.backgroundColor = e;
        t = r.style.backgroundColor.length > 0;
        r.remove();
        return t;
    };
    h = function(e, t) {
        var r, n;
        for (r in t) {
            n = t[r];
            e.style[r] = n;
        }
        return e;
    };
    n = function(e, t) {
        e = e % t;
        if (e < 0) {
            e += t;
        }
        return e;
    };
    l = function(e, t, r) {
        return t + (r - t) * Math.min(1, Math.max(0, e));
    };
    e = function() {
        function e(e, t, r) {
            var n, o, s, a, l, u, c, h, d, f, p, v, m, g, b, M, w, y, x;
            this.radius = e;
            this.width = t;
            this.lightness = r;
            e = this.radius;
            t = this.width;
            o = this.canvas = document.createElement("canvas");
            o.width = o.height = e * 2;
            s = o.getContext("2d");
            f = s.createImageData(o.width, o.height);
            l = f.data;
            for (g = b = 0, w = o.height; 0 <= w ? b < w : b > w; g = 0 <= w ? ++b : --b) {
                for (m = M = 0, y = o.width; 0 <= y ? M < y : M > y; m = 0 <= y ? ++M : --M) {
                    c = g - e;
                    u = m - e;
                    a = Math.sqrt(c * c + u * u);
                    if (a > e + 1.5) {
                        continue;
                    }
                    a -= 10;
                    v = Math.max(0, Math.min(1, a / (e - t / 2 - 10)));
                    d = Math.atan2(c, u) / (Math.PI * 2);
                    x = i(d, v, this.lightness), p = x.r, h = x.g, n = x.b;
                    l[(g * o.width + m) * 4 + 0] = p * 255;
                    l[(g * o.width + m) * 4 + 1] = h * 255;
                    l[(g * o.width + m) * 4 + 2] = n * 255;
                    l[(g * o.width + m) * 4 + 3] = 255;
                }
            }
            s.putImageData(f, 0, 0);
        }
        e.prototype.drawHSLCircle = function(e, t) {
            var r, n, o, i;
            e.width = e.height = 2 * this.radius;
            r = e.getContext("2d");
            i = this.width;
            o = this.radius;
            n = l(t, i, o);
            r.save();
            r.fillStyle = "rgba(0,0,0,0.3)";
            r.beginPath();
            r.arc(o, o, o, 0, Math.PI * 2);
            r.fill();
            r.fillStyle = "black";
            r.beginPath();
            r.arc(o, o, n, 0, Math.PI * 2);
            r.arc(o, o, n - i, 0, Math.PI * 2, true);
            r.fill();
            r.globalCompositeOperation = "source-in";
            r.drawImage(this.canvas, 0, 0);
            return r.restore();
        };
        return e;
    }();
    u = function(e) {
        if (typeof e === "string") {
            e = r(e);
        }
        if (e.r != null && e.g != null && e.b != null) {
            e = c(e.r, e.g, e.b);
            e.h = e.h * Math.PI / 180;
        } else if (e.h != null && e.s != null && e.l != null) {
            e.h = e.h * Math.PI / 180;
        }
        return e;
    };
    t = function() {
        var t, s, a, f, p, v, m, g;
        m = 80;
        g = 25;
        function b(e) {
            this.color = u(e);
            this.refColor = this.color;
            this.el = v();
            this.circleContainer = this.el.appendChild(s.call(this));
            this.lSlider = this.el.appendChild(p.call(this));
            this.colorPreview = this.el.appendChild(a.call(this));
            t.call(this);
            this.setLightness(this.color.l);
        }
        b.prototype.setHue = function(e) {
            var t, r, n;
            this.color.h = e;
            n = l(this.color.s, g, m) - g / 2;
            r = m - g / 2;
            h(this.hueKnob, {
                left: Math.round(r + Math.cos(e) * n + 6 - 1) + "px",
                top: Math.round(r + Math.sin(e) * n + 6 - 1) + "px"
            });
            this.colorPreview.style.backgroundColor = this.lKnob.style.backgroundColor = this.hueKnob.style.backgroundColor = o(this.color.h, this.color.s, this.color.l);
            t = o(this.color.h, this.color.s, .5);
            this.lSlider.style.backgroundImage = "-webkit-linear-gradient(bottom, black, " + t + " 50%, white)";
            this.lSlider.style.backgroundImage = "-moz-linear-gradient(bottom, black, " + t + " 50%, white)";
            return this.emit("changed");
        };
        b.prototype.setSaturation = function(e) {
            this.color.s = e;
            this.circle.drawHSLCircle(this.circleCanvas, e);
            return this.setHue(this.color.h);
        };
        b.prototype.setLightness = function(t) {
            this.color.l = t;
            this.circle = new e(m, g, t);
            this.lKnob.style.top = (1 - t) * this.lSlider._height - 11 + "px";
            return this.setSaturation(this.color.s);
        };
        b.prototype.setHSL = function(e, t, r) {
            this.color.h = n(e, 360) * Math.PI / 180;
            this.color.s = Math.max(0, Math.min(1, t));
            r = Math.max(0, Math.min(1, r));
            return this.setLightness(r);
        };
        b.prototype.getHSL = function() {
            return {
                h: n(this.color.h * 180 / Math.PI, 360),
                s: this.color.s,
                l: this.color.l
            };
        };
        b.prototype.setRGB = function(e, t, r) {
            var n, o, i, s;
            s = c(e, t, r), n = s.h, i = s.s, o = s.l;
            return this.setHSL(n, i, o);
        };
        b.prototype.getRGB = function() {
            return i(this.color.h / (Math.PI * 2), this.color.s, this.color.l);
        };
        b.prototype.getCSS = function() {
            return o(this.color.h, this.color.s, this.color.l);
        };
        b.prototype.setCSS = function(e) {
            var t, n, o, i;
            i = r(e), o = i.r, n = i.g, t = i.b;
            return this.setRGB(o, n, t);
        };
        b.prototype.on = function(e, t) {
            var r;
            if (this._listeners == null) {
                this._listeners = {};
            }
            return ((r = this._listeners)[e] != null ? r[e] : r[e] = []).push(t);
        };
        b.prototype.emit = function() {
            var e, t, r, n, o, i, s, a;
            t = arguments[0], e = 2 <= arguments.length ? d.call(arguments, 1) : [];
            if (this._listeners) {
                s = (i = this._listeners[t]) != null ? i : [];
                a = [];
                for (n = 0, o = s.length; n < o; n++) {
                    r = s[n];
                    a.push(r.call.apply(r, [ this ].concat(d.call(e))));
                }
                return a;
            }
        };
        b.prototype.removeListener = function(e, t) {
            var r;
            if (this._listeners[e]) {
                return this._listeners[e] = function() {
                    var n, o, i, s;
                    i = this._listeners[e];
                    s = [];
                    for (n = 0, o = i.length; n < o; n++) {
                        r = i[n];
                        if (r !== t) {
                            s.push(r);
                        }
                    }
                    return s;
                }.call(this);
            }
        };
        t = function() {
            var e, t;
            this.lKnob.onmousedown = function(e) {
                return function(t) {
                    var r, n;
                    document.documentElement.style.cursor = "pointer";
                    window.addEventListener("mousemove", r = function(t) {
                        var r, n;
                        r = e.lSlider.getBoundingClientRect();
                        n = t.clientY - r.top;
                        return e.setLightness(Math.max(0, Math.min(1, 1 - n / e.lSlider._height)));
                    });
                    window.addEventListener("mouseup", n = function(e) {
                        window.removeEventListener("mousemove", r);
                        window.removeEventListener("mouseup", n);
                        window.removeEventListener("blur", n);
                        return document.documentElement.style.cursor = "";
                    });
                    window.addEventListener("blur", n);
                    t.preventDefault();
                    return t.stopPropagation();
                };
            }(this);
            e = this.circleContainer;
            t = function(t) {
                return function(r) {
                    var n, o, i, s, a, u, c;
                    u = r.layerX;
                    c = r.layerY;
                    o = u - m;
                    i = c - m;
                    n = Math.sqrt(o * o + i * i);
                    a = Math.atan2(i, o);
                    s = l(t.color.s, g, m);
                    if (s - g < n && n < s) {
                        if (-Math.PI / 8 < a && a < Math.PI / 8 || a >= 7 * Math.PI / 8 || a <= -7 * Math.PI / 8) {
                            return e.style.cursor = "ew-resize";
                        } else if (Math.PI / 8 <= a && a < 3 * Math.PI / 8 || -7 * Math.PI / 8 < a && a <= -5 * Math.PI / 8) {
                            return e.style.cursor = "nwse-resize";
                        } else if (3 * Math.PI / 8 <= a && a < 5 * Math.PI / 8 || -5 * Math.PI / 8 < a && a <= -3 * Math.PI / 8) {
                            return e.style.cursor = "ns-resize";
                        } else if (5 * Math.PI / 8 <= a && a < 7 * Math.PI / 8 || -3 * Math.PI / 8 < a && a <= -Math.PI / 8) {
                            return e.style.cursor = "nesw-resize";
                        }
                    } else {
                        return e.style.cursor = "";
                    }
                };
            }(this);
            e.addEventListener("mouseover", function(r) {
                var n, o;
                t(r);
                e.addEventListener("mousemove", n = function(e) {
                    return t(e);
                });
                e.addEventListener("mouseout", o = function(t) {
                    e.style.cursor = "";
                    e.removeEventListener("mousemove", n);
                    e.removeEventListener("mouseout", o);
                    return window.removeEventListener("blur", o);
                });
                return window.addEventListener("blur", o);
            });
            e.addEventListener("mousedown", function(t) {
                return function(r) {
                    var n, o, i, s, a, u, c, h, d;
                    r.preventDefault();
                    h = r.layerX;
                    d = r.layerY;
                    o = h - m;
                    i = d - m;
                    n = Math.sqrt(o * o + i * i);
                    u = Math.atan2(i, o);
                    a = l(t.color.s, g, m);
                    if (!(a - g < n && n < a)) {
                        return;
                    }
                    document.documentElement.style.cursor = e.style.cursor;
                    window.addEventListener("mousemove", s = function(e) {
                        var r, s, l;
                        a = t.circleCanvas.getBoundingClientRect();
                        r = a.left + a.width / 2;
                        s = a.top + a.height / 2;
                        o = e.clientX - r;
                        i = e.clientY - s;
                        n = Math.sqrt(o * o + i * i);
                        n -= 10;
                        l = Math.max(0, Math.min(1, n / (m - g / 2 - 10)));
                        return t.setSaturation(l);
                    });
                    window.addEventListener("mouseup", c = function(e) {
                        window.removeEventListener("mousemove", s);
                        window.removeEventListener("mouseup", c);
                        window.removeEventListener("blur", c);
                        return document.documentElement.style.cursor = "";
                    });
                    return window.addEventListener("blur", c);
                };
            }(this));
            return this.hueKnob.onmousedown = function(e) {
                return function(t) {
                    var r, n;
                    document.documentElement.style.cursor = "pointer";
                    window.addEventListener("mousemove", r = function(t) {
                        var r, n, o;
                        o = e.circleCanvas.getBoundingClientRect();
                        r = o.left + o.width / 2;
                        n = o.top + o.height / 2;
                        return e.setHue(Math.atan2(t.clientY - n, t.clientX - r));
                    });
                    window.addEventListener("mouseup", n = function(e) {
                        window.removeEventListener("mousemove", r);
                        window.removeEventListener("mouseup", n);
                        window.removeEventListener("blur", n);
                        return document.documentElement.style.cursor = "";
                    });
                    window.addEventListener("blur", n);
                    t.preventDefault();
                    return t.stopPropagation();
                };
            }(this);
        };
        v = function() {
            var e;
            e = document.createElement("div");
            e.className = "picker";
            h(e, {
                display: "inline-block",
                background: "hsl(0, 0%, 97%)",
                padding: "6px",
                borderRadius: "6px",
                boxShadow: "1px 1px 5px hsla(0, 0%, 39%, 0.2), hsla(0, 0%, 100%, 0.9) 0px 0px 1em 0.3em inset",
                border: "1px solid hsla(0, 0%, 59%, 0.2)",
                position: "absolute",
                backgroundImage: "-webkit-linear-gradient(left top, hsla(0, 0%, 0%, 0.05) 25%, transparent 25%, transparent 50%, hsla(0, 0%, 0%, 0.05) 50%, hsla(0, 0%, 0%, 0.05) 75%, transparent 75%, transparent)",
                backgroundSize: "40px 40px"
            });
            h(e, {
                backgroundImage: "-moz-linear-gradient(left top, hsla(0, 0%, 0%, 0.05) 25%, transparent 25%, transparent 50%, hsla(0, 0%, 0%, 0.05) 50%, hsla(0, 0%, 0%, 0.05) 75%, transparent 75%, transparent)",
                zIndex: "1000"
            });
            return e;
        };
        s = function() {
            var e, t;
            e = document.createElement("div");
            h(e, {
                display: "inline-block",
                width: m * 2 + "px",
                height: m * 2 + "px",
                borderRadius: m + "px",
                boxShadow: "0px 0px 7px rgba(0,0,0,0.3)"
            });
            e.appendChild(this.circleCanvas = document.createElement("canvas"));
            this.hueKnob = t = f(27);
            e.appendChild(t);
            return e;
        };
        p = function() {
            var e, t;
            t = document.createElement("div");
            h(t, {
                display: "inline-block",
                width: "20px",
                height: m * 2 - 22 + "px",
                marginLeft: "6px",
                borderRadius: "10px",
                boxShadow: "hsla(0, 100%, 100%, 0.1) 0 1px 2px 1px inset, hsla(0, 100%, 100%, 0.2) 0 1px inset, hsla(0, 0%, 0%, 0.4) 0 -1px 1px inset, hsla(0, 0%, 0%, 0.4) 0 1px 1px",
                position: "relative",
                top: "-11px"
            });
            t._height = m * 2 - 22;
            this.lKnob = e = f(22);
            h(e, {
                left: "-1px"
            });
            t.appendChild(e);
            return t;
        };
        a = function() {
            var e, t, r;
            e = document.createElement("div");
            t = o(this.refColor.h, this.refColor.s, this.refColor.l);
            r = o(this.refColor.h, this.refColor.s, this.refColor.l, 0);
            h(e, {
                boxShadow: "hsla(0, 0%, 0%, 0.5) 0 1px 5px, hsla(0, 100%, 100%, 0.4) 0 1px 1px inset, hsla(0, 0%, 0%, 0.3) 0 -1px 1px inset",
                height: "25px",
                marginTop: "6px",
                borderRadius: "3px",
                backgroundImage: "-webkit-linear-gradient(-20deg, " + r + ", " + r + " 69%, " + t + " 70%, " + t + ")"
            });
            h(e, {
                backgroundImage: "-moz-linear-gradient(-20deg, " + r + ", " + r + " 69%, " + t + " 70%, " + t + ")"
            });
            return e;
        };
        f = function(e) {
            var t;
            t = document.createElement("div");
            t.className = "knob";
            h(t, {
                position: "absolute",
                width: e + "px",
                height: e + "px",
                backgroundColor: "red",
                borderRadius: Math.floor(e / 2) + "px",
                cursor: "pointer",
                backgroundImage: "-webkit-gradient(radial, 50% 0%, 0, 50% 0%, 15, color-stop(0%, rgba(255, 255, 255, 0.8)), color-stop(100%, rgba(255, 255, 255, 0.2)))",
                boxShadow: "white 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px -1px 1px inset, rgba(0, 0, 0, 0.4) 0px 1px 4px 0px, rgba(0, 0, 0, 0.6) 0 0 2px"
            });
            h(t, {
                backgroundImage: "radial-gradient(circle at center top, rgba(255,255,255,0.8), rgba(255, 255, 255, 0.2) 15px"
            });
            return t;
        };
        b.prototype.presentModal = function(e, t) {
            var r;
            h(this.el, {
                left: e + "px",
                top: t - 10 + "px",
                opacity: "0",
                webkitTransition: "0.15s",
                MozTransition: "0.15s"
            });
            r = document.createElement("div");
            r.style.position = "fixed";
            r.style.top = r.style.left = r.style.bottom = r.style.right = "0";
            r.style.zIndex = "999";
            r.onclick = function(e) {
                return function() {
                    var n;
                    document.body.removeChild(r);
                    e.el.style.top = t + 10 + "px";
                    e.el.style.opacity = 0;
                    n = function() {
                        document.body.removeChild(e.el);
                        e.el.removeEventListener("webkitTransitionEnd", n);
                        return e.el.removeEventListener("transitionend", n);
                    };
                    e.el.addEventListener("webkitTransitionEnd", n);
                    e.el.addEventListener("transitionend", n);
                    return e.emit("closed");
                };
            }(this);
            document.body.appendChild(r);
            document.body.appendChild(this.el);
            this.el.offsetHeight;
            this.el.style.opacity = "1";
            this.el.style.top = t + "px";
            return this;
        };
        b.prototype.presentModalBeneath = function(e) {
            var t, r, n;
            t = e.getBoundingClientRect();
            r = t.left + window.scrollX;
            n = t.bottom + window.scrollY + 4;
            return this.presentModal(r, n);
        };
        return b;
    }();
    window.thistle = {
        Picker: t,
        isValidCSSColor: a
    };
}).call(this);

if (typeof Color === "undefined") var Color = {};

if (typeof Color.Space === "undefined") Color.Space = {};

(function() {
    "use strict";
    var useEval = false;
    var functions = {};
    var shortcuts = {
        "HEX24>HSL": "HEX24>RGB>HSL",
        "HEX32>HSLA": "HEX32>RGBA>HSLA",
        "HEX24>CMYK": "HEX24>RGB>CMY>CMYK",
        "RGB>CMYK": "RGB>CMY>CMYK"
    };
    var root = Color.Space = function(color, route) {
        if (shortcuts[route]) {
            route = shortcuts[route];
        }
        var r = route.split(">");
        if (typeof color === "object" && color[0] >= 0) {
            var type = r[0];
            var tmp = {};
            for (var i = 0; i < type.length; i++) {
                var str = type.substr(i, 1);
                tmp[str] = color[i];
            }
            color = tmp;
        }
        if (functions[route]) {
            return functions[route](color);
        }
        var f = "color";
        for (var pos = 1, key = r[0]; pos < r.length; pos++) {
            if (pos > 1) {
                key = key.substr(key.indexOf("_") + 1);
            }
            key += (pos === 0 ? "" : "_") + r[pos];
            color = root[key](color);
            if (useEval) {
                f = "Color.Space." + key + "(" + f + ")";
            }
        }
        if (useEval) {
            functions[route] = eval("(function(color) { return " + f + " })");
        }
        return color;
    };
    root.RGB_W3 = function(e) {
        return "rgb(" + (e.R >> 0) + "," + (e.G >> 0) + "," + (e.B >> 0) + ")";
    };
    root.RGBA_W3 = function(e) {
        var t = typeof e.A === "number" ? e.A / 255 : 1;
        return "rgba(" + (e.R >> 0) + "," + (e.G >> 0) + "," + (e.B >> 0) + "," + t + ")";
    };
    root.W3_RGB = function(e) {
        e = e.substr(4, e.length - 5).split(",");
        return {
            R: parseInt(e[0], 10),
            G: parseInt(e[1], 10),
            B: parseInt(e[2], 10)
        };
    };
    root.W3_RGBA = function(e) {
        e = e.substr(5, e.length - 6).split(",");
        return {
            R: parseInt(e[0], 10),
            G: parseInt(e[1], 10),
            B: parseInt(e[2], 10),
            A: parseFloat(e[3]) * 255
        };
    };
    root.HSL_W3 = function(e) {
        return "hsl(" + (e.H + .5 >> 0) + "," + (e.S + .5 >> 0) + "%," + (e.L + .5 >> 0) + "%)";
    };
    root.HSLA_W3 = function(e) {
        var t = typeof e.A === "number" ? e.A / 255 : 1;
        return "hsla(" + (e.H + .5 >> 0) + "," + (e.S + .5 >> 0) + "%," + (e.L + .5 >> 0) + "%," + t + ")";
    };
    root.W3_HSL = function(e) {
        var t = e.indexOf("(") + 1;
        var r = e.indexOf(")");
        e = e.substr(t, r - t).split(",");
        return {
            H: parseInt(e[0], 10),
            S: parseInt(e[1], 10),
            L: parseInt(e[2], 10)
        };
    };
    root.W3_HSLA = function(e) {
        var t = e.indexOf("(") + 1;
        var r = e.indexOf(")");
        e = e.substr(t, r - t).split(",");
        return {
            H: parseInt(e[0], 10),
            S: parseInt(e[1], 10),
            L: parseInt(e[2], 10),
            A: parseFloat(e[3], 10) * 255
        };
    };
    root.W3_HEX = root.W3_HEX24 = function(e) {
        if (e.substr(0, 1) === "#") e = e.substr(1);
        if (e.length === 3) e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2];
        return parseInt("0x" + e, 16);
    };
    root.W3_HEX32 = function(e) {
        if (e.substr(0, 1) === "#") e = e.substr(1);
        if (e.length === 6) {
            return parseInt("0xFF" + e, 10);
        } else {
            return parseInt("0x" + e, 16);
        }
    };
    root.HEX_W3 = root.HEX24_W3 = function(e, t) {
        if (!t) t = 6;
        if (!e) e = 0;
        var r;
        var n = e.toString(16);
        r = n.length;
        while (r < t) {
            n = "0" + n;
            r++;
        }
        r = n.length;
        while (r > t) {
            n = n.substr(1);
            r--;
        }
        return "#" + n;
    };
    root.HEX32_W3 = function(e) {
        return root.HEX_W3(e, 8);
    };
    root.HEX_RGB = root.HEX24_RGB = function(e) {
        return {
            R: e >> 16,
            G: e >> 8 & 255,
            B: e & 255
        };
    };
    root.HEX32_RGBA = function(e) {
        return {
            R: e >>> 16 & 255,
            G: e >>> 8 & 255,
            B: e & 255,
            A: e >>> 24
        };
    };
    root.RGBA_HEX32 = function(e) {
        return (e.A << 24 | e.R << 16 | e.G << 8 | e.B) >>> 0;
    };
    root.RGB_HEX24 = root.RGB_HEX = function(e) {
        if (e.R < 0) e.R = 0;
        if (e.G < 0) e.G = 0;
        if (e.B < 0) e.B = 0;
        if (e.R > 255) e.R = 255;
        if (e.G > 255) e.G = 255;
        if (e.B > 255) e.B = 255;
        return e.R << 16 | e.G << 8 | e.B;
    };
    root.RGB_CMY = function(e) {
        return {
            C: 1 - e.R / 255,
            M: 1 - e.G / 255,
            Y: 1 - e.B / 255
        };
    };
    root.RGBA_HSLA = root.RGB_HSL = function(e) {
        var t = e.R / 255, r = e.G / 255, n = e.B / 255, o = Math.min(t, r, n), i = Math.max(t, r, n), s = i - o, a, l, u = (i + o) / 2;
        if (s === 0) {
            a = 0;
            l = 0;
        } else {
            if (u < .5) l = s / (i + o); else l = s / (2 - i - o);
            var c = ((i - t) / 6 + s / 2) / s;
            var h = ((i - r) / 6 + s / 2) / s;
            var d = ((i - n) / 6 + s / 2) / s;
            if (t === i) a = d - h; else if (r === i) a = 1 / 3 + c - d; else if (n === i) a = 2 / 3 + h - c;
            if (a < 0) a += 1;
            if (a > 1) a -= 1;
        }
        return {
            H: a * 360,
            S: l * 100,
            L: u * 100,
            A: e.A
        };
    };
    root.RGBA_HSVA = root.RGB_HSV = function(e) {
        var t = e.R / 255, r = e.G / 255, n = e.B / 255, o = Math.min(t, r, n), i = Math.max(t, r, n), s = i - o, a, l, u = i;
        if (s === 0) {
            a = 0;
            l = 0;
        } else {
            l = s / i;
            var c = ((i - t) / 6 + s / 2) / s;
            var h = ((i - r) / 6 + s / 2) / s;
            var d = ((i - n) / 6 + s / 2) / s;
            if (t === i) a = d - h; else if (r === i) a = 1 / 3 + c - d; else if (n === i) a = 2 / 3 + h - c;
            if (a < 0) a += 1;
            if (a > 1) a -= 1;
        }
        return {
            H: a * 360,
            S: l * 100,
            V: u * 100,
            A: e.A
        };
    };
    root.CMY_RGB = function(e) {
        return {
            R: Math.max(0, (1 - e.C) * 255),
            G: Math.max(0, (1 - e.M) * 255),
            B: Math.max(0, (1 - e.Y) * 255)
        };
    };
    root.CMY_CMYK = function(e) {
        var t = e.C;
        var r = e.M;
        var n = e.Y;
        var o = Math.min(n, Math.min(r, Math.min(t, 1)));
        t = Math.round((t - o) / (1 - o) * 100);
        r = Math.round((r - o) / (1 - o) * 100);
        n = Math.round((n - o) / (1 - o) * 100);
        o = Math.round(o * 100);
        return {
            C: t,
            M: r,
            Y: n,
            K: o
        };
    };
    root.CMYK_CMY = function(e) {
        return {
            C: e.C * (1 - e.K) + e.K,
            M: e.M * (1 - e.K) + e.K,
            Y: e.Y * (1 - e.K) + e.K
        };
    };
    root.HSLA_RGBA = root.HSL_RGB = function(e) {
        var t = e.H / 360;
        var r = e.S / 100;
        var n = e.L / 100;
        var o, i, s;
        var a, l, u;
        if (r === 0) {
            o = i = s = n;
        } else {
            if (n < .5) l = n * (1 + r); else l = n + r - r * n;
            a = 2 * n - l;
            u = t + 1 / 3;
            if (u < 0) u += 1;
            if (u > 1) u -= 1;
            if (6 * u < 1) o = a + (l - a) * 6 * u; else if (2 * u < 1) o = l; else if (3 * u < 2) o = a + (l - a) * (2 / 3 - u) * 6; else o = a;
            u = t;
            if (u < 0) u += 1;
            if (u > 1) u -= 1;
            if (6 * u < 1) i = a + (l - a) * 6 * u; else if (2 * u < 1) i = l; else if (3 * u < 2) i = a + (l - a) * (2 / 3 - u) * 6; else i = a;
            u = t - 1 / 3;
            if (u < 0) u += 1;
            if (u > 1) u -= 1;
            if (6 * u < 1) s = a + (l - a) * 6 * u; else if (2 * u < 1) s = l; else if (3 * u < 2) s = a + (l - a) * (2 / 3 - u) * 6; else s = a;
        }
        return {
            R: o * 255,
            G: i * 255,
            B: s * 255,
            A: e.A
        };
    };
    root.HSVA_RGBA = root.HSV_RGB = function(e) {
        var t = e.H / 360;
        var r = e.S / 100;
        var n = e.V / 100;
        var o, i, s, a, l, u;
        if (r === 0) {
            o = i = s = Math.round(n * 255);
        } else {
            if (t >= 1) t = 0;
            t = 6 * t;
            a = t - Math.floor(t);
            l = Math.round(255 * n * (1 - r));
            s = Math.round(255 * n * (1 - r * a));
            u = Math.round(255 * n * (1 - r * (1 - a)));
            n = Math.round(255 * n);
            switch (Math.floor(t)) {
              case 0:
                o = n;
                i = u;
                s = l;
                break;

              case 1:
                o = s;
                i = n;
                s = l;
                break;

              case 2:
                o = l;
                i = n;
                s = u;
                break;

              case 3:
                o = l;
                i = s;
                s = n;
                break;

              case 4:
                o = u;
                i = l;
                s = n;
                break;

              case 5:
                o = n;
                i = l;
                s = s;
                break;
            }
        }
        return {
            R: o,
            G: i,
            B: s,
            A: e.A
        };
    };
})();

Inlet = function() {
    function e(e, t) {
        var r = e;
        var n;
        var o;
        if (!t) t = {};
        if (!t.picker) t.picker = {};
        if (!t.slider) t.slider = {};
        var i = t.container || document.body;
        var s = t.picker.topOffset || 220;
        var a = t.picker.bottomOffset || 16;
        var l = t.picker.topBoundary || 250;
        var u = t.picker.leftOffset || 75;
        var c = t.slider.yOffset || 15;
        var h = r.getWrapperElement();
        h.addEventListener("mousedown", w);
        r.setOption("onKeyEvent", b);
        var d = document.createElement("div");
        d.className = "inlet_slider scrub";
        d.style.visibility = "hidden";
        d.style.position = "absolute";
        d.style.top = 0;
        i.appendChild(d);
        deltaForNumber = function(e) {
            var t, r, n, o;
            if (e === 0) {
                return 1;
            }
            if (e === 1) {
                return .1;
            }
            r = function(e) {
                return Math.round((e / 10 - Math.floor(e / 10)) * 10);
            };
            t = function(e) {
                var t;
                e = Math.abs(e);
                t = 0;
                while (r(e) === 0) {
                    t++;
                    e /= 10;
                }
                return t;
            };
            o = function(e) {
                var t, r, n;
                n = 0;
                while (true) {
                    t = Math.abs(e);
                    r = t - Math.floor(t);
                    if (r < 1e-6) {
                        return n;
                    }
                    n++;
                    e = e * 10;
                }
            };
            n = o(e);
            if (n > 0) {
                return Math.pow(10, -n);
            } else {
                e = Math.abs(e);
                return Math.pow(10, Math.max(0, t(e) - 1));
            }
        };
        function f(e) {
            e.preventDefault();
            mx = e.pageX;
            var t = r.getCursor(true);
            var n = x(t, "number");
            if (!n) return;
            var o = Number(n.string).valueOf();
            console.log(o);
            delta = deltaForNumber(o);
            console.log(delta);
            onSlideMouseUp = function(e) {
                window.removeEventListener("mousemove", moved);
                d.style.visibility = "hidden";
            };
            moved = function(e) {
                e.preventDefault();
                var t = r.getCursor(true);
                var n = x(t, "number");
                if (!n) {
                    onSlideMouseUp();
                    return;
                }
                var i = Number((Math.round((e.pageX - mx) / 2) * delta + o).toFixed(5));
                var s = {
                    line: t.line,
                    ch: n.start
                };
                var a = {
                    line: t.line,
                    ch: n.end
                };
                console.log(i);
                r.replaceRange(String(i), s, a);
            };
            window.addEventListener("mouseup", onSlideMouseUp);
            window.addEventListener("mousemove", moved);
        }
        var p = 37;
        var v = 38;
        var m = 39;
        var g = 40;
        function b() {
            if (arguments.length == 1) {
                event = arguments[0];
            } else {
                event = arguments[1];
            }
            if (event.keyCode == p || event.keyCode == g) {
                if (d.style.visibility === "visible") {
                    n.stepDown(1);
                    f();
                    return true;
                } else if (event.altKey) {
                    w();
                } else {}
            } else if (event.keyCode == m || event.keyCode == v) {
                if (d.style.visibility === "visible") {
                    n.stepUp(1);
                    f();
                    return true;
                } else if (event.altKey) {
                    w();
                } else {}
            } else {
                d.style.visibility = "hidden";
            }
        }
        var M = function(e, t) {
            var n = r.getCursor();
            if (!t) return;
            var o = x(n, t);
            var i = {
                line: n.line,
                ch: o.start
            };
            var s = {
                line: n.line,
                ch: o.end
            };
            r.replaceRange(e, i, s);
        };
        o = new thistle.Picker("#ffffff");
        function w(e) {
            var t = r.getCursor(true);
            var n = r.getTokenAt(t);
            cursorOffset = r.cursorCoords(true, "page");
            var i = x(t, "number");
            var h = x(t, "hsl");
            var p = x(t, "hex");
            var v = x(t, "rgb");
            var m = cursorOffset.top - s;
            if (cursorOffset.top < l) {
                m = cursorOffset.top + a;
            }
            var g = cursorOffset.left - u;
            d.style.visibility = "hidden";
            if (p) {
                var b = p.string;
                o = new thistle.Picker(b);
                o.setCSS(b);
                o.presentModal(g, m);
                o.on("changed", function() {
                    picked = o.getCSS();
                    picked = Color.Space(picked, "W3>HSL>RGB>HEX24>W3");
                    M(picked, "hex");
                });
            } else if (h) {
                var b = h.string;
                o = new thistle.Picker(b);
                o.setCSS(b);
                o.presentModal(g, m);
                o.on("changed", function() {
                    picked = o.getCSS();
                    M(picked, "hsl");
                });
            } else if (v) {
                var b = v.string;
                o = new thistle.Picker(b);
                o.setCSS(b);
                o.presentModal(g, m);
                o.on("changed", function() {
                    picked = o.getCSS();
                    picked = Color.Space(picked, "W3>HSL>RGB>W3");
                    M(picked, "rgb");
                });
            } else if (i) {
                var w = i.string.length;
                var y = cursorOffset.top - c;
                var C = w * 16;
                var E = cursorOffset.left - C / 2;
                d.style.top = y + 10 + "px";
                d.style.left = E + "px";
                d.style.width = C + "px";
                e.preventDefault();
                d.style.visibility = "visible";
                f(e);
            } else {}
        }
        function y(e) {
            var t, r, n, o;
            if (e === 0) {
                t = [ -100, 100 ];
            } else {
                t = [ -e * 3, e * 5 ];
            }
            if (t[0] < t[1]) {
                min = t[0];
                max = t[1];
            } else {
                min = t[1];
                max = t[0];
            }
            if (max - min > 20) {
                r = 1;
            } else {
                r = (max - min) / 200;
            }
            return {
                min: min,
                max: max,
                step: r
            };
        }
        function x(e, t) {
            if (!t) return;
            var n;
            switch (t.toLowerCase()) {
              case "hsl":
                n = /hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)/g;
                break;

              case "rgb":
                n = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
                break;

              case "hex":
                n = /#[a-fA-F0-9]{3,6}/g;
                break;

              case "number":
                n = /[-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
                break;

              default:
                throw new Error("invalid match selection");
                return;
            }
            var o = r.getLine(e.line);
            var i = n.exec(o);
            while (i) {
                var s = i[0];
                var a = s.length;
                var l = i.index;
                var u = i.index + a;
                if (e.ch >= l && e.ch <= u) {
                    i = null;
                    return {
                        start: l,
                        end: u,
                        string: s
                    };
                }
                i = n.exec(o);
            }
            return;
        }
    }
    function t(e) {
        var t = 0;
        if (e.length > 2) {
            t = parseFloat(e.slice(0, e.length - 2));
        }
        if (!t) t = 0;
        return t;
    }
    function r(e) {
        var t = 0;
        var r = 0;
        while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
            t += e.offsetLeft - e.scrollLeft;
            r += e.offsetTop - e.scrollTop;
            e = e.offsetParent;
        }
        return {
            top: r,
            left: t
        };
    }
    return e;
}();