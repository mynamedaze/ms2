'use strict';
$(document).ready(function() {
    if (document.documentElement.clientWidth > 767) {
        var canvas = document.getElementById("canvas-space-context");
        var firstCanvas = document.getElementById('first');
        var ctx = canvas.getContext("2d");
        var cw = (canvas.width = window.innerWidth), cx = cw / 2;
        var ch = (canvas.height = window.innerHeight), cy = ch / 2;
        var m = {x: 0, y: 0};
        var target = {x: 0, y: 0};
        var speed = 0.00003;
        var easing = 0.93;
        var dragging = false;
        var starsNumber = 700;
        var stars = [];
        var vp = {x: cx, y: cy}; //vanishing point
        var fl = cx; // focal length
        var requestId = null;

        ctx.globalAlpha = .5;

        function Star(x, y, z) {
            this.r = 5;
            this.R = x - cx;
            // 3D position
            this.pos = {x: x, y: y, z: z};
            // 2D position
            this.x = x + cx;
            this.y = y + cy;


            this.a = {x: 0, y: 0};
            this.scale = {x: 1, y: 1};

            this.rotateX = function (angle) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var y1 = this.pos.y * cos - this.pos.z * sin;
                var z1 = this.pos.z * cos + this.pos.y * sin;

                this.pos.y = y1;
                this.pos.z = z1;
            };

            this.rotateY = function (angle) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var x1 = this.pos.x * cos - this.pos.z * sin;
                var z1 = this.pos.z * cos + this.pos.x * sin;

                this.pos.x = x1;
                this.pos.z = z1;
            };

            this.draw3D = function () {
                if (this.pos.z > -fl) {
                    var scale = fl / (fl - this.pos.z);

                    this.scale = {x: scale, y: scale};
                    this.x = vp.x + this.pos.x * scale;
                    this.y = vp.y + this.pos.y * scale;
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            };

            this.draw2D = function () {

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.scale(this.scale.x, this.scale.y);
                ctx.beginPath();
                //ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
                ctx.fillStyle = oGrd(this.r, 210);
                ctx.fillRect(0, 0, 2 * this.r, 2 * this.r);
                ctx.restore();
            };
        }

        function starsGenerator() {
            stars.length = 0;
            for (var i = 0; i < starsNumber; i++) {
                var x = Math.random() * 2 * cw - cw;
                var y = Math.random() * 2 * ch - ch;
                var z = Math.random() * 1000 - 500;
                stars.push(new Star(x, y, z));
            }
        }

//starsGenerator();


        function Draw() {
            requestId = window.requestAnimationFrame(Draw);
            ctx.clearRect(0, 0, cw, ch);
            txt();
            stars.map(function (s) {
                s.draw3D();

            });
            stars.sort(function (a, b) {
                return a.pos.z - b.pos.z;
            });

            target.x *= easing;
            target.y *= easing;

            stars.map(function (s) {
                s.rotateX(target.x);
                s.rotateY(target.y);
                if (s.visible) {
                    s.draw2D();
                }
            });
        }

//Draw();

        firstCanvas.addEventListener(
            "mousemove",
            function (evt) {
                dragging = true;
            },
            false
        );
        firstCanvas.addEventListener(
            "mousemove",
            function (evt) {
                if (dragging) {
                    m = oMousePos(canvas, evt);
                    target.x = (m.y - vp.y) * speed;
                    target.y = (m.x - vp.x) * speed;
                }
            },
            false
        );
        firstCanvas.addEventListener(
            "mouseup",
            function (evt) {
                dragging = false;
            },
            false
        );
        firstCanvas.addEventListener(
            "mouseoutp",
            function (evt) {
                dragging = false;
            },
            false
        );

        function oMousePos(canvas, evt) {
            var ClientRect = canvas.getBoundingClientRect();
            return {
                //objeto
                x: Math.round(evt.clientX - ClientRect.left),
                y: Math.round(evt.clientY - ClientRect.top)
            };
        }


        function oGrd(r, h) {
            var grd = ctx.createRadialGradient(r, r, 0, r, r, r);

            grd.addColorStop(0, "hsla(" + h + ",95%,95%, 1)");
            grd.addColorStop(0.4, "hsla(" + h + ",95%,45%,.5)");
            grd.addColorStop(1, "hsla(" + h + ", 95%, 45%, 0)");

            return grd;
        }

        function txt() {
            var t = "".split("").join(" ");
            ctx.font = "1.5em Lucida Console";
            ctx.fillStyle = "hsla(210,95%,45%,.75)";
            ctx.textAlign = "end";
            ctx.fillText(t, cw * .95, ch * .95);
        }


        function Init() {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
                requestId = null;
            }

            (cw = canvas.width = window.innerWidth), (cx = cw / 2);
            (cw = canvas.width = window.innerWidth), (cx = cw / 2);
            (ch = canvas.height = window.innerHeight), (cy = ch / 2);
            starsGenerator()

            var vp = {x: cx, y: cy}; //vanishing point
            var fl = cx; // focal length
            Draw();
        }

        window.setTimeout(function () {
            Init();
            window.addEventListener("resize", Init, false);
        }, 15);
    }
});