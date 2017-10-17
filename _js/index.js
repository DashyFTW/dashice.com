$(document).ready(function () {
    
//DECLARATIONS
    
    var globalBody                      = $('body'),
        headerLogoWrapper               = $('#header-logo-wrapper'),
        
        indexMainArticle                = $('.main-article'),
        indexArticleFooter              = $('.article-footer'),
        indexUsedIntros                 = [false, false, false, false, false],
        indexBackdrops                  = $('.page-backdrop'),
    
        indexPaginationContainer        = $('#pagination-container'),
        indexPaginationLabelWrapper     = $('#pagination-label-wrapper'),
        indexPaginationLabelHeading     = $('#pagination-label-wrapper > h3'),
        indexPaginationButtonWrapper    = $('#pagination-button-wrapper'),
        indexPaginationButton           = $('.pagination-button'),
        
        indexAboutArticle               = $('#about-article'),
        indexAboutHeader                = $('#about-header'),
        indexAboutHeaderImgWrapper      = $('#about-header-image-wrapper'),
        indexAboutHeaderImgWrapperDiv   = $('#about-header-image-wrapper > div'),
        indexAboutHeaderHeading         = $('#about-header > h1'),
        indexAboutHeaderButton          = $('#about-header-button-wrapper > button'),
        indexAboutBodyArticle           = $('#about-body > article'),
        indexAboutCurrentPage           = 0,
        indexAboutCurrentImgWrapperHeight = indexAboutHeaderImgWrapper.css('max-height'),

        indexPhotosArticle              = $('#photos-article'),
        indexPhotosImgWrapper           = $('#photos-image-wrapper'),
        indexPhotosImgBackdrop          = $('#photos-image-backdrop'),
        indexPhotosImgOverlay           = $('#photos-image-wrapper > div'),
        indexPhotosHeading              = $('#photos-image-wrapper > div > h1'),
        indexPhotosContent              = $('#photos-content'),
        
        indexLiteratureArticle          = $('#literature-article'),
        indexLiteratureCards            = $('.literature-cards'),
        indexLiteratureCard1            = $('#literature-card-1'),
        indexLiteratureCard2            = $('#literature-card-2'),
        
        indexAudioArticle               = $('#audio-article'),
        indexAudioVideo                 = $('#audio-video-wrapper > video'),
        indexAudioVideoSrc              = $('#audio-video-wrapper > video > source'),
        indexAudioHeading               = $('#audio-video-wrapper > h1'),
        indexAudioLoading               = $('#audio-video-wrapper > h3'),
        indexAudioColor                 = 'crimson',
        indexAudioFooter                = $('#audio-footer'),
        
        //Browser properties
        
        documentHeight                  = $(document).height(),
        windowHeight                    = $(window).height(),
        windowWidth                     = $(window).width(),
        fromTop                         = $(window).scrollTop();
    
//FUNCTIONS
            
    //About
    function aboutSizing() {
        indexAboutArticle.css({
            marginTop: indexAboutHeader.height() + 'px'
        });
    }
    
    function aboutHeaderScroll() {
        var hrTopMargin = parseFloat($('#about-header > hr').css('margin-top')),
            headingScaling = 1 - fromTop / 1500,
            imgWrapperMaxHeight = parseFloat($('#about-header-image-wrapper').css('max-height')),
            imgWrapperHeightModifier = imgWrapperMaxHeight - fromTop + indexAboutHeaderHeading.height() + hrTopMargin,
            imgWrapperMarginEm = 1.4,
            imgWrapperMargin = parseFloat($(imgWrapperMarginEm).toPx());
        
        if (fromTop < indexAboutHeaderHeading.height() + hrTopMargin) {
            indexAboutHeaderImgWrapper.css('height', imgWrapperMaxHeight + 'px');
            
            if (fromTop < 0) {
                indexAboutHeaderHeading.css({
                    marginTop: 0,
                    transform: 'scale(' + headingScaling + ')'
                });
            } else {
                indexAboutHeaderHeading.css({
                    marginTop: fromTop * -1 + 'px',
                    opacity: 1
                });
            }
            
            indexAboutHeaderImgWrapper.css({
                height: imgWrapperMaxHeight + 'px',
                opacity: 1
            });
            
            indexAboutHeaderImgWrapperDiv.css({
                marginTop: imgWrapperMarginEm + 'em',
                marginBottom: imgWrapperMarginEm + 'em'
            });
        }
        
        if (fromTop > indexAboutHeaderHeading.height() + hrTopMargin) {
            indexAboutHeaderHeading.css({
                marginTop: (hrTopMargin + indexAboutHeaderHeading.height()) * -1 + 'px',
                opacity: 0
            });
            
            indexAboutHeaderImgWrapper.css({
                height: imgWrapperHeightModifier + 'px',
                opacity: imgWrapperHeightModifier * 2 / imgWrapperMaxHeight
            });
            
            indexAboutHeaderImgWrapperDiv.css({
                marginTop: imgWrapperMargin * (imgWrapperHeightModifier / imgWrapperMaxHeight) + 'px',
                marginBottom: imgWrapperMargin * (imgWrapperHeightModifier / imgWrapperMaxHeight) + 'px'
            });
            
        }
    }
    
    function aboutTransitions(buttonNumber, name) {
        if (indexAboutCurrentPage < buttonNumber) {
            indexAboutBodyArticle.animate({
                left : '-0.4em',
                opacity : 0
            }, {
                complete : function () {
                    indexAboutBodyArticle.hide();
                    $('#about-body > article[name=' + name + ']').show();
                    
                    indexAboutBodyArticle.css('left', '+0.4em').animate({
                        left : 0,
                        opacity: 1
                    }, 400);
                }
            }, 400);
        } else {
            indexAboutBodyArticle.animate({
                left : '+0.4em',
                opacity : 0
            }, {
                complete : function () {
                    indexAboutBodyArticle.hide();
                    $('#about-body > article[name=' + name + ']').show();
                    
                    indexAboutBodyArticle.css('left', '-0.4em').animate({
                        left : 0,
                        opacity: 1
                    }, 400);
                }
            }, 400);
        }
        indexAboutCurrentPage = buttonNumber;
    }
    
    function aboutArticleHandling() {
        var name = $(this).attr('name'),
            buttonNumber = $(this).attr('data-aboutButton');
        
        if ($(this).attr('name') === 'cv') {
            var newWindow = window.open('CV.pdf', '_blank');
            if (newWindow) {
                newWindow.focus();
            } else {
                alert('PDF-document was blocked from being opened.');
            }
            
            return false;
        }
        
        if (fromTop > 0) {
            $('html').animate({scrollTop: 0}, 750);
            globalBody.animate({scrollTop: 0}, {
                duration : 750,
                complete : function () {
                    aboutTransitions(buttonNumber, name);
                }
            });
        } else {
            aboutTransitions(buttonNumber, name);
        }
        indexAboutHeaderButton.removeAttr('disabled');
        $(this).attr('disabled', 'true');
    }
    
    //Photos
    function photosIntro() {
        var definingAxis;
        
        if (screen.width < screen.height) {
            definingAxis = screen.width;
        } else {
            definingAxis = screen.height;
        }
        
        if (definingAxis > 0 && definingAxis < 1080) {
            indexPhotosImgBackdrop.css('background-image', 'url(_images/_index/photos-eclipse-blurred-504p.png)');
            indexPhotosImgOverlay.css('background-image', 'url(_images/_index/photos-eclipse-504p.png)');
        } else if (definingAxis <= 1080) {
            indexPhotosImgBackdrop.css('background-image', 'url(_images/_index/photos-eclipse-blurred-1K.png)');
            indexPhotosImgOverlay.css('background-image', 'url(_images/_index/photos-eclipse-1K.png)');
        } else if (definingAxis > 1080 && definingAxis < 2160) {
            indexPhotosImgBackdrop.css('background-image', 'url(_images/_index/photos-eclipse-blurred-2K.png)');
            indexPhotosImgOverlay.css('background-image', 'url(_images/_index/photos-eclipse-2K.png)');
        } else {
            indexPhotosImgBackdrop.css('background-image', 'url(_images/_index/photos-eclipse-blurred-3K.png)');
            indexPhotosImgOverlay.css('background-image', 'url(_images/_index/photos-eclipse-3K.png)');
        }
        
        setTimeout(function () {
            indexPhotosImgOverlay.css('display', 'block');
            $(window).scrollTop(windowHeight);
            setTimeout(function () {
                $('html, body').animate({scrollTop: 0}, 1500);
            }, 300);

            setTimeout(function () {
                $('#photos-image-wrapper > div > h1').css('display', 'block');
                $('#photos-content > h1').show();
                $('#photos-content > p').show();
                $('#photos-content > a').css('display', 'block');
            }, 1800);
        }, 300);
    }
    
    function photosImageBlur() {
        if (fromTop < windowHeight) {
            indexPhotosImgBackdrop.css('opacity', 1 - (fromTop * 0.35 / (documentHeight - windowHeight)));
                
            indexPhotosImgWrapper.css('height', windowHeight - fromTop);
        } else {
            indexPhotosImgWrapper.css('height', 0);
        }
    }
    
    function photosHeadingParallax() {
        if (fromTop < windowHeight) {
            var scale = 1 - ((fromTop / windowHeight) * 0.5),
                opacity = (windowHeight / 1.35 - fromTop) / (windowHeight / 1.35),
                top = ((windowHeight / 0.5 - fromTop) / (windowHeight / 0.5)) * 50;
            
            indexPhotosHeading.css({
                transform: 'translateX(-50%)scale(' + scale + ')',
                opacity: opacity,
                top: 'calc(' + top + 'vh - 1em)'
            });
            
            if (opacity <= 0) {
                indexPhotosHeading.css('display', 'none');
            } else {
                indexPhotosHeading.css('display', 'block');
            }
        }
    }
    
    function photosContentParallax() {
        if (fromTop < windowHeight) {
            var marginTop = (fromTop / windowHeight) * 2.5 + "em",
                parallaxMargin = 5 - ((fromTop / windowHeight) * 4),
                opacity = fromTop / windowHeight;
            
            indexPhotosContent.css({
                marginTop: marginTop
            });
            
            $('#photos-content > h1').css({
                marginBottom: parallaxMargin + 'em',
                opacity: opacity
            });
            
            $('#photos-content > p').css({
                marginBottom: parallaxMargin * 2 + 'em',
                opacity: opacity
            });
            
            $('#photos-content > a').css({
                opacity: opacity
            });
        } else {
            $('#photos-content > h1').css({
                opacity: 1
            });
            
            $('#photos-content > p').css({
                opacity: 1
            });
            
            $('#photos-content > a').css({
                opacity: 1
            });
        }
    }
    
    //Literature
    function literatureIntro() {
        var graceHeightEm   = 2.5,
            graceHeight     = parseFloat($(graceHeightEm).toPx());
            
        $(window).scrollTop(0);
        indexLiteratureCards.animate({ top : graceHeight}, 1000);
    }
    
    function literatureCards() {
        var graceHeightEm   = 2.5,
            graceHeight     = parseFloat($(graceHeightEm).toPx()),
            scaling         = 0.9 + (fromTop / windowHeight) * 0.1,
            shadowOpacity   = (fromTop / windowHeight) * 0.30;
        
        if (fromTop < windowHeight) {
            indexLiteratureCard1.css('top', (fromTop - graceHeight) * -1 + 'px');
            
            indexLiteratureCard2.css({
                top : graceHeight,
                transform : 'scale(' + scaling + ', ' + scaling + ')',
                '-webkit-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,' + shadowOpacity + ')',
                '-moz-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,' + shadowOpacity + ')',
                'box-shadow' : '0px 15px 30px 0px rgba(0,0,0,' + shadowOpacity + ')'
            });
            $('#literature-article > a').css('opacity', 0);
        }
        
        if (fromTop > windowHeight && fromTop < windowHeight * 2) {
            indexLiteratureCard1.css('top', windowHeight * -1);
            indexLiteratureCard2.css({
                'top' : (fromTop - graceHeight) * -1 + windowHeight + 'px',
                transform : 'scale(1, 1)',
                '-webkit-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25 )',
                '-moz-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25 )',
                'box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25)'
            });
            $('#literature-article > a').css('opacity', (fromTop - windowHeight * 1.45) / windowHeight * 1.45);
        }
        
        if (fromTop > windowHeight * 2) {
            indexLiteratureCard1.css({
                'top' : windowHeight * -1 + 'px',
                transform : 'scale(1, 1)',
                '-webkit-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25 )',
                '-moz-box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25 )',
                'box-shadow' : '0px 15px 30px 0px rgba(0,0,0,0.25)'
            });
            indexLiteratureCard2.css('top', windowHeight * -1 + 'px');
            $('#literature-article > a').css('opacity', 1);
        }
        
    }
    
    //Audio
    function audioColorCorrect() {
        //If iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            indexAudioColor = 'rgb(215, 20, 55)';
            globalBody.css('background-color', indexAudioColor);
            indexAudioHeading.css('color', indexAudioColor);
            return false;
        }
        
        //If Opera
        if (!!window.opera || /opera|opr/i.test(navigator.userAgent)) {
            indexAudioColor = '#c70037';
            globalBody.css('background-color', indexAudioColor);
            indexAudioHeading.css('color', indexAudioColor);

            indexAudioFooter.css({
                background: '-moz-linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                background: '-webkit-linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                background: 'linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(199,0,55)', endColorstr='rgba(199,0,55)',GradientType=0 )"
            });
            return false;
        }
        
        //If Firefox
        if (!!navigator.userAgent.match(/firefox/i)) {
            indexAudioColor = '#c70037';
            globalBody.css('background-color', indexAudioColor);
            indexAudioHeading.css('color', indexAudioColor);

            indexAudioFooter.css({
                background: '-moz-linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                background: '-webkit-linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                background: 'linear-gradient(top,  rgba(199,0,55,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(199,0,55)', endColorstr='rgba(199,0,55)',GradientType=0 )"
            });
            return false;
        }
        
        //If Windows or macOS
        if (navigator.userAgent.indexOf('Mac OS X') !== -1 || navigator.userAgent.indexOf('macOS') !== -1) {
            //If Chrome 14+
            if (!!window.chrome && !!window.chrome.webstore) {
                indexAudioColor = 'crimson'; //Was #cb3142
                globalBody.css('background-color', indexAudioColor);
                indexAudioHeading.css('color', indexAudioColor);

                indexAudioFooter.css({
                    background: '-moz-linear-gradient(top,  rgba(203,49,66,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: '-webkit-linear-gradient(top,  rgba(203,49,66,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: 'linear-gradient(top,  rgba(203,49,66,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='rgba(203,49,66)',GradientType=0 )"
                });
                return false;
            }

            //If Safari (Applies to Chrome & Opera too, put the mentioned browsers)
            if ('WebkitAppearance' in document.documentElement.style) {
                indexAudioColor = 'crimson';
                globalBody.css('background-color', indexAudioColor);
                indexAudioHeading.css('color', indexAudioColor);

                indexAudioFooter.css({
                    background: '-moz-linear-gradient(top,  rgba(220,20,60,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: '-webkit-linear-gradient(top,  rgba(220,20,60,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: 'linear-gradient(top,  rgba(220,20,60,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(220,20,60)', endColorstr='rgba(220,20,60)',GradientType=0 )"
                });
                return false;
            }
        } else {
            //If IE or Edge 9-10
            if (window.navigator.userAgent.indexOf("Edge") > -1 || /MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
                indexAudioColor = '#d71435';
                globalBody.css('background-color', indexAudioColor);
                indexAudioHeading.css('color', indexAudioColor);

                indexAudioFooter.css({
                    background: '-moz-linear-gradient(top,  rgba(215,20,53,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: '-webkit-linear-gradient(top,  rgba(215,20,53,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: 'linear-gradient(top,  rgba(215,20,53,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='rgba(215,20,53)',GradientType=0 )"
                });
                return false;
            }
            
            //If Chrome 14+
            if (!!window.chrome && !!window.chrome.webstore) {
                indexAudioColor = '#d71436';
                globalBody.css('background-color', indexAudioColor);
                indexAudioHeading.css('color', indexAudioColor);

                indexAudioFooter.css({
                    background: '-moz-linear-gradient(top,  rgba(198,0,54,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: '-webkit-linear-gradient(top,  rgba(198,0,54,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    background: 'linear-gradient(top,  rgba(198,0,54,0) 0%, ' + indexAudioColor + ' 50%, ' + indexAudioColor + ' 80%);',
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='rgba(198,0,54)',GradientType=0 )"
                });
                return false;
            }
        }
    }
    
    function audioIntro() {
        var randomInt = Math.floor(Math.random() * 4);
        
        indexAudioVideoSrc.attr('src', '_media/_video/visu' + randomInt + '.mov');
        indexAudioVideo.get(0).load();
        
        $(window).scrollTop(0);
        
        indexAudioVideo.get(0).addEventListener('canplaythrough', function () {
            indexAudioLoading.fadeOut(250);
            $('#audio-content > hr').animate({
                width : '100%',
                opacity : 1
            }, 1000);

            setTimeout(function () {
                $('#audio-desc-wrapper').animate({ opacity : 1}, 500);
                $('#audio-desc-wrapper > p').css('top', '-1em').animate({ top : '0em'}, 600);
                $('#audio-desc-wrapper > a').css('top', '-1em').animate({ top : '0em'}, 600);
                
                setTimeout(function () {
                    $(indexAudioVideo).get(0).play();
                    
                    setTimeout(function () {
                        indexAudioHeading.addClass('audio-transition');
                        indexAudioHeading.css('color', 'white');
                        
                        $('#audio-desc-wrapper > a').addClass('audio-transition');
                        $('#audio-desc-wrapper > a').css({
                            color : indexAudioColor,
                            backgroundColor : 'white'
                        });
                        
                        setTimeout(function () {
                            indexAudioHeading.removeClass('audio-transition');
                            $('#audio-desc-wrapper > a').removeClass('audio-transition');
                        }, 500);
                    }, 11500);
                }, 600);
            }, 1200);
        });
    }
    
    //Main
    function updatePaginationButtons() {
        indexPaginationButton.each(function () {
            if ($(this).attr('data-state') === 'unchecked') {
                $(this).css('background-image', 'url(_images/_index/circle-unchecked.png)');
                
                $(this).removeAttr('tabIndex');
                
                if ($(this).attr('name') === 'Unavailable') {
                    $(this).css('background-image', 'url(_images/_index/circle-locked.png)');
                    $(this).attr({
                        readonly: 'readonly',
                        tabIndex: '-1'
                    });
                }
                
                $(this).removeAttr('readonly');
                
            } else {
                $(this).css('background-image', 'url(_images/_index/circle-checked.png)');
                $(this).attr({
                    readonly: 'readonly',
                    tabIndex: '-1'
                });
            }
        });
    }
    
    function transitionPages() {
        var pageName = $(this).attr('name').toLowerCase();
        
        globalBody.addClass('transition-in');
        indexBackdrops.fadeOut(250);
        indexPaginationContainer.addClass('transition-in');
        indexMainArticle.css('opacity', 1).animate({ opacity : 0}, 250);
        
        //Initial Colors
        switch (pageName) {
        case "about":
            if (document.cookie.indexOf("nightmode") >= 0) {
                globalBody.css('filter', 'none');
                globalBody.css('background-color', 'rgb(34, 34, 34)');
                indexPaginationLabelHeading.css('color', 'rgb(190, 190, 190)');
                indexPaginationButton.css('filter', 'invert(0.75)');
                $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash-nightmode.jpg');
            } else {
                globalBody.css('background-color', '#eeeeee');
                indexPaginationLabelHeading.css('color', 'black');
                indexPaginationButton.css('filter', 'invert(0)');
                $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash.jpg');
            }
            indexBackdrops.fadeIn(250);
                
            if (indexUsedIntros[0] === false) {
                indexUsedIntros[0] = true;
                setTimeout(function () {
                    $(window).scrollTop(0);
                    $(window).scroll();
                }, 501);
            }
                
            break;
        case "photos":
            globalBody.css('filter', 'none');
            globalBody.css('background-color', 'black');
            indexPaginationLabelHeading.css('color', 'white');
            indexPaginationButton.css('filter', 'invert(1)');
                                
            if (indexUsedIntros[1] === false) {
                indexUsedIntros[1] = true;
                setTimeout(function () {
                    photosIntro();
                    $(window).resize();
                }, 501);
            } else {
                setTimeout(function () {
                    $(window).scrollTop(0);
                    $(window).scroll();
                }, 501);
            }
                
            break;
        case "literature":
            if (document.cookie.indexOf("nightmode") >= 0) {
                globalBody.css('filter', 'none');
                globalBody.css('background-color', '#1d191a');
                indexPaginationLabelHeading.css('color', 'white');
                indexPaginationButton.css('filter', 'invert(1)');
                $('#literature-backdrop').css('background-image', 'url(_images/_index/literature-backdrop-nightmode.png)');
            } else {
                globalBody.css('background-color', '#f7d9b0');
                indexPaginationLabelHeading.css('color', 'black');
                indexPaginationButton.css('filter', 'invert(0)');
                $('#literature-backdrop').css('background-image', 'url(_images/_index/literature-backdrop.png)');
            }
            indexBackdrops.fadeIn(250);
                                
            if (indexUsedIntros[2] === false) {
                indexUsedIntros[2] = true;
                setTimeout(function () {
                    $(window).scrollTop(0);
                    literatureIntro();
                }, 501);
            } else {
                setTimeout(function () {
                    $(window).scrollTop(0);
                    $(window).scroll();
                }, 501);
            }
                
            break;
        case "audio":
            audioColorCorrect();
            indexPaginationLabelHeading.css('color', 'white');
            indexPaginationButton.css('filter', 'invert(1)');
                                
            if (indexUsedIntros[3] === false) {
                indexUsedIntros[3] = true;
                setTimeout(function () {
                    $(window).scrollTop(0);
                    audioIntro();
                }, 501);
            } else {
                indexAudioHeading.css('color', 'white');
            }
                
            break;
        }
        
        setTimeout(function () {
            indexMainArticle.css('display', 'none');
            $('#' + pageName + '-article').css('display', 'flex');
            indexMainArticle.animate({ opacity : 1}, 250);
            
            globalBody.removeClass('transition-in');
            indexPaginationContainer.removeClass('transition-in');
        }, 500);
    }
    
//EVENTS
    
    indexPaginationContainer.mouseenter(function () {
        indexPaginationLabelWrapper.finish();
        indexPaginationLabelWrapper.css({
            opacity: 0,
            display: 'flex'
        }).animate({
            opacity: 1
        }, 150);
        
        indexPaginationLabelHeading.finish();
        indexPaginationLabelHeading.css({
            opacity: 0,
            top: '-0.5em'
        }).animate({
            opacity: 1,
            top: '0'
        }, 200);

        indexPaginationButtonWrapper.finish();
        indexPaginationButtonWrapper.animate({
            width: '90%',
            top: '+0.5em'
        }, 150);
    });
    
    indexPaginationContainer.mouseleave(function () {
        indexPaginationLabelWrapper.stop();
        indexPaginationLabelWrapper.fadeOut(150);

        indexPaginationLabelHeading.stop();
        indexPaginationLabelHeading.animate({
            opacity: 0,
            top: '-0.5em'
        }, 150);

        indexPaginationButtonWrapper.stop();
        indexPaginationButtonWrapper.animate({
            width: '100%',
            top: '0'
        }, 200);
    });
    
    indexPaginationButton.click(function () {
        if ($(this).attr('name') === 'Unavailable') {
            $(this).css('background-image', 'url(_images/_index/circle-locked.png)');
            return false;
        }
        
        if ($(this).attr('readonly') !== 'readonly') {
            indexPaginationButton.attr('data-state', 'unchecked');
            $(this).attr('data-state', 'checked');
            updatePaginationButtons.apply(this);
            transitionPages.apply(this);
        } else {
            return false;
        }
    });
    
    indexPaginationButton.hover(function () {
        indexPaginationLabelHeading.text($(this).attr('name'));
    });
    
    indexPaginationButton.focus(function () {
        $(this).css('background-image', 'url(_images/_index/circle-focus.png)');
                
        if ($(this).attr('name') === 'Unavailable') {
            $(this).css('background-image', 'url(_images/_index/_index/circle-locked.png)');
        }
    });
    
    indexPaginationButton.blur(function () {
        if ($(this).attr('data-state') === 'checked') {
            $(this).css('background-image', 'url(_images/_index/circle-checked.png)');
        } else {
            $(this).css('background-image', 'url(_images/_index/circle-unchecked.png)');
            if ($(this).attr('name') === 'Unavailable') {
                $(this).css('background-image', 'url(_images/_index/circle-locked.png)');
            }
        }
    });
    
    indexAboutHeaderButton.click(function () {
        if (indexAboutBodyArticle.is(':animated')) {
            return false;
        } else {
            aboutArticleHandling.apply(this);
        }
    });
    
    $(window).scroll($.throttle(16, function () {

        fromTop = $(window).scrollTop();
        
        //About
        if (indexAboutArticle.css('display') !== 'none') {
            aboutHeaderScroll();
        }
        
        //Photos
        if (indexPhotosArticle.css('display') !== 'none') {
            photosImageBlur();
            photosHeadingParallax();
            photosContentParallax();
        }
        
        //Literature
        if (indexLiteratureArticle.css('display') !== 'none') {
            literatureCards();
        }
        
    }));
    
    $(window).resize(function () {
        documentHeight = $(document).height();
        windowHeight = $(window).height();
        windowWidth = $(window).width();
        
        //About
        if (indexAboutArticle.css('display') !== 'none') {
            aboutHeaderScroll();
            
            if (indexAboutCurrentImgWrapperHeight !== indexAboutHeaderImgWrapper.css('max-height')) {
                aboutSizing();
                indexAboutCurrentImgWrapperHeight = indexAboutHeaderImgWrapper.css('max-height');
            }
        }
    });
    
    //Preload images / videos in other index pages after indexabout loads
    $(window).on('load', function () {
        var definingAxis;
        
        if (screen.width < screen.height) {
            definingAxis = screen.width;
        } else {
            definingAxis = screen.height;
        }
        
        if (definingAxis > 0 && definingAxis < 1080) {
            preload([
                "_images/_index/photos-eclipse-504p.png",
                "_images/_index/photos-eclipse-blurred-504p.png"
            ]);
        } else if (definingAxis <= 1080) {
            preload([
                "_images/_index/photos-eclipse-1K.png",
                "_images/_index/photos-eclipse-blurred-1K.png"
            ]);
        } else if (definingAxis > 1080 && definingAxis < 2160) {
            preload([
                "_images/_index/photos-eclipse-2K.png",
                "_images/_index/photos-eclipse-blurred-2K.png"
            ]);
        } else {
            preload([
                "_images/_index/photos-eclipse-3K.png",
                "_images/_index/photos-eclipse-blurred-3K.png"
            ]);
        }
        
        if (document.cookie.indexOf("nightmode") >= 0) {
            preload([
                "_images/_index/literature-egyptian-nightmode.png",
                "_images/_index/literature-backdrop-nightmode.png"
            ]);
        } else {
            preload([
                "_images/_index/literature-egyptian.png",
                "_images/_index/literature-backdrop.png"
            ]);
        }
    });
    
    $('#header-nightmode-button-wrapper').click(function () {
        if (indexAboutArticle.css('display') === 'flex') {
            if (document.cookie.indexOf("nightmode") >= 0) {
                globalBody.css('background-color', 'rgb(34, 34, 34)');
                indexPaginationLabelHeading.css('color', 'rgb(190, 190, 190)');
                indexPaginationButton.css('filter', 'invert(0.75)');
                $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash-nightmode.jpg');
            } else {
                globalBody.css('background-color', '#eeeeee');
                indexPaginationLabelHeading.css('color', 'black');
                indexPaginationButton.css('filter', 'invert(0)');
                $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash.jpg');
            }
        }
        
        if (indexLiteratureArticle.css('display') === 'flex') {
            if (document.cookie.indexOf("nightmode") >= 0) {
                $('#literature-backdrop').css('background-image', 'url(_images/_index/literature-backdrop-nightmode.png)');
                globalBody.css('background-color', '#1d191a');
                indexPaginationLabelHeading.css('color', 'white');
                indexPaginationButton.css('filter', 'invert(1)');
            } else {
                $('#literature-backdrop').css('background-image', 'url(_images/_index/literature-backdrop.png)');
                globalBody.css('background-color', '#f7d9b0');
                indexPaginationLabelHeading.css('color', 'black');
                indexPaginationButton.css('filter', 'invert(0)');
            }
        }
    });
    
    if (document.cookie.indexOf("nightmode") >= 0) {
        indexPaginationLabelHeading.css('color', 'rgb(190, 190, 190)');
        indexPaginationButton.css('filter', 'invert(0.75)');
        $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash-nightmode.jpg');
    } else {
        $('#about-header-image-wrapper > div > img').attr('src', '_images/_index/about-dash.jpg');
    }
    
    $('#js-main, #js-aside').show();
    headerLogoWrapper.css('right', '1.25em');
    indexPaginationContainer.css('display', 'flex');
    updatePaginationButtons();
    aboutSizing();
    $(window).resize();
    $(window).scroll();
});