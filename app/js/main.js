

const organization = document.getElementById('organization'),
    telegram = document.getElementById('telegram'),
    projectLink = document.getElementById('link-project'),
    additional = document.getElementById('additional'),
    brif = document.querySelector('.brif'),
    sendOraganization = document.getElementById('send-organization'),
    sendTelegram = document.getElementById('send-telegram'),
    sendAdditional = document.getElementById('send-additional');


var Engine,
    Render,
    Events,
    MouseConstraint,
    Mouse,
    World,
    Bodies,
    engine,
    world,
    render,
    canvas;


var interactiveBox = document.getElementById('interactive-box');
let widthCanvas, heightCanvas;

if (interactiveBox) {
    const resizeBox = new ResizeObserver(entries => {
        entries.forEach(entry => {
            widthCanvas = entry.contentRect.width
            heightCanvas = entry.contentRect.height
        })
        // console.log(widthCanvas);
    })
    resizeBox.observe(interactiveBox);
}



if (brif) {
    var tuluzz = new ProgressBar.Line('.brif-progressbar__indicator', {
        strokeWidth: 2,
        easing: 'easeInOut',
        duration: 2000,
        color: '#000',
        trailColor: 'transparent',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '15px' },
        from: { color: '#000' },
        to: { color: '#000' },
        step: (state, bar) => {
            if (state.offset < 75 && state.offset >= 50) {
                bar.path.setAttribute('stroke', '#9ecc00')
            } else {
                bar.path.setAttribute('stroke', state.color)
            }

        }
    });
    tuluzz.animate(.25, 0);
}



// let Engine = null
// let World = null
// let engine = null
// let world = null

const noise = () => {


    console.clear();

    class Grain {
        constructor(el) {
            /**
             * Options
             * Increase the pattern size if visible pattern
             */
            this.patternSize = 150;
            this.patternScaleX = 1;
            this.patternScaleY = 1;
            this.patternRefreshInterval = 3; // 8
            this.patternAlpha = 15; // int between 0 and 255,

            /**
             * Create canvas
             */
            this.canvas = el;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.scale(this.patternScaleX, this.patternScaleY);

            /**
             * Create a canvas that will be used to generate grain and used as a
             * pattern on the main canvas.
             */
            this.patternCanvas = document.createElement('canvas');
            this.patternCanvas.width = this.patternSize;
            this.patternCanvas.height = this.patternSize;
            this.patternCtx = this.patternCanvas.getContext('2d');
            this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
            this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4

            /**
             * Prebind prototype function, so later its easier to user
             */
            this.resize = this.resize.bind(this);
            this.loop = this.loop.bind(this);

            this.frame = 0;

            window.addEventListener('resize', this.resize);
            this.resize();

            window.requestAnimationFrame(this.loop);
        }

        resize() {
            this.canvas.width = window.innerWidth * devicePixelRatio;
            this.canvas.height = window.innerHeight * devicePixelRatio;
        }

        update() {
            const { patternPixelDataLength, patternData, patternAlpha, patternCtx } = this;

            // put a random shade of gray into every pixel of the pattern
            for (let i = 0; i < patternPixelDataLength; i += 4) {
                // const value = (Math.random() * 255) | 0;
                const value = Math.random() * 255;

                patternData.data[i] = value;
                patternData.data[i + 1] = value;
                patternData.data[i + 2] = value;
                patternData.data[i + 3] = patternAlpha;
            }

            patternCtx.putImageData(patternData, 0, 0);
        }

        draw() {
            const { ctx, patternCanvas, canvas, viewHeight } = this;
            const { width, height } = canvas;

            // clear canvas
            ctx.clearRect(0, 0, width, height);

            // fill the canvas using the pattern
            ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
            ctx.fillRect(0, 0, width, height);
        }

        loop() {
            // only update grain every n frames
            const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
            if (shouldDraw) {
                this.update();
                this.draw();
            }

            window.requestAnimationFrame(this.loop);
        }
    }


    /**
     * Initiate Grain
     */
    const el = document.querySelector('.grain');
    const grain = new Grain(el);
}


const createMatter = (resize) => {
    if (interactiveBox) {

        Engine = Matter.Engine,
            Render = Matter.Render,
            Events = Matter.Events,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // create an engine
        engine = Engine.create(),
            world = engine.world;
        // width: resize ? 1226 : interactiveBox.clientWidth,
        // create a renderer
        render = Render.create({
            element: interactiveBox,
            engine: engine,
            options: {
                width: widthCanvas,
                height: resize ? heightCanvas : heightCanvas + 20,
                // pixelRatio: 2,
                background: resize ? '#141414' : '#9ecc00',
                wireframes: false,
            }
        });

        canvas = render.canvas;
    }

}

const removeMatter = () => {
    render.canvas.remove();
    // render.canvas = null;
    // render.context = null;
    render.textures = {};

}


const initMatterDisableMenu = () => {

    if (interactiveBox) {
        console.log('initMatterDisableMenu ', heightCanvas);


        let imageArr = [
            {
                id: 1,
                width: 251,
                height: 56,
                img: 'images/we-make/active-menu/3d-closes.svg'
            },
            {
                id: 2,
                width: 268,
                height: 56,
                img: 'images/we-make/active-menu/3d-graphics.svg'
            },
            {
                id: 3,
                width: 238,
                height: 56,
                img: 'images/we-make/active-menu/animations.svg'
            },
            {
                id: 4,
                width: 238,
                height: 55,
                img: 'images/we-make/active-menu/ar-masks.svg'
            },
            {
                id: 5,
                width: 267,
                height: 56,
                img: 'images/we-make/active-menu/brand.svg'
            },
            {
                id: 6,
                width: 303,
                height: 56,
                img: 'images/we-make/active-menu/copywriting.svg'
            },
            {
                id: 7,
                width: 123,
                height: 56,
                img: 'images/we-make/active-menu/gifs.svg'
            },
            {
                id: 8,
                width: 328,
                height: 56,
                img: 'images/we-make/active-menu/illustations.svg'
            },
            {
                id: 9,
                width: 296,
                height: 56,
                img: 'images/we-make/active-menu/infographics.svg'
            },
            {
                id: 10,
                width: 180,
                height: 56,
                img: 'images/we-make/active-menu/mascot.svg'
            },
            {
                id: 11,
                width: 295,
                height: 56,
                img: 'images/we-make/active-menu/media-graphics.svg'
            },
            {
                id: 12,
                width: 173,
                height: 56,
                img: 'images/we-make/active-menu/merch.svg'
            },
            {
                id: 13,
                width: 268,
                height: 56,
                img: 'images/we-make/active-menu/moderation.svg'
            },
            {
                id: 14,
                width: 170,
                height: 56,
                img: 'images/we-make/active-menu/naming.svg'
            },
            {
                id: 15,
                width: 113,
                height: 56,
                img: 'images/we-make/active-menu/ntf.svg'
            },
            {
                id: 16,
                width: 298,
                height: 56,
                img: 'images/we-make/active-menu/presentetion.svg'
            },
            {
                id: 17,
                width: 325,
                height: 56,
                img: 'images/we-make/active-menu/promo.svg'
            },
            {
                id: 18,
                width: 238,
                height: 56,
                img: 'images/we-make/active-menu/promotion.svg'
            },
            {
                id: 19,
                width: 128,
                height: 56,
                img: 'images/we-make/active-menu/smm.svg'
            },
            {
                id: 20,
                width: 267,
                height: 56,
                img: 'images/we-make/active-menu/ui-design.svg'
            },
            {
                id: 21,
                width: 267,
                height: 56,
                img: 'images/we-make/active-menu/ui-design.svg'
            },
        ]

        let counter = 0;


        // create bounds
        var ground = Bodies.rectangle(0, interactiveBox.clientHeight + 10, widthCanvas * 2, widthCanvas < 960 ? 100 : 20, { isStatic: true });
        var wallLeft = Bodies.rectangle(0, interactiveBox.clientHeight / 2, 20, interactiveBox.clientHeight, { isStatic: true });
        var wallRight = Bodies.rectangle(widthCanvas, interactiveBox.clientHeight / 2, 20, interactiveBox.clientHeight, { isStatic: true })
        var roof = Bodies.rectangle(0, 0, widthCanvas * 2, 20, { isStatic: true })
        let stack;
        // xScale: 0.5, yScale: 0.5
        if (widthCanvas >= 1600) {
            console.log('desktop-big');
            stack = Matter.Composites.stack(20, 20, 6, 3, 5, 0, function (x, y) {

                let arrItem = Bodies.rectangle(x, y, imageArr[counter].width, 54, { render: { sprite: { texture: imageArr[counter].img } } })
                // console.log(arrItem);
                counter++;
                // console.log(arrItem);
                return arrItem
            })

        } else if (widthCanvas >= 1200 && widthCanvas < 1600) {
            console.log('desktop-small');
            stack = Matter.Composites.stack(20, 20, 6, 3, 5, 0, function (x, y) {

                let arrItem = Bodies.rectangle(x, y, imageArr[counter].width * 0.7, 54 * 0.7, { render: { sprite: { texture: imageArr[counter].img, xScale: 0.7, yScale: 0.7 } } })
                // console.log(arrItem);
                counter++;
                // console.log(arrItem);
                return arrItem
            })
        } else if (widthCanvas >= 760 && widthCanvas <= 1200) {
            console.log('tablet');
            stack = Matter.Composites.stack(20, 20, 6, 3, 5, 0, function (x, y) {

                let arrItem = Bodies.rectangle(x, y, imageArr[counter].width * 0.5, 54 * 0.5, { render: { sprite: { texture: imageArr[counter].img, xScale: 0.5, yScale: 0.5 } } })
                // console.log(arrItem);
                counter++;
                // console.log(arrItem);
                return arrItem
            })
        } else {
            console.log('mobile');
            stack = Matter.Composites.stack(20, 20, 4, 3, 5, 0, function (x, y) {

                let arrItem = Bodies.rectangle(x, y, imageArr[counter].width * 0.5, 54 * 0.5, { render: { sprite: { texture: imageArr[counter].img, xScale: 0.5, yScale: 0.5 } } })
                // console.log(arrItem);
                counter++;
                // console.log(arrItem);
                return arrItem
            })
        }


        World.add(engine.world, [ground, wallLeft, wallRight, roof, stack]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // Allow page scrolling in matter.js window
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        // Detect clicks vs. drags
        let click = false;

        document.addEventListener('mousedown', () => click = true);
        document.addEventListener('mousemove', () => click = false);
        document.addEventListener('mouseup', () => console.log(click ? 'click' : 'drag'));

        // Create a On-Mouseup Event-Handler
        Events.on(mouseConstraint, 'mouseup', function (event) {
            var mouseConstraint = event.source;
            var bodies = engine.world.bodies;
            if (!mouseConstraint.bodyB) {
                for (i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    // Check if clicked or dragged
                    if (click === true) {
                        if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
                            var bodyUrl = body.url;
                            console.log("Body.Url >> " + bodyUrl);
                            // Hyperlinking feature
                            if (bodyUrl != undefined) {
                                //window.location.href = bodyUrl;
                                window.open(bodyUrl, '_blank');
                                console.log("Hyperlink was opened");
                            }
                            break;
                        }
                    }
                }
            }
        });

        // run the engine
        Engine.run(engine);

        // run the renderer
        Render.run(render);

    }


}

const initMatterActiveMenu = () => {

    if (interactiveBox) {
        let imageArr = [
            {
                id: 1,
                width: 251,
                height: 56,
                img: 'images/we-make/not-active/3d-closes.svg'
            },
            {
                id: 2,
                width: 268,
                height: 56,
                img: 'images/we-make/not-active/3d-graphics.svg'
            },
            {
                id: 3,
                width: 238,
                height: 56,
                img: 'images/we-make/not-active/animations.svg'
            },
            {
                id: 4,
                width: 238,
                height: 55,
                img: 'images/we-make/not-active/ar-masks.svg'
            },
            {
                id: 5,
                width: 267,
                height: 56,
                img: 'images/we-make/not-active/brand-style.svg'
            },
            {
                id: 6,
                width: 303,
                height: 56,
                img: 'images/we-make/not-active/copywriting.svg'
            },

            {
                id: 7,
                width: 123,
                height: 56,
                img: 'images/we-make/not-active/gifs.svg'
            },

            {
                id: 8,
                width: 180,
                height: 56,
                img: 'images/we-make/not-active/maskot.svg'
            },

            {
                id: 9,
                width: 295,
                height: 56,
                img: 'images/we-make/not-active/media-graphics.svg'
            },
            {
                id: 10,
                width: 268,
                height: 56,
                img: 'images/we-make/not-active/moderation.svg'
            },
            {
                id: 11,
                width: 113,
                height: 56,
                img: 'images/we-make/not-active/nft.svg'
            },
            {
                id: 12,
                width: 298,
                height: 56,
                img: 'images/we-make/not-active/presentations.svg'
            },

            {
                id: 13,
                width: 325,
                height: 56,
                img: 'images/we-make/not-active/promo-video.svg'
            },
            {
                id: 14,
                width: 238,
                height: 56,
                img: 'images/we-make/not-active/promotion.svg'
            },

            {
                id: 15,
                width: 123,
                height: 56,
                img: 'images/we-make/not-active/site.svg'
            },

            {
                id: 16,
                width: 128,
                height: 56,
                img: 'images/we-make/not-active/smm.svg'
            },
            {
                id: 17,
                width: 267,
                height: 56,
                img: 'images/we-make/not-active/ui-design.svg'
            },

        ]

        let counter = 0;


        // create bounds
        var ground = Bodies.rectangle(0, heightCanvas, widthCanvas * 2, 20, { isStatic: true });
        var wallLeft = Bodies.rectangle(0, heightCanvas / 2, 5, heightCanvas * 2, { isStatic: true });
        var wallRight = Bodies.rectangle(widthCanvas, heightCanvas / 2, 5, heightCanvas, { isStatic: true })
        var roof = Bodies.rectangle(0, 0, widthCanvas * 2, 10, { isStatic: true })

        let stack = Matter.Composites.stack(20, 20, 5, 3, 5, 0, function (x, y) {

            let arrItem = Bodies.rectangle(x, y, imageArr[counter].width, 54, { render: { sprite: { texture: imageArr[counter].img } } })
            // console.log(arrItem);
            counter++;
            // console.log(arrItem);
            return arrItem
        })

        World.add(engine.world, [ground, wallLeft, wallRight, roof, stack]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // Allow page scrolling in matter.js window
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        // Detect clicks vs. drags
        let click = false;

        document.addEventListener('mousedown', () => click = true);
        document.addEventListener('mousemove', () => click = false);

        // Create a On-Mouseup Event-Handler
        Events.on(mouseConstraint, 'mouseup', function (event) {
            var mouseConstraint = event.source;
            var bodies = engine.world.bodies;
            if (!mouseConstraint.bodyB) {
                for (i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    // Check if clicked or dragged
                    if (click === true) {
                        if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
                            var bodyUrl = body.url;
                            console.log("Body.Url >> " + bodyUrl);
                            // Hyperlinking feature
                            if (bodyUrl != undefined) {
                                //window.location.href = bodyUrl;
                                window.open(bodyUrl, '_blank');
                                console.log("Hyperlink was opened");
                            }
                            break;
                        }
                    }
                }
            }
        });


        // run the engine
        Engine.run(engine);

        // run the renderer
        Render.run(render);
    }



}

const activeMenu = () => {
    const wrapper = document.querySelector('.wrapper');
    const buttonMenu = document.querySelector('.header-btn');
    const menu = document.querySelector('.menu');

    if (buttonMenu) {
        buttonMenu.addEventListener('click', () => {

            wrapper.classList.toggle('active');
            if (interactiveBox) {
                removeMatter();
                if (wrapper.classList.contains('active')) {
                    setTimeout(() => {
                        createMatter(true);
                        initMatterActiveMenu();
                    }, 1000)

                } else {
                    setTimeout(() => {
                        createMatter(false);
                        initMatterDisableMenu()
                    }, 1000)

                }
            }


            // initMatter();
            // console.log('dfdfd', document.getElementById('interactive-box').offsetWidth);

            if (document.body.clientWidth < 1200) {
                document.body.classList.toggle('lock');
            }

        })
    }

}

const hoverFormInput = () => {

    if (brif) {
        if (brif.classList.contains('brif--last')) {
            inputHover(sendAdditional, projectLink, additional, 'hover-green')
        }
        else if (brif.classList.contains('brif--black')) {
            inputHover(sendTelegram, telegram, null, 'hover-black')
        }
        else if (brif.classList.contains('brif--green')) {
            inputHover(sendOraganization, organization, false, 'hover-green')
        }
    }
}

const inputHover = (button, input, textarea, className) => {

    button.addEventListener('mouseover', () => {
        input.classList.add(`${className}`);
        if (textarea) {
            textarea.classList.add(`${className}`);
        }
    })

    button.addEventListener('mouseout', () => {
        input.classList.remove(`${className}`);
        if (textarea) {
            textarea.classList.remove(`${className}`);
        }
    })
}

const animationDone = () => {
    const doneText = document.getElementById('done-text');
    if (doneText) {
        console.log('dfdf');
        doneText.innerHTML = doneText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: '.letter',
                translateY: [-5000, 0],
                easing: "easeOutExpo",
                duration: 800,
                delay: (el, i) => 200 * i
            }).add({
                targets: doneText,
                opacity: 1,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });
    }

}

const swicthBrif = () => {

    const telegramInput = document.getElementById('telegram');


    if (brif) {
        sendOraganization.addEventListener('click', (e) => {
            e.preventDefault();
            brif.classList.remove('brif--green');
            brif.classList.add('brif--black');
            hoverFormInput();
            if (brif) {
                tuluzz.animate(.5, 0);
            }
        })

        sendTelegram.addEventListener('click', (e) => {
            e.preventDefault();
            if (telegramInput.value.length > 0) {
                if (telegramInput.classList.contains('shake-little')) {
                    telegramInput.classList.remove('shake-little');
                    telegramInput.classList.error('error');
                }
                brif.classList.remove('brif--black');
                brif.classList.add('brif--last');
                hoverFormInput();
                if (brif) {
                    tuluzz.animate(.75, 0);
                }
            } else {
                telegramInput.classList.add('shake-little');
                telegramInput.classList.add('error');
                setTimeout(() => {
                    telegramInput.classList.remove('shake-little');
                    telegramInput.classList.remove('error');
                }, 1500)
            }

        })

        sendAdditional.addEventListener('click', (e) => {
            e.preventDefault();
            brif.classList.remove('brif--last');
            brif.classList.add('done');
            animationDone();

            if (brif) {
                tuluzz.animate(1, 0);
            }
        })

        if (brif.classList.contains('done')) {
            // animationDone()
        }
    }


}

const brifJumpBackClick = () => {
    const btnBackBrif = document.getElementById('back-button');
    if (btnBackBrif) {
        btnBackBrif.addEventListener('click', (e) => {
            e.preventDefault();
            if (brif.classList.contains('brif--black')) {
                brif.classList.remove('brif--black');
                brif.classList.add('brif--green');
                tuluzz.animate(.25, 0);

            } else if (brif.classList.contains('brif--last')) {
                brif.classList.remove('brif--last');
                brif.classList.add('brif--black');
                tuluzz.animate(.5, 0);
            }
        })
    }
}

const logoHover = () => {
    const headerLogo = document.getElementById('header-logo')
    const unhoverLogo = document.getElementById('unhover-logo');
    const hoverLogo = document.getElementById('hover-logo');

    if (headerLogo) {
        headerLogo.addEventListener('mouseover', () => {
            hoverLogo.classList.remove('disable-logo');
            unhoverLogo.classList.add('disable-logo');
        })
        headerLogo.addEventListener('mouseout', () => {
            unhoverLogo.classList.remove('disable-logo');
            hoverLogo.classList.add('disable-logo');
        })
    }

}

const menuSticky = () => {
    const container = document.querySelector('.menu');
    const stickySidebar = document.querySelector('.menu__sticky');

    document.addEventListener('scroll', function () {
        stickify(container, stickySidebar);
    });

    function stickify(wrapper, stickyEl) {
        var wrapperRect = wrapper.getBoundingClientRect();
        var stickyRect = stickyEl.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        if (wrapperRect.top < 0) {
            stickyEl.classList.add('fixed');
            stickyEl.classList.remove('bottom');
        } else if (stickyRect.top <= wrapperRect.top) {
            console.log('dfdfdfdwwww');
            stickyEl.classList.remove('fixed');
            stickyEl.classList.remove('bottom');
        }
    }

}

const dinamicHeader = () => {
    const header = document.querySelector('.header');
    let nextBlock
    let hiddenElements = document.querySelectorAll('.hidden-elem');

    if (document.querySelector('.portfolio')) {
        nextBlock = document.getElementById('protfolio-list');
        const startBlackBlockHeight = nextBlock.getBoundingClientRect().top - 50;
        headerChangeColor(hiddenElements, header, startBlackBlockHeight);
    }

    if (document.querySelector('.portfolio-detail')) {
        nextBlock = document.getElementById('portfolio-detail__banner');
        const startBlackBlockHeight = nextBlock.getBoundingClientRect().top - 50;
        headerChangeColor(hiddenElements, header, startBlackBlockHeight);
    }

}

const headerChangeColor = (hiddenElem, header, heightNextBlock) => {
    window.addEventListener('scroll', () => {

        if (window.pageYOffset > 10) {
            hiddenElem.forEach(elem => {
                elem.classList.add('elem-hidden')
            })
        } else {
            hiddenElem.forEach(elem => {
                elem.classList.remove('elem-hidden')
            })
        }

        if (window.pageYOffset > heightNextBlock) {
            header.classList.remove('light');
            header.classList.add('black')
        } else {
            header.classList.remove('black');
            header.classList.add('light')
        }
    })
}

// 3d model

const threeModel = () => {
    if (document.querySelector('.main-page')) {
        let material;

        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        // {alpha: true }
        const renderer = new THREE.WebGLRenderer( {alpha: true });
        const container = document.getElementById('box-model');
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);


        const ambientLight = new THREE.AmbientLight(0x9ECC00);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x000000);
        camera.add(pointLight);

        // // shadow

        const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
        scene.add(directionalLight);


        const light = new THREE.PointLight(0xff0000, 0.1, 100);
        light.position.set(50, 500, 150);
        light.castShadow = true;
        scene.add(light);

        console.log(light.position);



        // // ==================

        camera.position.set(0, 0, 1500);
        camera.position.z = 2500;
        camera.position.y = 550;
        camera.position.x = 2;
        camera.scale.z = 0.9;

        // method

        const Method = {
            INSTANCED: 'INSTANCED',
            MERGED: 'MERGED',
            NAIVE: 'NAIVE'
        };


        // api

        const api = {
            method: Method.INSTANCED,
            count: 10
        };

        function clean() {
            const meshes = [];

            scene.traverse(function (object) {
                if (object.isMesh) meshes.push(object);
            });


            for (let i = 0; i < meshes.length; i++) {

                const mesh = meshes[i];
                mesh.material.dispose();
                mesh.geometry.dispose();
                scene.remove(mesh);


            }

        }

        const randomizeMatrix = function () {

            const position = new THREE.Vector3();
            const rotation = new THREE.Euler();
            const quaternion = new THREE.Quaternion();
            const scale = new THREE.Vector3();

            return function (matrix) {

                position.x = Math.random() * 40 - 20;
                position.y = Math.random() * 40 - 20;
                position.z = Math.random() * 40 - 20;

                rotation.x = Math.random() * 2 * Math.PI;
                rotation.y = Math.random() * 2 * Math.PI;
                rotation.z = Math.random() * 2 * Math.PI;

                quaternion.setFromEuler(rotation);

                scale.x = scale.y = scale.z = Math.random() * 1;

                console.log('matrix ', matrix);

                matrix.compose(position, quaternion, scale);

            };

        }();


        function makeInstanced(geometry) {

            const matrix = new THREE.Matrix4();

            const mesh = new THREE.InstancedMesh(geometry, material, api.count);

            for (let i = 0; i < api.count; i++) {
                console.log('test matrix ', matrix);
                randomizeMatrix(matrix);
                mesh.setMatrixAt(i, matrix);

            }

            scene.add(mesh);



            const geometryByteLength = getGeometryByteLength(geometry);
            console.log('geometryByteLength ', geometryByteLength);
            // guiStatsEl.innerHTML = [

            //     '<i>GPU draw calls</i>: 1',
            //     '<i>GPU memory</i>: ' + formatBytes(api.count * 16 + geometryByteLength, 2)

            // ].join('<br/>');

        }

        function getGeometryByteLength(geometry) {

            let total = 0;

            if (geometry.index) total += geometry.index.array.byteLength;

            for (const name in geometry.attributes) {

                total += geometry.attributes[name].array.byteLength;

            }

            return total;

        }
       

        // state

        const stats = new Stats();
        document.body.appendChild(stats.dom);

        // controls

        let controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;


        function initMesh() {
            clean();
            console.log('DFD');
            new THREE.OBJLoader().load(
                // resource URL
                '../models/log.obj',
                // called when resource is loaded
                function (object) {
                    material = new THREE.MeshNormalMaterial();
                    object.position.y = -500;
                    object.position.x = -2000;
                    object.position.z = -100;

                    // makeInstanced(object);
                    

                    scene.add(object);

                },
                // called when loading is in progresses
                function (xhr) {

                },
                // called when loading has errors
                function (error) {

                    console.log('error ', error);

                }
            );

        }

        initMesh();
       

        // gui 

        // let gui = new GUI();
        // gui.add(api, 'method', Method).onChange(initMesh);
        // gui.add(api, 'count', 1, 200).step(1).onChange(initMesh);


        // load a resource


        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            stats.update();
            render();
        }

        function render() {
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
        animate();

        console.log('start');
    }
}



window.addEventListener('load', () => {
    noise();
    activeMenu();
    createMatter(false);
    initMatterDisableMenu();
    hoverFormInput();
    swicthBrif();
    logoHover();
    menuSticky();
    animationDone()
    brifJumpBackClick()
    dinamicHeader();
    threeModel();
})